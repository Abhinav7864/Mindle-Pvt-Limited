import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.legalName}. Rules and guidelines for using our website, products, and services.`,
};

export default function TermsPage() {
  const lastUpdated = "August 1, 2026";

  return (
    <>
      <PageHeader title="Terms of Service" />
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-6 leading-relaxed text-muted-foreground md:px-8 space-y-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <p className="text-sm text-muted-foreground">
            <strong>Effective Date:</strong> {lastUpdated}
          </p>

          <p>
            Welcome to <strong>{siteConfig.legalName}</strong> ("Mindle", "we", "us", or "our").
            These Terms of Service ("Terms") govern your access to and use of our website located at{" "}
            <a href={siteConfig.url} className="text-accent underline underline-offset-4">
              {siteConfig.url}
            </a>
            , our software products (including GitaConnect), and any related engineering services.
            By accessing or using our website, applications, or services, you agree to be bound by these Terms.
          </p>

          <div>
            <h2>1. Use of Our Website & Services</h2>
            <p className="mb-3">
              You agree to use our website and services only for lawful purposes and in accordance with these Terms.
              Specifically, you agree not to:
            </p>
            <ul>
              <li>Use the website or services in any way that violates applicable national or international laws or regulations.</li>
              <li>Attempt to decompile, reverse engineer, or extract source code from our proprietary applications or AI models without authorization.</li>
              <li>Interfere with or disrupt the security, integrity, or performance of our website, infrastructure, or databases.</li>
              <li>Transmit any automated scraping requests, spam, viruses, or malicious code through our site or contact forms.</li>
            </ul>
          </div>

          <div>
            <h2>2. Intellectual Property Rights</h2>
            <p>
              All content, brand assets, source code, designs, UI elements, database schemas, patent-pending AI architecture,
              trademarks, and logos displayed on this website or embedded in our products (including GitaConnect) are the exclusive
              intellectual property of <strong>{siteConfig.legalName}</strong> or its licensors.
              Nothing in these Terms grants you any right, title, or interest in or to our intellectual property.
            </p>
          </div>

          <div>
            <h2>3. Product Betas & Pre-Release Features</h2>
            <p>
              We may offer access to pre-release, beta, or early-stage software features (such as the GitaConnect iOS beta).
              Beta software is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis for testing and feedback purposes.
              Beta features may contain bugs or undergo significant changes before general release.
            </p>
          </div>

          <div>
            <h2>4. Client Engineering & Custom Software Services</h2>
            <p>
              Terms governing custom software design, AI engineering, SaaS development, or consulting engagements with Mindle
              will be set forth in separate Statement of Work (SOW) or Master Services Agreements (MSA) executed between Mindle and the client.
            </p>
          </div>

          <div>
            <h2>5. Disclaimer of Warranties</h2>
            <p>
              To the maximum extent permitted by applicable law, our website, applications, and services are provided without warranties
              of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose,
              or non-infringement.
            </p>
          </div>

          <div>
            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall <strong>{siteConfig.legalName}</strong>, its founders, directors, employees, or partners be liable for any indirect,
              incidental, consequential, special, or punitive damages arising out of or in connection with your use of or inability to use our website,
              products, or services.
            </p>
          </div>

          <div>
            <h2>7. Governing Law & Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>, without regard to its conflict of law principles.
              Any legal action or proceeding arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra, India.
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <h2>8. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding these Terms of Service, please contact us at:
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
