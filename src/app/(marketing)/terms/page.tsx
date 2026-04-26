import {
  LegalH2,
  LegalNote,
  LegalP,
  LegalPage,
} from "@/components/LegalPage";

export const metadata = { title: "Terms of Service · Renner" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" effective="April 26, 2026">
      <LegalP>
        Welcome to Renner. These Terms of Service govern your use of our
        marketplace, which connects clients in the real estate industry
        (&ldquo;Clients&rdquo;) with independent task runners
        (&ldquo;Renners&rdquo;) for short-form services such as sign work,
        document delivery, property prep, and licensed showings.
      </LegalP>

      <LegalH2>1. Marketplace, not employer</LegalH2>
      <LegalP>
        Renner is a neutral marketplace. We do not employ Renners or Clients,
        do not direct how tasks are performed, and do not guarantee outcomes.
        Each task is an independent engagement between a Client and a Renner.
        Nothing in these Terms creates an employer-employee, partnership, or
        agency relationship.
      </LegalP>

      <LegalH2>2. Payments and Stripe escrow</LegalH2>
      <LegalP>
        When a Client books a Renner, the Client&apos;s card is charged and
        the funds are held in escrow by our payment processor, Stripe. Funds
        are released to the Renner only after the Client approves the
        completed work. If the Client does not approve or dispute the work
        within 48 hours of the Renner marking it complete, payment auto-releases
        in the Renner&apos;s favor.
      </LegalP>

      <LegalH2>3. Platform fee</LegalH2>
      <LegalP>
        Renner charges a platform fee on every booked task, disclosed to both
        parties at the time of booking. The fee covers payment processing,
        background-check infrastructure, dispute support, and platform
        operations. Fees are non-refundable except where required by law.
      </LegalP>

      <LegalH2>4. Background checks</LegalH2>
      <LegalP>
        All Renners must complete a background check through our verification
        partner, Checkr, before accepting tasks. By creating a Renner account
        you authorize us to share the information you provide with Checkr to
        run the check. Some tasks &mdash; including any task marked as
        requiring a real estate license &mdash; may have additional
        verification requirements.
      </LegalP>

      <LegalH2>5. Licensed activities</LegalH2>
      <LegalP>
        Tasks involving the showing of property or any other activity that
        requires a real estate license under state law are gated to Renners
        who have provided a valid license number and state of issuance. It is
        the Client&apos;s responsibility to flag tasks requiring a license,
        and the Renner&apos;s responsibility to comply with all applicable
        licensing rules.
      </LegalP>

      <LegalH2>6. Disputes</LegalH2>
      <LegalP>
        If a Client believes the work was not completed as agreed, they may
        open a dispute within the 48-hour review window. Funds are held by
        Stripe while a Renner support specialist reviews the dispute.
        Outcomes may include releasing the payment, refunding the Client, or
        offering a partial split. Either party may pursue further remedies in
        small-claims court or binding arbitration as set out below.
      </LegalP>

      <LegalH2>7. Account suspension and termination</LegalH2>
      <LegalP>
        We may suspend or terminate any account that violates these Terms,
        including for fraud, harassment, repeated no-shows, off-platform
        payments, or violation of fair housing or licensing law. You may
        delete your account at any time from Settings.
      </LegalP>

      <LegalH2>8. Limitation of liability</LegalH2>
      <LegalP>
        To the fullest extent allowed by law, Renner is not liable for
        indirect, incidental, or consequential damages arising from your use
        of the platform. Our aggregate liability for any claim is capped at
        the platform fees you have paid us in the prior twelve months.
      </LegalP>

      <LegalH2>9. Changes</LegalH2>
      <LegalP>
        We may update these Terms from time to time. Material changes will be
        announced in-product or via email at least seven days before they
        take effect.
      </LegalP>

      <LegalNote>
        These Terms are a starting framework. Renner is currently in private
        beta and the final agreement will be reviewed by counsel before
        general release.
      </LegalNote>
    </LegalPage>
  );
}
