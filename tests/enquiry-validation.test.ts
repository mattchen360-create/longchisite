import test from "node:test";
import assert from "node:assert/strict";
import { validateEnquiry } from "../lib/enquiry-validation.ts";
const valid = {
  name: "QA",
  email: "qa@example.test",
  category: "smart-parking",
  country: "Australia",
  message: "Two entry lanes",
  sourcePath: "/lp/smart-parking/",
  model: "",
  idempotencyKey: "550e8400-e29b-41d4-a716-446655440000",
  contactConsent: "yes",
  measurementConsent: { analytics: false, advertising: false },
  attribution: { gclid: "should-not-persist", utm_source: "google" },
};
test("enquiry accepts a project request without optional measurement", () => {
  const result = validateEnquiry(valid);
  assert.equal(result.category, "smart-parking");
  assert.deepEqual(result.attribution, {});
});
test("unconsented click identifiers are stripped on the server", () => {
  const result = validateEnquiry({
    ...valid,
    measurementConsent: { analytics: true, advertising: false },
  });
  assert.deepEqual(result.attribution, {});
});
test("consented campaign fields are retained while unrelated fields are excluded", () => {
  const result = validateEnquiry({
    ...valid,
    measurementConsent: { analytics: false, advertising: true },
    attribution: {
      gclid: "test-click",
      utm_campaign: "parking-uk",
      email: "not-an-analytics-field",
    },
  });
  assert.deepEqual(result.attribution, {
    gclid: "test-click",
    utm_campaign: "parking-uk",
  });
});
test("contact permission and valid country are required", () => {
  assert.throws(() => validateEnquiry({ ...valid, contactConsent: "" }));
  assert.throws(() => validateEnquiry({ ...valid, country: " " }));
});
test("invalid data types, categories and oversized messages are rejected", () => {
  for (const override of [
    { email: "not-an-email" },
    { category: "invalid-category" },
    { message: "x".repeat(4001) },
    { name: [] },
    { idempotencyKey: "guess" },
  ])
    assert.throws(() => validateEnquiry({ ...valid, ...override }));
});
