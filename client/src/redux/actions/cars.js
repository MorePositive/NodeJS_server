import axios from 'axios';
import {
  FETCH_CARS_START,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_ERROR,
  ON_CHANGE_CARS,
  FETCH_CARS_DELETE,
  FETCH_CARS_POST,
  RESET_CAR_STATE
} from './actionTypes';

export function getCars() {
  return async dispatch => {
    dispatch(fetchCarsStart());
    try {
      const data = await axios.get("/api/cars/getAll");
      dispatch(fetchCarsSuccess(data.data));
    }
    catch (err) {
      dispatch(fetchCarsError(err));
    }
  };
};

export function postCar() {
  return async (dispatch, getState) => {
    const { owner, model, mark, year } = getState().cars;
    const carData = { owner, model, mark, year };
    console.log(owner)
    try {
      const data = await axios.post("/api/cars/add-car", carData);
      window.M.toast({ html: data.data.message });
      dispatch(fetchCarsPost());
      dispatch(getCars());
    }
    catch (err) {
      dispatch(fetchCarsError(err));
    }
  };
};

export function deleteCar(id) {
  return async dispatch => {
    try {
      const data = await axios.delete(`/api/cars/${id}`);
      window.M.toast({ html: data.data.message });
      dispatch(fetchCarsDelete());
      dispatch(getCars());
    }
    catch (err) {
      dispatch(fetchCarsError(err));
    }
  };
};

export function fetchCarsStart() {
  return {
    type: FETCH_CARS_START
  }
};

export function fetchCarsSuccess(cars) {
  return {
    type: FETCH_CARS_SUCCESS,
    cars 
  }
};

export function fetchCarsPost() {
  return {
    type: FETCH_CARS_POST
  }
};

export function fetchCarsDelete() {
  return {
    type: FETCH_CARS_DELETE
  }
};

export function fetchCarsError(err) {
  return {
    type: FETCH_CARS_ERROR,
    error: err
  }
};

export function onChangeCars(name, value) {
  return {
    type: ON_CHANGE_CARS,
    fieldName: name,
    value
  }
};

export function resetCarState() {
  return {
    type: RESET_CAR_STATE
  }
};
