const percentageFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('pt-BR');

export default function CandidateCard({
  candidateId,
  cityId,
  elected,
  id,
  name,
  percentage,
  username,
  votes,
}) {
  const colorCandidate = elected ? 'text-green-600' : 'text-yellow-600';
  console.log(elected);
  return (
    <div className="shadow-lg p-4 m-2 w-80 h-48 flex flex-col items-center">
      <div className="flex flex-row  items-center">
        <img
          className="rounded-full"
          src={`/img/${username}.png`}
          alt={`${name}`}
          width="48"
          height="48"
        />
        <div className="flex flex-col items-center pl-16">
          <span
            className={`${colorCandidate} font-bold`}
          >{`${percentageFormatter.format(percentage.toFixed(2))}%`}</span>
          <span>{`${numberFormatter.format(votes)} votos`}</span>
        </div>
      </div>
      <div className="flex flex-col items-center p-6 space-y-4">
        <span className="text-xl font-medium">{name}</span>
        <span className={`${colorCandidate} font-bold`}>
          {elected ? 'Eleito' : 'Não eleito'}
        </span>
      </div>
    </div>
  );
}
