import { 
  FETCH_CARS_START, 
  FETCH_CARS_SUCCESS, 
  FETCH_CARS_ERROR, 
  ON_CHANGE_CARS,
  RESET_CAR_STATE
} from '../actions/actionTypes';
import { carState } from '../state';

export default function carsReducer(state = carState, action) {

  switch(action.type) {
    case FETCH_CARS_START: 
      return {
        ...state, loading: true
      }
    case FETCH_CARS_SUCCESS:
      return {
        ...state, cars: action.cars, loading: false
      }
    case FETCH_CARS_ERROR: 
      return {
        ...state, error: action.error, loading: false
      }
    case ON_CHANGE_CARS:
      return {
        ...state, [action.fieldName]: action.value
      }
    case RESET_CAR_STATE:
      const { owner, mark, model, year } = carState;
      return {
        ...state, owner, mark, model, year
      }
    default: 
      return state;
  }
};
