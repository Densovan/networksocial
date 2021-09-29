import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { registerReducer, loginReducer } from "./redux/reducer/authReducer";
import {
  currenUserReducer,
  createProfileReducer,
  addExperienceReducer,
  addEducationReducer,
  experienceDeleteReducer,
  educationDeleteReducer,
  getAllProfileUserReducer,
  getProfileUserReducer,
} from "./redux/reducer/profileReducer";
import {
  createPostReducer,
  getPostsReducer,
} from "./redux/reducer/postReducer";
const reducer = combineReducers({
  register: registerReducer,
  loginUser: loginReducer,
  currerntUser: currenUserReducer,
  createProfile: createProfileReducer,
  addUserExperience: addExperienceReducer,
  addUserEducation: addEducationReducer,
  deleteExperience: experienceDeleteReducer,
  deleteEducation: educationDeleteReducer,
  allProfileUser: getAllProfileUserReducer,
  profileUser: getProfileUserReducer,
  createPost: createPostReducer,
  getPosts: getPostsReducer,
});

const tokenFromLocalstorage = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))
  : null;

const initialState = {
  loginUser: { user: tokenFromLocalstorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
