import "./TermsAndConditions.css"; // make sure to create this CSS file

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>
      <p>
        These Terms and Conditions ("Terms") govern your use of the Padiman
        Route mobile application and services provided therein ("App"), operated
        by Padiman Route ("we," "us," or "our"). By accessing or using the App,
        you agree to be bound by these Terms. If you do not agree to these
        Terms, please do not use the App.
      </p>

      <h2>1. Use of the App</h2>
      <ul>
        <li>
          You must be at least 18 years old to use the App. If you are less than
          18, you agree to obtain your parent(s)’ or guardian(s)’ permission
          BEFORE signing up and using our services.
        </li>
        <li>
          You agree to provide accurate and complete information when creating
          your account.
        </li>
        <li>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account.
        </li>
      </ul>

      <h2>2. Services Provided</h2>
      <ul>
        <li>
          The App provides a platform for users to connect for ride-sharing,
          parcel delivery, and social sharing.
        </li>
        <li>
          We do not provide transportation services or guarantee the
          availability of rides or parcel delivery.
        </li>
      </ul>

      <h2>3. User Conduct</h2>
      <ul>
        <li>
          You agree to use the App in compliance with all applicable laws and
          regulations.
        </li>
        <li>
          You will not use the App for any unlawful or unauthorized purpose, or
          in a manner that violates the rights of others.
        </li>
      </ul>

      <h2>4. Payment</h2>
      <ul>
        <li>
          Payments for rides or parcel delivery services are processed through
          the App. By using these services, you agree to pay all applicable fees
          and charges in-app. Under no circumstance are you to pay cash for any
          services.
        </li>
        <li>
          We may use third-party payment processors to facilitate transactions.
          By using these services, you agree to their terms and conditions.
        </li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <ul>
        <li>
          The App and its content, including but not limited to text, graphics,
          logos, and images, are the property of Padiman Route and are protected
          by copyright and other intellectual property laws.
        </li>
      </ul>

      <h2>6. Privacy</h2>
      <ul>
        <li>
          Your privacy is important to us. Please review our Privacy Policy to
          understand how we collect, use, and safeguard your personal
          information.
        </li>
      </ul>

      <h2>7. Limitation of Liability</h2>
      <ul>
        <li>
          To the fullest extent permitted by law, Padiman Route shall not be
          liable for any indirect, incidental, special, or consequential damages
          arising out of or in connection with your use of the App.
        </li>
      </ul>

      <h2>8. Indemnification</h2>
      <ul>
        <li>
          You agree to indemnify and hold Padiman Route harmless from any
          claims, losses, liabilities, damages, costs, or expenses arising out
          of or in connection with your use of the App.
        </li>
      </ul>

      <h2>9. Termination</h2>
      <ul>
        <li>
          We reserve the right to suspend or terminate your access to the App at
          any time, with or without cause and without prior notice.
        </li>
      </ul>

      <h2>10. Changes to Terms</h2>
      <ul>
        <li>
          We may update or modify these Terms at any time. Any changes will be
          effective immediately upon posting. Your continued use of the App
          after the posting of changes constitutes acceptance of those changes.
        </li>
      </ul>

      <h2>11. Governing Law</h2>
      <ul>
        <li>
          These Terms shall be governed by and construed in accordance with the
          laws of [Jurisdiction], without regard to its conflict of law
          provisions.
        </li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about these Terms, please contact
        us at{" "}
        <a href="mailto:contact@email.com" className="terms-link">
          contact@email.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsAndConditions;
