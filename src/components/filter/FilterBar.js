import "./filter.scss";

function FilterBar({ filterState, setFilterState, setElement, setRarity }) {
  const elements = [
    "Anemo",
    "Cryo",
    "Dendro",
    "Electro",
    "Geo",
    "Hydro",
    "Pyro",
  ];
  const rarities = ["Five", "Four"];

  // helper toggle logic
  const handleToggle = (type, value) => {
    if (type === "element") {
      if (setElement) {
        setElement(filterState.element === value ? "all" : value);
      } else {
        setFilterState((prev) => ({
          ...prev,
          element: prev.element === value ? "all" : value,
        }));
      }
    } else if (type === "rarity") {
      if (setRarity) {
        setRarity(filterState.rarity === value ? "all" : value);
      } else {
        setFilterState((prev) => ({
          ...prev,
          rarity: prev.rarity === value ? "all" : value,
        }));
      }
    }
  };

  return (
    <div className={`filter-bar`}>
      <div className="filter-bar-row element-row">
        <span>Element:</span>
        {elements.map((el) => (
          <button
            key={el}
            className={
              filterState.element === el
                ? "active"
                : filterState.element !== "all"
                ? "inactive"
                : ""
            }
            onClick={() => handleToggle("element", el)}
          >
            {
              <img
                src={require(`../../util/Elements/Element_${el}.svg`)}
                alt={el}
              />
            }
          </button>
        ))}
      </div>
      <div className="filter-bar-row rarity-row">
        <span>Rarity:</span>
        {rarities.map((r) => (
          <button 
            key={r.toLowerCase()}
            className={filterState.rarity === r.toLowerCase() ? "active" : "" }
            onClick={() => handleToggle("rarity", r.toLowerCase())}
          >
            {r} ☆
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
