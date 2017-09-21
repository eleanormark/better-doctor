import { combineReducers } from 'redux';
import DoctorReducer from './reducer_doctor';

const rootReducer = combineReducers({
  doctor: DoctorReducer
});

export default rootReducer;
