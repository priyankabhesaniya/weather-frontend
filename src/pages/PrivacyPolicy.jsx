import React from 'react';
import { Box, Typography } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy for Weather Dashboard
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>1. Introduction</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        Welcome to the Weather Dashboard. We are committed to protecting your privacy and ensuring the security of any personal information we collect from our users. This Privacy Policy explains how we collect, use, and share information about you when you use our weather application and website.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>2. Information We Collect</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Location Data:</strong> To provide accurate weather forecasts, we may collect your location data either from your device’s GPS or from your IP address.
        <br />
        <strong>Personal Information:</strong> We may collect personal information such as your name, email address, or phone number if you create an account.
        <br />
        <strong>Search Data:</strong> We may store search queries you enter into our app to provide quick access to recent searches.
        <br />
        <strong>Device Information:</strong> We may collect technical information about the device you use to access our app, such as your device type, operating system, and browser type.
        <br />
        <strong>Usage Data:</strong> We may track how you interact with our app to improve the user experience.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>3. How We Use Your Information</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        We use the information we collect for the following purposes:
        <ul>
          <li>To provide weather forecasts and other location-based services.</li>
          <li>To improve the accuracy and performance of our weather predictions.</li>
          <li>To maintain your user account and personalize your experience.</li>
          <li>To send important notifications or updates related to weather events.</li>
        </ul>
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>4. Sharing Your Information</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        We may share your information with:
        <ul>
          <li>Service providers assisting us in providing and improving our services.</li>
          <li>Law enforcement, if required by law.</li>
          <li>In the event of a business transfer, your data may be transferred.</li>
        </ul>
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>5. Cookies and Tracking Technologies</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        We may use cookies and tracking technologies to improve our website’s performance, remember preferences, and analyze usage trends.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>6. Data Security</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        We take data security seriously and implement measures to protect your personal information. However, no system can guarantee absolute security.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>7. Your Rights and Choices</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        You may have the right to access, update, or request deletion of your data. You can also opt out of certain uses of your information.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>8. Third-Party Links</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        Our app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>9. Children’s Privacy</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        Our services are not intended for children under the age of 13, and we do not knowingly collect personal information from children.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>10. Changes to This Policy</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        We may update this Privacy Policy from time to time. Changes will be posted on this page.
      </Typography>

     
    </Box>
  );
};

export default PrivacyPolicy;
