import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Privacy Policy</h1>
      <p>
        At Padiman Route, we are committed to protecting your privacy and
        ensuring the security of your personal information. This Privacy Policy
        outlines how we collect, use, and safeguard your data when you use our
        app and services.
      </p>

      <h2>1. Information We Collect:</h2>
      <ul>
        <li><strong>Personal Information:</strong> When you create an account, we may collect information such as your name, email address, phone number, NIN/BVN, and profile picture.</li>
        <li><strong>Location Data:</strong> To provide our ride-sharing and parcel delivery services, we collect your location data while you use the app.</li>
        <li><strong>Payment Information:</strong> If you make payments through the app, your payment will be processed by our third-party service provider, Paystack. We may be able to know from which account the money originated, who made the payment, and what time the payment was made. However, we do not have access to credit card details, and other sensitive payment details.</li>
        <li><strong>User-Generated Content:</strong> Any content you share within the app, such as pictures or posts, may be collected and stored.</li>
      </ul>

      <h2>2. How We Use Your Information:</h2>
      <ul>
        <li>To provide our services: We use your personal information to facilitate ride-sharing, parcel delivery, and social sharing within the Padiman Route community.</li>
        <li>To improve our services: We may analyze user data to enhance the user experience and optimize our app's functionality.</li>
        <li>To communicate with you: We may send you notifications, updates, and promotional messages related to our services.</li>
      </ul>

      <h2>3. Data Security:</h2>
      <ul>
        <li>We implement security measures to protect your personal information from unauthorized access, misuse, or alteration.</li>
        <li>We use encryption and other security protocols to safeguard your data during transmission and storage.</li>
      </ul>

      <h2>4. Data Sharing:</h2>
      <ul>
        <li>We may share your information with third-party service providers who assist us in delivering our services, such as payment processors or mapping services.</li>
        <li>We may disclose your information in response to legal requests or to comply with applicable laws and regulations.</li>
      </ul>

      <h2>5. Your Choices/rights:</h2>
      <ul>
        <li>You can control the information you provide to us and manage your preferences within the app settings.</li>
        <li>You have the right to access, update, or delete your personal information at any time.</li>
        <li>You can request information about the collection and use of your personal information according to applicable local laws.</li>
        <li>You can request to access, block, or erase your personal information, or to correct it if it is incomplete or inaccurate.</li>
        <li>Where you have legitimate grounds for doing so, you can object to the processing of your personal information and request that we not process your data further.</li>
        <li>If the country in which you reside has applicable data protection laws and you wish to access, correct, or delete your personal data, you may reach us via info@padimanroute.com.</li>
      </ul>

      <h2>6. Children's Privacy:</h2>
      <ul>
        <li>Padiman Route is not intended for use by minors. We do not knowingly collect personal information from minors. If you are a minor in the country in which you are accessing our app, you may submit your personal data only with the involvement of your parent(s) or guardian.</li>
        <li>If you are a parent(s) or guardian and you provide consent for a minor to submit personal data on this app, you agree to this Policy in respect to the minor’s use.</li>
      </ul>

      <h2>7. Changes to This Policy:</h2>
      <ul>
        <li>We may update this Privacy Policy from time to time. Any changes will be posted on our website or within the app, and your continued use of Padiman Route constitutes acceptance of those changes.</li>
      </ul>

      <h2>Contact Us:</h2>
      <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at info@padimanroute.com.</p>
    </div>
  );
};

export default PrivacyPolicy;