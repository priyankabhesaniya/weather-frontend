
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Modal,
  MenuItem,
  Menu,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAuthData } from '../store/slices/authUser/authUserSlice';
import { logOutUSer } from '../api/Login';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  const [recentAnchorEl, setRecentAnchorEl] = useState(null);
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer);
  const { user } = authSelector;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  // Handlers for Recent dropdown
  const handleRecentMenuClick = (event) => {
    setRecentAnchorEl(event.currentTarget);
  };

  const handleRecentMenuClose = () => {
    setRecentAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const res = await logOutUSer(authSelector?.access_token);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
    resetAuthData();
    localStorage.clear();
    navigate('/login');
  };

  const handleClose = () => {
    setProfile(false);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row', 
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Align this at the start */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
            marginBottom: isMobile ? '16px' : '0', 
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: isMobile ? '8px' : '0' }}>
            Weather Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              navigate('/forecast');
            }}
            sx={{
              marginLeft: isMobile ? '0' : '16px',
              backgroundColor: '#000',
              fontSize: isMobile ? '0.8rem' : '1rem',
              padding: isMobile ? '6px 12px' : '8px 16px',
              marginBottom: isMobile ? '8px' : '0', 
            }}
          >
            View Forecast
          </Button>

          {/* Recent Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              aria-controls="recent-menu"
              aria-haspopup="true"
              onClick={handleRecentMenuClick}
              sx={{
                marginLeft: isMobile ? '0' : '16px',
                backgroundColor: '#000',
                color: 'white',
                fontSize: isMobile ? '0.8rem' : '1rem',
                padding: isMobile ? '6px 12px' : '8px 16px',
                marginBottom: isMobile ? '8px' : '0',
              }} 
            >
              View Recent
            </Button>

            <Menu
              id="recent-menu"
              anchorEl={recentAnchorEl}
              keepMounted
              open={Boolean(recentAnchorEl)}
              onClose={handleRecentMenuClose}
              PaperProps={{
                sx: {
                  width: recentAnchorEl ? recentAnchorEl.offsetWidth : 'auto', 
                  backgroundColor: '#333', 
                  color: 'white', 
                },
              }}
            >
              {authSelector?.recents?.length > 0 ? (
                authSelector?.recents.map((search, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      navigate(`/recent/${search}`);
                      handleRecentMenuClose();
                    }}
                    sx={{
                      margin: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      backgroundColor: '#333',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#555',
                      },
                    }}
                  >
                    {search}
                  </MenuItem>
                ))
              ) : (
                <MenuItem onClick={handleRecentMenuClose} sx={{ backgroundColor: '#333', color: 'white', margin: 0, padding: 2 }}>
                  No recent searches
                </MenuItem>
              )}
            </Menu>
          </div>
        </Box>

       
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: isMobile ? 'flex-start' : 'center',
          }}
        >
          <IconButton color="inherit" onClick={() => setProfile(true)} sx={{ marginBottom: isMobile ? '8px' : '0' }}>
            <AccountCircle />
          </IconButton>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              marginLeft: isMobile ? '0' : '16px',
              fontSize: isMobile ? '0.8rem' : '1rem',
              padding: isMobile ? '6px 12px' : '8px 16px',
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
      <Modal
        open={profile}
        onClose={handleClose}
        aria-labelledby="user-profile-modal"
        aria-describedby="user-profile-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : 400, 
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" id="user-profile-modal">
            User Profile
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Name:</strong> {user?.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Email:</strong> {user?.email}
          </Typography>
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Navbar;
