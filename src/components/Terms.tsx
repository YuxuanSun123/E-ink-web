import React from 'react';

type Props = {
  onAccept: () => void;
};

const Terms: React.FC<Props> = ({ onAccept }) => {
  return (
    <div className="max-w-lg mx-auto bg-white border border-black p-6 rounded-lg shadow-md text-black">
      <h2 className="text-xl font-bold italic text-center mb-4">TERM AND CONDITIONS</h2>
      <hr className="border-black mb-4" />

      {/* Scrollable Terms Content */}
      <div className="h-64 overflow-y-auto text-sm space-y-4">
        <p><strong>1. Acceptance of Terms</strong><br />
          By scanning the QR code and submitting a message, you agree to abide by these Terms and Conditions.
          If you do not agree, please refrain from using this service.</p>

        <p><strong>2. Purpose of the Digital Plaque</strong><br />
          This digital plaque is designed to allow users to share short notes, memories, thoughts, and reflections
          in public spaces. Messages rotate periodically on an e-ink screen for community engagement.</p>

        <p><strong>3. User Conduct and Content Guidelines</strong><br />
          Users must ensure that all content they submit is respectful, appropriate, and lawful.<br />
          The following types of content are strictly prohibited:<br />
          - Hate speech, discriminatory or offensive remarks.<br />
          - Harassment, threats, or bullying.<br />
          - Explicit, obscene, or violent material.<br />
          - False, misleading, or deceptive information.<br />
          - Personal information (e.g., phone numbers, addresses, emails).<br />
          - Spam, advertisements, or commercial promotions.</p>

        <p><strong>4. Moderation and Content Removal</strong><br />
          Messages may be subject to moderation, either automated or manual.<br />
          The system administrators reserve the right to remove or filter any message that violates these Terms.<br />
          Users who repeatedly violate guidelines may be restricted from submitting messages.</p>

        <p><strong>5. Privacy and Data Use</strong><br />
          Messages submitted may be stored temporarily for display rotation purposes.<br />
          No personally identifiable information should be shared or collected.<br />
          User submissions may be used for research or service improvements but will remain anonymous.</p>

        <p><strong>6. Limited Liability</strong><br />
          The platform is provided "as is" without any guarantees of message retention or display.<br />
          The service providers are not responsible for any harm, distress, or damages arising from user-generated content.<br />
          Users interact with the service at their own risk.</p>

        <p><strong>7. Changes to Terms</strong><br />
          These Terms and Conditions may be updated periodically.<br />
          Continued use of the service after changes signifies acceptance of the revised Terms.</p>

        <p><strong>8. Contact and Reporting</strong><br />
          If you encounter inappropriate content or have concerns, please report it via the designated support channel (provided on the plaque or QR page).</p>
      </div>

      {/* button */}
      <button
        onClick={onAccept}
        className="mt-6 w-full py-3 bg-black text-white text-lg font-semibold rounded-md hover:bg-gray-800 transition"
      >
        NEXT
      </button>
    </div>
  );
};

export default Terms;
