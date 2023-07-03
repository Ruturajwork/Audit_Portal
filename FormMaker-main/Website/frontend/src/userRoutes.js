import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import Register from './layouts/newuser';
//

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterScreen from './pages/RegisterScreen';
import UserEditScreen from './pages/UserEditScreen';
import CustomerScreen from './pages/CustomerScreen';
import CustomerEditScreen from './pages/CustomerEditScreen';
import DataEditScreen from './pages/DataEditPage';
import RoleEditModel from './components/models/RoleEditModal';
import DepartmentEditModel from './components/models/DepartmentEditModel';
import StandardEditModel from './components/models/StandardEditModel';
import QuestionListScreen from './pages/QuestionListScreen';
import QuestionEditScreen from './pages/QuestionEditPage';
import QuestionRegisterScreen from './pages/CreateQuestionScreen';
import CreateProjectScreen from './pages/CreateProjectScreen';
import ProjectListScreen from './pages/ProjectlistScreen';
import ProjectEditScreen from './pages/ProjectEditScreen';
import MyProjectScreen from './pages/MyProjectScreen';
import LoginCustomerPage from './pages/CustomerLoginPage';
import ListCustomerProjectScreen from './pages/ListCustomerProjectScreen';
import UsersSingleProjectScreen from './pages/UsersSingleProjectScreen';
import EditProjectQuestionScreen from './pages/EditProjectQuestionScreen';
import EditProjectV2QuestionScreen from './pages/EditProjectV2QuestionScreen';
import EditProjectV3QuestionScreen from './pages/EditProjectV3QuestionScreen';
import Audix from './pages/Audix';
// ----------------------------------------------------------------------

export default function UserRouter() {
  const routes = useRoutes([
    {
      path: 'user/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="user/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'mylist', element: <MyProjectScreen /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'user/:id/edit',
      element: <UserEditScreen />,
    },
    {
      path: 'project/:id/edit',
      element: <ProjectEditScreen />,
    },
    {
      path: 'project/:id/open',
      element: <UsersSingleProjectScreen />,
    },
    {
      path: '/project/bank/:id/edit',
      element: <EditProjectQuestionScreen />,
    },
    {
      path: '/audix',
      element: <Audix />,
    },
    {
      path: '/project/bank/:id/v2/edit',
      element: <EditProjectV2QuestionScreen />,
    },
    {
      path: '/project/bank/:id/v3/edit',
      element: <EditProjectV3QuestionScreen />,
    },
    {
      path: 'question/:id/edit',
      element: <QuestionEditScreen />,
    },
    {
      path: 'project/add',
      element: <CreateProjectScreen />,
    },
    {
      path: 'question/add',
      element: <QuestionRegisterScreen />,
    },
    {
      path: 'mylist',
      element: <MyProjectScreen />,
    },
    {
      path: 'myClist',
      element: <ListCustomerProjectScreen />,
    },
    {
      path: 'customer/:id/edit',
      element: <CustomerEditScreen />,
    },
    { path: 'data', element: <DataEditScreen /> },
    {
      path: '/role/data/:id/edit',
      element: <RoleEditModel />,
    },
    {
      path: '/standard/data/:id/edit',
      element: <StandardEditModel />,
    },

    {
      path: '/department/data/:id/edit',
      element: <DepartmentEditModel />,
    },
    {
      path: '/clogin',
      element: <LoginCustomerPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      element: <Register />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'register', element: <RegisterScreen /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
