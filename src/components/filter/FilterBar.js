
function FilterBar({ vertical = false, filterState, setFilterState, setElement, setRarity }) {
  const elements = [
    "all",
    "Anemo",
    "Cryo",
    "Dendro",
    "Electro",
    "Geo",
    "Hydro",
    "Pyro",
  ];
  const rarities = ["all", "five", "four", "six"];

  return (
    <div className={`filter-bar${vertical ? " vertical" : ""}`}>
      <div className="filter-bar-row">
        <span>Element:</span>
        {elements.map((el) => (
          <button
            key={el}
            className={filterState.element === el ? "active" : ""}
            onClick={() => {
              if (setElement) setElement(el);
              else setFilterState((prev) => ({ ...prev, element: el }));
            }}
          >
            {el}
          </button>
        ))}
      </div>
      <div className="filter-bar-row">
        <span>Rarity:</span>
        {rarities.map((r) => (
          <button
            key={r}
            className={filterState.rarity === r ? "active" : ""}
            onClick={() => {
              if (setRarity) setRarity(r);
              else setFilterState((prev) => ({ ...prev, rarity: r }));
            }}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
