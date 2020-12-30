import { 
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN, 
  FETCH_USER_REGISTER, 
  FETCH_USER_START,
  STORE_TOKEN,
  DELETE_TOKEN,
  ON_CHANGE_USER,
  RESET_USER_STATE
} from "../actions/actionTypes";
import { userState } from '../state';

export default function userReducer(state = userState, action) {
  switch(action.type) {
    case FETCH_USER_START:
      return {
        ...state, loading: true
      }
    case FETCH_USER_REGISTER:
      return {
        ...state, loading: false
      }
    case FETCH_USER_LOGIN:
      return {
        ...state, loading: false
      }
    case FETCH_USER_ERROR:
      return {
        ...state, error: action.err
      }
    case STORE_TOKEN:
      return {
        ...state, token: action.token, userId: action.userId, isLoggedIn: true
      }
    case DELETE_TOKEN:
      return {
        ...state, token: null, userId: null, isLoggedIn: false
      }
    case ON_CHANGE_USER:
      return {
        ...state, [action.fieldName]: action.value
      }
    case RESET_USER_STATE:
      const { email, password } = userState;
      return {
        ...state, email, password
      }
    default:
      return state;
  }
};
