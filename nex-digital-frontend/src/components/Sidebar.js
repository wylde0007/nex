import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

const Sidebar = ({ userRole, isLoggedIn }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setOpen(false);
  };

  if (!isLoggedIn) return null;

  return (
    <>
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{ position: 'fixed', top: 16, right: 16, color: 'primary.main', zIndex: 1300 }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
        anchor="right"
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: 'background.default',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ color: 'primary.main', mb: 2 }}>
            Nex Digital
          </Typography>
          <List>
            <ListItem button component={Link} to="/dashboard" onClick={() => setOpen(false)}>
              <ListItemText primary="Dashboard" sx={{ color: 'text.primary' }} />
            </ListItem>
            {userRole === 'admin' && (
              <ListItem button component={Link} to="/admin" onClick={() => setOpen(false)}>
                <ListItemText primary="Admin" sx={{ color: 'text.primary' }} />
              </ListItem>
            )}
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" sx={{ color: 'text.primary' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;