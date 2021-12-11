import { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import CityMenu from '../components/CityMenu';
import ElectionData from '../components/ElectionData';
import ElectionPanel from '../components/ElectionPanel';
import Header from '../components/Header';
import Main from '../components/Main';
import {
  apiGetAllCandidates,
  apiGetAllCities,
  apiGetElectionByCity,
} from '../services/apiService';

export default function ElectionPage() {
  const [allCities, setAllCities] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const [cityElection, setCityElection] = useState([]);
  const [cityId, setCityId] = useState('');
  const [cityName, setCityName] = useState('');
  const [totalVoters, setTotalVoters] = useState(0);
  const [absence, setAbsence] = useState(0);
  const [presence, setPresence] = useState(0);

  useEffect(() => {
    async function getCitiesAndCandidates() {
      try {
        const [backEndAllCities, backEndAllCandidates] = await Promise.all([
          apiGetAllCities(),
          apiGetAllCandidates(),
        ]);
        backEndAllCities.sort((a, b) => a.name.localeCompare(b.name));
        setCityId(backEndAllCities[0].id);
        setAllCities(backEndAllCities);
        setAllCandidates(backEndAllCandidates);
        setCityName(backEndAllCities[0].name);
        setTotalVoters(backEndAllCities[0].votingPopulation);
        setAbsence(backEndAllCities[0].absence);
        setPresence(backEndAllCities[0].presence);
      } catch (error) {
        console.log(error);
      }
    }
    getCitiesAndCandidates();
  }, []);

  useEffect(() => {
    async function getCityElection() {
      try {
        let backEndCityElection = await apiGetElectionByCity(cityId);
        backEndCityElection = backEndCityElection
          .sort((a, b) => b.votes - a.votes)
          .map((candidate, index) => {
            const percentage = (candidate.votes / presence) * 100;
            const { name, username } = allCandidates.find(
              ({ id }) => id === candidate.candidateId
            );
            const elected = !index ? true : false;
            return {
              ...candidate,
              percentage,
              name,
              username,
              elected,
            };
          });
        setCityElection(backEndCityElection);
      } catch (error) {
        console.log(error);
      }
    }
    getCityElection();
  }, [cityId, allCandidates, presence]);

  function handleCityChange(newCityId) {
    const newCityName = allCities.find(city => city.id === newCityId);
    setCityName(newCityName.name);
    setTotalVoters(newCityName.votingPopulation);
    setAbsence(newCityName.absence);
    setPresence(newCityName.presence);
    setCityId(newCityId);
  }
  console.log(cityElection);
  //console.log(allCandidates);
  let mainJsx = (
    <>
      <CityMenu cityId={cityId} handleCitySelect={handleCityChange}>
        {allCities}
      </CityMenu>
      <div className="border p-4 m-4">
        <ElectionData
          cityName={cityName}
          totalVoters={totalVoters}
          absence={absence}
          presence={presence}
          numberOfCandidates={cityElection.length}
        />
        <ElectionPanel>
          {cityElection.map(
            ({
              candidateId,
              cityId,
              elected,
              id,
              name,
              percentage,
              username,
              votes,
            }) => {
              return (
                <CandidateCard
                  candidateId={candidateId}
                  name={name}
                  percentage={percentage}
                  username={username}
                  votes={votes}
                  elected={elected}
                />
              );
            }
          )}
        </ElectionPanel>
      </div>
    </>
  );

  return (
    <>
      <Header>react-elections</Header>
      <Main>{mainJsx}</Main>
    </>
  );
}
