import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.legalName}. Learn how we collect, use, and protect your information.`,
};

export default function PrivacyPage() {
  const lastUpdated = "August 1, 2026";

  return (
    <>
      <PageHeader title="Privacy Policy" />
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-6 leading-relaxed text-muted-foreground md:px-8 space-y-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <p className="text-sm text-muted-foreground">
            <strong>Effective Date:</strong> {lastUpdated}
          </p>

          <p>
            At <strong>{siteConfig.legalName}</strong> ("Mindle", "we", "us", or "our"),
            we respect your privacy and are committed to protecting the personal data
            you share with us. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website at{" "}
            <a href={siteConfig.url} className="text-accent underline underline-offset-4">
              {siteConfig.url}
            </a>
            , use our software applications (including GitaConnect), or engage our services.
          </p>

          <div>
            <h2>1. Information We Collect</h2>
            <p className="mb-3">
              We collect information to provide better services to our users. The types
              of information we collect include:
            </p>
            <ul>
              <li>
                <strong>Direct Communications:</strong> When you fill out a contact form,
                request a project quote, or subscribe to our newsletter, we collect your name,
                email address, company name, and the content of your messages.
              </li>
              <li>
                <strong>Product Beta & Account Signups:</strong> When you join the waitlist or
                beta for GitaConnect or other Mindle products, we collect your email address
                and feedback preferences.
              </li>
              <li>
                <strong>App & Product Usage Data:</strong> For products like GitaConnect,
                primary data (such as mood check-ins, verse progress, and Jaap counts) is
                stored locally on your device first. When synced, minimal telemetry is used
                to maintain app functionality.
              </li>
              <li>
                <strong>Technical & Diagnostic Information:</strong> IP address, browser type,
                operating system, device hardware specs, referring URLs, and performance logs
                to diagnose issues and optimize site speed.
              </li>
            </ul>
          </div>

          <div>
            <h2>2. How We Use Your Information</h2>
            <p className="mb-3">We use the collected data for specific purposes, including:</p>
            <ul>
              <li>Providing, maintaining, and improving our products and services.</li>
              <li>Responding to your inquiries, support requests, or project consultations.</li>
              <li>Sending product updates, engineering notes, and newsletter releases (only when requested).</li>
              <li>Detecting, preventing, and addressing technical issues, security vulnerabilities, or fraudulent activity.</li>
              <li>Complying with legal obligations and enforcing our Terms of Service.</li>
            </ul>
          </div>

          <div>
            <h2>3. Offline-First & Data Storage Principles</h2>
            <p>
              Mindle prioritizes <strong>offline-first architecture</strong> for mobile apps like GitaConnect.
              Your personal practice data, Sanskrit reading logs, and Jaap progress are written to on-device
              storage immediately. Cloud sync occurs asynchronously via secure, encrypted channels.
              We do not sell, rent, or trade your personal data to third parties.
            </p>
          </div>

          <div>
            <h2>4. Third-Party Services & Integrations</h2>
            <p className="mb-3">
              We may utilize trusted third-party service providers to help us operate our website and services:
            </p>
            <ul>
              <li>
                <strong>Hosting & Analytics:</strong> Infrastructure providers (such as Vercel and Supabase)
                for website hosting, database management, and error tracking.
              </li>
              <li>
                <strong>Communication Tools:</strong> Email dispatch services to deliver transactional emails
                and newsletter updates.
              </li>
            </ul>
            <p className="mt-2">
              All third-party providers are bound by strict confidentiality and security obligations.
            </p>
          </div>

          <div>
            <h2>5. Data Retention & Your Rights</h2>
            <p className="mb-3">
              We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy.
              Depending on your location, you have rights regarding your personal information:
            </p>
            <ul>
              <li>The right to access and receive a copy of your personal data.</li>
              <li>The right to request correction or deletion of your information.</li>
              <li>The right to opt out of marketing and newsletter communications at any time via the unsubscribe link.</li>
            </ul>
          </div>

          <div>
            <h2>6. Security</h2>
            <p>
              We implement appropriate technical and organizational measures (including HTTPS encryption,
              access controls, and secure code practices) to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </div>

          <div>
            <h2>7. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations.
              Any revisions will be posted on this page with an updated effective date.
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us at:
            </p>
            <p className="mt-2 font-medium text-foreground">
              {siteConfig.legalName}<br />
              Email:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-accent underline underline-offset-4">
                {siteConfig.email}
              </a>
              <br />
              Location: CTS NO 1487;SR NO 77/1A MUNDHWA POWER ONE;SHOP O 406 411036, Pune, Maharashtra, India
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
