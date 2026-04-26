import {
  LegalH2,
  LegalNote,
  LegalP,
  LegalPage,
} from "@/components/LegalPage";

export const metadata = { title: "Privacy Policy · Renner" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" effective="April 26, 2026">
      <LegalP>
        This Privacy Policy describes how Renner collects, uses, and shares
        information when you use our marketplace.
      </LegalP>

      <LegalH2>1. What we collect</LegalH2>
      <LegalP>
        Account information you provide (name, email, phone, role, profile
        details, and &mdash; for Renners &mdash; license details and
        background-check identifiers). Task and message activity you generate
        on the platform. Standard usage data such as IP address, device type,
        and timestamps.
      </LegalP>

      <LegalH2>2. How we use information</LegalH2>
      <LegalP>
        To run the marketplace: matching Clients and Renners, processing
        payments, surfacing reviews, supporting disputes, preventing fraud,
        and meeting our legal obligations. We do not sell personal
        information.
      </LegalP>

      <LegalH2>3. Service providers</LegalH2>
      <LegalP>
        We share information with the third-party providers we rely on to
        operate Renner: Supabase for authentication and database hosting,
        Stripe for payments and escrow, and Checkr for background checks.
        Each provider is bound by data-protection obligations.
      </LegalP>

      <LegalH2>4. Background-check disclosure</LegalH2>
      <LegalP>
        With your authorization, we share your name, date of birth, and
        relevant identifiers with Checkr to perform a background check. The
        result of the check is used to determine eligibility to accept tasks,
        and a summary is stored on your account so we can show clients that
        you are background-verified.
      </LegalP>

      <LegalH2>5. Your choices</LegalH2>
      <LegalP>
        You can update your profile, change your password, and delete your
        account at any time from Settings. Deleting your account removes your
        profile, tasks, applications, messages, and reviews. Some records may
        be retained where required by law or to resolve open disputes.
      </LegalP>

      <LegalH2>6. Security</LegalH2>
      <LegalP>
        We use industry-standard safeguards including encryption in transit,
        scoped database access via Row Level Security, and role-based access
        controls. No system is perfectly secure; please use a strong password
        and notify us immediately if you suspect unauthorized access.
      </LegalP>

      <LegalH2>7. Contact</LegalH2>
      <LegalP>
        Questions about this policy? Reach out to{" "}
        <a
          href="mailto:privacy@renner.app"
          style={{ color: "#0d0f12", textDecoration: "underline" }}
        >
          privacy@renner.app
        </a>
        .
      </LegalP>

      <LegalNote>
        Renner is in private beta. The final privacy policy will be reviewed
        by counsel before general release.
      </LegalNote>
    </LegalPage>
  );
}
