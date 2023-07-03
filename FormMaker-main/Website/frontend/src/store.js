import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import {
  userRegisterReducer,
  userLoginReducer,
  userListReducer,
  userDeleteReducer,
  userDetailsReducer,
  userUpdateReducer,
  userUpdateProfileReducer,
} from './reducers/userReducer';
import {
  customerRegisterReducer,
  customerLoginReducer,
  customerListReducer,
  customerDeleteReducer,
  customerDetailsReducer,
  customerUpdateReducer,
  customerUpdateProfileReducer,
  customerProfileReducer,
} from './reducers/customerReducer';
import {
  dataDepartmentReducer,
  dataRoleReducer,
  userDepartmentReducer,
  userRoleReducer,
  departmentDeleteReducer,
  roleDeleteReducer,
  departmentUpdateReducer,
  roleUpdateReducer,
  userDepartmentDetailsReducer,
  userRoleDetailsReducer,
  listStandardReducer,
  standardUpdateReducer,
  standardAddReducer,
  standardDeleteReducer,
  standardDetailsReducer,
} from './reducers/dataReducer';

import {
  questionAddReducer,
  questionListReducer,
  questionDeleteReducer,
  questionUpdateReducer,
  questionDetailsReducer,
} from './reducers/questionReducer';
import {
  projectCreateReducer,
  projectUpdateReducer,
  projectDetailsReducer,
  projectDeleteReducer,
  projectListReducer,
  projectMyListReducer,
  projectDetailssReducer,
  projectUpdateQuestionReducer,
  projectCreateVersionReducer,
  projectCreateVersion3Reducer,
} from './reducers/projectReducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  customerRegister: customerRegisterReducer,
  customerLogin: customerLoginReducer,
  customerList: customerListReducer,
  customerDetails: customerDetailsReducer,
  customerDelete: customerDeleteReducer,
  customerUpdate: customerUpdateReducer,
  customerProfile: customerProfileReducer,
  customerUpdateProfile: customerUpdateProfileReducer,
  dataRole: dataRoleReducer,
  dataDepartment: dataDepartmentReducer,
  roleDelete: roleDeleteReducer,
  departmentDelete: departmentDeleteReducer,
  departmentCreate: userDepartmentReducer,
  roleCreate: userRoleReducer,
  departmentUpdate: departmentUpdateReducer,
  roleUpdate: roleUpdateReducer,
  departmentDetails: userDepartmentDetailsReducer,
  roleDetails: userRoleDetailsReducer,
  listStandard: listStandardReducer,
  standardDelete: standardDeleteReducer,
  standardCreate: standardAddReducer,
  standardUpdate: standardUpdateReducer,
  standardDetails: standardDetailsReducer,
  questionAdd: questionAddReducer,
  questionList: questionListReducer,
  questionDelete: questionDeleteReducer,
  questionUpdate: questionUpdateReducer,
  questionDetails: questionDetailsReducer,
  projectCreate: projectCreateReducer,
  projectUpdate: projectUpdateReducer,
  projectDetails: projectDetailsReducer,
  projectDelete: projectDeleteReducer,
  projectList: projectListReducer,
  projectMyList: projectMyListReducer,
  projectDetailss: projectDetailssReducer,
  projectUpdateQuestion: projectUpdateQuestionReducer,
  projectCreateVersion: projectCreateVersionReducer,
  projectCreateVersion3: projectCreateVersion3Reducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const customerInfoFromStorage = localStorage.getItem('customerInfo')
  ? JSON.parse(localStorage.getItem('customerInfo'))
  : null;

// const projectInfo = localStorage.getItem('project') ? JSON.parse(localStorage.getItem('project')) : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  customerLogin: { customerInfo: customerInfoFromStorage },
  // projectDetails: { project: projectInfo },
};
const middlewares = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
