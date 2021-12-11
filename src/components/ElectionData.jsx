const numberFormatter = new Intl.NumberFormat('pt-BR');

export default function ElectionData({
  cityName,
  totalVoters,
  absence,
  presence,
  numberOfCandidates,
}) {
  return (
    <>
      <h1 className="text-center font-bold text-xl">{`Eleição em ${cityName}`}</h1>
      <div className="flex flex-row items-center justify-center ">
        <div className="space-x-4 m-2">
          <span className="font-bold text-base">Total de Eleitores: </span>
        </div>
        <span className="text-base space-x-4">
          {numberFormatter.format(totalVoters)}
        </span>
        <div className="space-x-4 m-2">
          <span className="font-bold text-base">Abstenção: </span>
        </div>
        <span className="text-base">{numberFormatter.format(absence)}</span>
        <div className="space-x-4 m-2">
          <span className="font-bold text-base">Comparecimento: </span>
        </div>
        <span className="text-base">{numberFormatter.format(presence)}</span>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <span className="font-bold text-base">{`${numberOfCandidates} candidatos`}</span>
      </div>
    </>
  );
}
