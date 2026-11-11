import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privacy Notice",
  "How LONGCHI SMART uses project enquiry information and optional website measurement preferences.",
  "/privacy/",
);
export default function Privacy() {
  return (
    <main id="main-content" className="container prose">
      <span className="eyebrow">Your information</span>
      <h1>Privacy notice</h1>
      <p>
        Updated 11 November 2026. This notice explains how {site.legalName}{" "}
        handles information provided through this website.
      </p>
      <h2>Project enquiries</h2>
      <p>
        When you send an enquiry, we collect the details you provide: your name
        if supplied, email address, project country, selected product line,
        model where applicable and project message. We use these details to
        review and respond to your request and discuss the related quotation.
        The form is not a newsletter subscription.
      </p>
      <h2>Website and advertising measurement</h2>
      <p>
        Essential local storage remembers your privacy preferences. Analytics
        and advertising measurement are optional. If you allow advertising
        measurement, campaign parameters and advertising click identifiers can
        be saved for your browsing session and included with your enquiry. If
        you do not allow it, those identifiers are not saved by our form.
      </p>
      <p>
        Where Google measurement is configured and you choose the relevant
        optional tools, Google may process measurement data under its own terms.
        This website does not load its Google tag before you allow optional
        measurement. You can revisit your choices using Cookie settings in the
        footer.
      </p>
      <h2>Information kept with an enquiry</h2>
      <p>
        The enquiry record includes a reference, submission time, source page,
        your contact permission and measurement preferences. We use a
        short-lived hashed network identifier to reduce automated submissions.
        We do not include your email address or message text in client-side
        analytics events.
      </p>
      <h2>Storage and service providers</h2>
      <p>
        The website and enquiry storage use hosting infrastructure provided
        through OpenAI Sites and Cloudflare. Information may be processed
        outside your country, including when our team in China responds to your
        enquiry. Access should be limited to the people and service providers
        involved in operating this site and handling your request.
      </p>
      <h2>Your choices and requests</h2>
      <p>
        You can contact us to ask about your information, request a correction
        or deletion, or withdraw permission for further enquiry follow-up.
        Records are retained for enquiry handling and related business needs;
        contact us about the applicable retention or deletion of a specific
        record.
      </p>
      <h2>Contact</h2>
      <p>
        {site.legalName}
        <br />
        {site.address}
        <br />
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </main>
  );
}
