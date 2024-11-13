import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/', //This is already just the default page.tsx in app folder
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },

  {
    title: 'About',
    path: '/about',
    icon: <Icon icon="lucide:info" width="24" height="24" />,
  },
  {
    title: 'Services',
    path: '/services',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Abeba Transport', path: '/services/abeba-transport' },
      { title: 'Bazen Farm', path: '/services/bazen-farm' },
      { title: 'Abeba Trading House', path: '/services/abeba-trading-house' },
    ],
  },
  {
    title: 'Contact',
    path: '/contact',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'Vacancy',
    path: '/vacancy',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
  },
];
