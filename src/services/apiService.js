import { get } from './httpService';

export async function apiGetAllCities() {
  const allCities = await get('/cities');
  return allCities;
}

export async function apiGetAllCandidates() {
  const allCandidates = await get('/candidates');
  return allCandidates;
}

export async function apiGetElectionByCity(id) {
  const electionByCity = await get(`/election?cityId=${id}`);
  return electionByCity;
}
