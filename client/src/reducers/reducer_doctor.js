import { FETCH_DOCTOR } from '../actions/index';

export default function(state = [], action) {
  console.log('Action in reducer_doctor', action);
  switch (action.type) {
    case FETCH_DOCTOR:
      return [action.payload.data, ...state]; //create new instance of state
  }
  return state;
}
