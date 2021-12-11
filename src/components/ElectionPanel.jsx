export default function ElectionPanel({ children: candidatecards }) {
  return (
    <div className="flex flex-row items-center justify-center flex-wrap">
      {candidatecards}
    </div>
  );
}
