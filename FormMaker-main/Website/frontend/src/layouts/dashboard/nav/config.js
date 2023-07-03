// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Auditor',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Customer',
    path: '/dashboard/customer',
    icon: icon('ic_user'),
  },
  {
    title: 'Projects',
    path: '/dashboard/project',
    icon: icon('ic_lock'),
  },
  {
    title: 'Questions',
    path: '/dashboard/question',
    icon: icon('ic_user'),
  },
  {
    title: 'FormData',
    path: '/dashboard/data',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

const navAdminConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Auditor',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Customer',
    path: '/dashboard/customer',
    icon: icon('ic_user'),
  },
  {
    title: 'Project',
    path: '/dashboard/mylist',
    icon: icon('ic_lock'),
  },
  {
    title: 'Questions',
    path: '/dashboard/question',
    icon: icon('ic_user'),
  },
  {
    title: 'FormData',
    path: '/dashboard/data',
    icon: icon('ic_lock'),
  },

  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

const navUserConfig = [
  {
    title: 'dashboard',
    path: '/user/dashboard/app',
    icon: icon('ic_analytics'),
  },

  {
    title: 'mylist',
    path: '/user/dashboard/mylist',
    icon: icon('ic_lock'),
  },
];
const navUndefinedConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
];

const navCustomerConfig = [
  {
    title: 'dashboard',
    path: '/customer/dashboard/app',
    icon: icon('ic_analytics'),
  },

  {
    title: 'mylist',
    path: '/customer/dashboard/myClist',
    icon: icon('ic_lock'),
  },
];
export { navConfig, navUserConfig, navUndefinedConfig, navCustomerConfig, navAdminConfig };
