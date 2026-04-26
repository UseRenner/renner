import {
  LegalH2,
  LegalNote,
  LegalP,
  LegalPage,
} from "@/components/LegalPage";

export const metadata = { title: "Acceptable Use · Renner" };

export default function AcceptableUsePage() {
  return (
    <LegalPage title="Acceptable Use Policy" effective="April 26, 2026">
      <LegalP>
        Renner exists to make real-estate task work safer and more
        professional. This Acceptable Use Policy describes conduct we expect
        from everyone on the platform.
      </LegalP>

      <LegalH2>1. Honest representations</LegalH2>
      <LegalP>
        Use your real name, current contact information, and accurate license
        details. Do not impersonate other people, agents, or brokerages.
        Renners must not claim to be licensed if they are not.
      </LegalP>

      <LegalH2>2. Stay on platform</LegalH2>
      <LegalP>
        Bookings, payments, and task communications must happen on Renner.
        Soliciting off-platform payment, attempting to circumvent the
        platform fee, or trading personal payment information is prohibited
        and will result in account termination.
      </LegalP>

      <LegalH2>3. Licensed activities</LegalH2>
      <LegalP>
        Tasks marked as requiring a real estate license &mdash; including
        showings &mdash; may only be accepted by Renners who have a valid
        license on file. If you are not licensed, do not apply for these
        tasks. Misrepresenting license status is grounds for permanent ban
        and may be reported to state regulators.
      </LegalP>

      <LegalH2>4. Fair housing</LegalH2>
      <LegalP>
        You must comply with the federal Fair Housing Act and all applicable
        state and local fair-housing laws. Discrimination on the basis of
        race, color, national origin, religion, sex, familial status,
        disability, or any other protected characteristic is prohibited
        anywhere on the platform.
      </LegalP>

      <LegalH2>5. Safety</LegalH2>
      <LegalP>
        Do not threaten, harass, or use Renner to facilitate any illegal
        activity. Renners performing on-property tasks should always confirm
        the property address, lockbox details, and showing windows directly
        with the Client, and report any safety concerns to support
        immediately.
      </LegalP>

      <LegalH2>6. Disputes and reviews</LegalH2>
      <LegalP>
        Reviews must reflect your honest experience with the task. Do not
        post reviews containing personal information, threats, or content
        that violates this policy. Disputes should be raised in good faith,
        with photos and notes that help our team make a fair decision.
      </LegalP>

      <LegalH2>7. Reporting violations</LegalH2>
      <LegalP>
        If you see something that violates this policy, email{" "}
        <a
          href="mailto:trust@renner.app"
          style={{ color: "#0d0f12", textDecoration: "underline" }}
        >
          trust@renner.app
        </a>
        . We review every report and may suspend accounts pending
        investigation.
      </LegalP>

      <LegalNote>
        Repeated or severe violations may lead to permanent removal from the
        platform and forfeiture of pending payouts.
      </LegalNote>
    </LegalPage>
  );
}
