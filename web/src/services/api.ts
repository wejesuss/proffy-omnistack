import axios from 'axios';
import { RoutesPath } from '../@types';

const api = axios.create({
  baseURL: RoutesPath.baseURL,
});

export default api;
