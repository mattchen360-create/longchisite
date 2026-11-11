"""Exercise a local preview only. Uses synthetic .test addresses; never sends mail."""
import http.cookiejar
import json
from pathlib import Path
import re
import urllib.error
import urllib.request
import uuid

BASE = 'http://127.0.0.1:5187'
cookies = http.cookiejar.CookieJar()
client = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookies))

def call(path, payload=None, method=None, origin=None):
    body = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(BASE + path.rstrip('/') + '/', data=body,
        headers={'Content-Type': 'application/json', 'Origin': origin or BASE},
        method=method or ('POST' if body else 'GET'))
    try:
        response = client.open(req, timeout=20)
    except urllib.error.HTTPError as error:
        response = error
    raw = response.read().decode('utf-8', 'replace')
    try:
        data = json.loads(raw)
    except ValueError:
        data = {'raw': raw[:200]}
    return response.code, data

status, data = call('/api/admin/leads')
assert status == 401, (status, data)
print('PASS: unauthenticated lead access rejected')
valid = {'name': 'LOCAL SEM QA', 'email': 'sem-qa@example.test', 'country': 'Australia',
    'category': 'smart-parking', 'contactConsent': 'yes',
    'message': 'LOCAL TEST ONLY - no notification sent', 'sourcePath': '/lp/smart-parking/',
    'idempotencyKey': str(uuid.uuid4()), 'measurementConsent': {'analytics': False, 'advertising': False},
    'attribution': {'gclid': 'must-be-removed', 'utm_source': 'google'}}
status, data = call('/api/enquiries', {**valid, 'email': 'bad'})
assert status == 400, (status, data)
print('PASS: invalid request rejected')
status, data = call('/api/enquiries', valid, origin='https://other.example')
assert status == 403, (status, data)
print('PASS: foreign origin rejected')
status, data = call('/api/enquiries', valid)
assert status == 201, (status, data)
reference = data['reference']
print('PASS: persisted local enquiry returns reference', reference)
status, data = call('/api/enquiries', valid)
assert status == 200 and data['reference'] == reference, (status, data)
print('PASS: retry is idempotent')
password = re.search(r'ADMIN_PASSWORD="([^"]+)"', Path('.dev.vars').read_text()).group(1)
status, data = call('/api/admin/session', {'password': password})
assert status == 200, (status, data)
print('PASS: administrator session created')
status, data = call('/api/admin/leads')
assert status == 200, (status, data)
row = next(row for row in data['leads'] if row['id'] == reference)
assert json.loads(row['attribution']) == {}, row['attribution']
print('PASS: denied advertising identifiers are excluded from storage')
status, data = call('/api/admin/leads', {'id': reference, 'status': 'qualified'}, method='PATCH')
assert status == 200 and data['updated'], (status, data)
print('PASS: enquiry status updates')
valid2 = {**valid, 'idempotencyKey': str(uuid.uuid4()),
    'measurementConsent': {'analytics': False, 'advertising': True},
    'attribution': {'gclid': 'local-test-click', 'utm_campaign': 'parking-au'}}
status, created = call('/api/enquiries', valid2)
assert status == 201, (status, created)
status, data = call('/api/admin/leads')
row = next(row for row in data['leads'] if row['id'] == created['reference'])
assert json.loads(row['attribution'])['gclid'] == 'local-test-click'
print('PASS: consented campaign attribution persists')
status, data = call('/api/admin/session', method='DELETE')
assert status == 200
status, data = call('/api/admin/leads')
assert status == 401
print('PASS: signing out revokes access')
