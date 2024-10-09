// src/components/Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',        // Fix the footer to the bottom
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#1976d2', // Blue background matching the Navbar
        color: 'white',
        zIndex: 1201,             // Ensures it's above other content
      }}
    >
      {/* Left Side - Branding */}
      <Typography variant="body2" sx={{ flexGrow: 0 }}>
        &copy; {new Date().getFullYear()} Weather Dashboard. All rights reserved.
      </Typography>

      {/* Center - Links */}
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Link href="/privacy" underline="hover" sx={{ color: 'white', '&:hover': { color: '#fff176' } }}>
          Privacy Policy
        </Link>
      </Box>

     
    </Box>
  );
};

export default Footer;
