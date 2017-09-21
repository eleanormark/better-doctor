import axios from 'axios';
import keys from '../config/keys';

const BD_API_KEY = keys.betterDoctorKey;
const ROOT_URL = `https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${BD_API_KEY}`;

export const FETCH_DOCTOR = 'FETCH_DOCTOR';

export function fetchDoctor(names) {
  const queryNames = names.replace(/\s+/g, '%20');
  const url = `${ROOT_URL}&name=${queryNames}`;
  const request = axios.get(url).then(res => {
    return res.data;
  });

  return {
    type: FETCH_DOCTOR,
    payload: request
  };
}
