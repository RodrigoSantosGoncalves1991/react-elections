export default function CityMenu({
  children: allCities,
  cityId,
  handleCitySelect = null,
}) {
  function handleCityChange(event) {
    if (handleCitySelect) {
      const newCityId = event.target.value;
      handleCitySelect(newCityId);
    }
  }
  return (
    <div className="container text-center p-1">
      <h1 className="mx-auto p-1">Escolha o município</h1>
      <select
        className="shadow-lg rounded-lg"
        value={cityId}
        onChange={handleCityChange}
      >
        {allCities.map(({ id, name }) => {
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
