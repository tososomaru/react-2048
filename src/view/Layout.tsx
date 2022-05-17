import { Link, Outlet } from 'react-router-dom';
import React from 'react';

import {
  AppBar, Container, BottomNavigation, BottomNavigationAction,
} from '@mui/material';
import GamepadIcon from '@mui/icons-material/Gamepad';
import SettingsIcon from '@mui/icons-material/Settings';
import Footer from '../components/Footer';

const navigationItems = [
  {
    path: '/',
    label: 'Game',
    icon: <GamepadIcon />,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: <SettingsIcon />,
  },
];

// TODO: заменить Content на Column
const Layout = () => {
  const [value, setValue] = React.useState(1);
  return (
    <>
      <AppBar position="static">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {
              navigationItems.map((item) => (
                <Link to={item.path}>
                  <BottomNavigationAction
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                  />
                </Link>
              ))
            }
        </BottomNavigation>
      </AppBar>
      <Container maxWidth="xs">

        <Outlet />
        {/* <Footer/> */}
      </Container>
    </>

  );
};

export default Layout;
