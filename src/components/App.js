import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("All");

  // ✅ Fetch data once
  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then(setStocks);
  }, []);

  // ✅ Handle buy
  function handleBuy(stock) {
    if (!portfolio.find((s) => s.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  // ✅ Handle sell
  function handleSell(stock) {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  }

  // ✅ Sorting
  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "Alphabetically") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Price") {
      return a.price - b.price;
    }
    return 0;
  });

  // ✅ Filtering
  const visibleStocks =
    filterBy === "All"
      ? sortedStocks
      : sortedStocks.filter((stock) => stock.type === filterBy);

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterBy={filterBy}
        onFilterChange={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={visibleStocks} onBuyStock={handleBuy} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onSellStock={handleSell} />
        </div>
      </div>
    </div>
  );
}

export default App;

