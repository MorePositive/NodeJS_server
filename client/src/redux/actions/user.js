import axios from "axios";
import { 
  DELETE_TOKEN, 
  FETCH_USER_ERROR, 
  FETCH_USER_LOGIN, 
  FETCH_USER_REGISTER, 
  FETCH_USER_START, 
  ON_CHANGE_USER, 
  RESET_USER_STATE, 
  STORE_TOKEN 
} from "./actionTypes";

export function registerUser() {
  return async (dispatch, getState) => {
    dispatch(fetchUserStart());
    const { email, password } = getState().user;
    try {
      const data = await axios.post("/api/auth/register", { email, password });
      window.M.toast({ html: data.data.message });
      dispatch(fetchUserRegister());
    }
    catch (err) {
      window.M.toast({ html: err.response.data.message })
      dispatch(fetchUserError(err));
    }
  };
};

export function loginUser() {
  return async (dispatch, getState) => {
    dispatch(fetchUserStart());
    const { email, password } = getState().user;
    try {
      const data = await axios.post("/api/auth/login", { email, password });
      const { token, userId } = data.data;
      dispatch(loginStoreToken(token, userId));
    }
    catch (err) {
      window.M.toast({ html: err.response.data.message });
      dispatch(fetchUserError(err));
    }
  };
};

export function loginStoreToken(token, userId) {
  return dispatch => {
    dispatch(storeToken(token, userId));
    localStorage.setItem("userData", JSON.stringify({ token, userId }));
  };
};

export function logoutDeleteToken() {
  return dispatch => {
    dispatch(deleteToken());
    localStorage.removeItem("userData");
  };
};

export function storeToken(token, userId) {
  return {
    type: STORE_TOKEN,
    token,
    userId
  }
};

export function deleteToken() {
  return {
    type: DELETE_TOKEN
  }
};

export function onChangeUser(name, value) {
  return {
    type: ON_CHANGE_USER,
    fieldName: name,
    value
  }
};

export function resetUserState() {
  return {
    type: RESET_USER_STATE
  }
};

export function fetchUserStart() {
  return {
    type: FETCH_USER_START
  }
};

export function fetchUserRegister() {
  return {
    type: FETCH_USER_REGISTER
  }
};

export function fetchUserLogin() {
  return {
    type: FETCH_USER_LOGIN
  }
};

export function fetchUserError(err) {
  return {
    type: FETCH_USER_ERROR,
    error: err
  }
};
