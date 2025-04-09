import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        borderTop: '4px solid #000',
        backgroundColor: '#fff',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -8,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: '#fff',
        },
      }}
      className="pixel-theme"
    >
      <Typography
        variant="body2"
        align="center"
        sx={{
          fontFamily: '"Press Start 2P", cursive',
          fontSize: '0.7rem',
          lineHeight: 1.8,
          color: '#000',
        }}
      >
        {'© ' + new Date().getFullYear() + ' MPRO. All rights reserved.'}
      </Typography>
    </Box>
  );
};

export default Footer;