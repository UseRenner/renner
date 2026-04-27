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
        (&ldquo;Renners&rdquo;) for short-form services such as signs,
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
        Your card will be charged when you book a Renner. Funds are held by
        Stripe and released only when you confirm the task is complete. If the
        Client does not confirm or open a dispute within 48 hours of the
        Renner marking the task complete, payment auto-releases in the
        Renner&apos;s favor.
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

      <LegalH2>7. Cancellation policy</LegalH2>
      <LegalP>
        Clients may cancel a task before the Renner starts at no cost. A full
        refund, including the platform fee, will be issued and the task will
        reopen for other Renners.
      </LegalP>
      <LegalP>
        If a Client cancels after the Renner has started the task, 50% of the
        task pay will be released to the Renner for their time and travel,
        and 50% will be refunded to the Client. The platform fee is retained
        by Renner.
      </LegalP>
      <LegalP>
        Renners may cancel a booking before starting the task. The Client
        receives a full refund and the task reopens. Repeated cancellations
        may result in account review.
      </LegalP>
      <LegalP>
        If a Renner cancels after starting a task for any reason &mdash;
        including safety concerns, personal emergencies, or access issues
        &mdash; 50% of the task pay is released to the Renner and 50% is
        refunded to the Client. Renners are required to provide a detailed
        written explanation for all post-start cancellations.
      </LegalP>
      <LegalP>
        Repeated cancellations by either party may result in account review
        and potential suspension.
      </LegalP>

      <LegalH2>8. Unable to complete policy</LegalH2>
      <LegalP>
        If a Renner arrives at the task location and is unable to complete
        the task &mdash; including other party no-shows, incorrect access
        codes, missing keys, wrong addresses, or locked properties &mdash;
        the Renner may report the task as unable to complete with photo
        proof and a written explanation.
      </LegalP>
      <LegalP>
        When a task is reported as unable to complete, 50% of the task pay
        is released to the Renner and 50% is refunded to the Client. The
        platform fee is retained by Renner.
      </LegalP>
      <LegalP>
        Both parties share the cost equally when a task cannot be completed
        after the Renner has arrived, regardless of fault.
      </LegalP>

      <LegalH2>9. Damage and liability</LegalH2>
      <LegalP>
        Renner is a marketplace platform that connects Clients with
        independent service providers. Renner is not liable for the actions,
        omissions, or negligence of any Renner or Client.
      </LegalP>
      <LegalP>
        Renners are independent contractors solely responsible for performing
        tasks with reasonable care. Any damage to property or theft occurring
        during task performance is the responsibility of the Renner who
        performed the task.
      </LegalP>
      <LegalP>
        If property damage or theft occurs during a task, the Client should
        document the damage with photos and file a dispute through the
        Renner platform within 48 hours of task completion or discovery of
        the damage.
      </LegalP>
      <LegalP>
        Renner will facilitate resolution between the parties. The claim
        will first be sent to the Renner, who has 48 hours to accept,
        propose a different amount, or dispute the claim. Unresolved claims
        escalate to Renner for review.
      </LegalP>
      <LegalP>
        Clients are encouraged to maintain appropriate property insurance.
        Renners are encouraged to carry general liability insurance.
      </LegalP>
      <LegalP>
        Renner reserves the right to suspend or remove any user involved in
        verified property damage or theft.
      </LegalP>

      <LegalH2>10. Account suspension and termination</LegalH2>
      <LegalP>
        We may suspend or terminate any account that violates these Terms,
        including for fraud, harassment, repeated no-shows, off-platform
        payments, or violation of fair housing or licensing law. You may
        delete your account at any time from Settings.
      </LegalP>

      <LegalH2>11. Limitation of liability</LegalH2>
      <LegalP>
        To the fullest extent allowed by law, Renner is not liable for
        indirect, incidental, or consequential damages arising from your use
        of the platform. Our aggregate liability for any claim is capped at
        the platform fees you have paid us in the prior twelve months.
      </LegalP>

      <LegalH2>12. Changes</LegalH2>
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
