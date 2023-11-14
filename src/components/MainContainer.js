import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [myPortfolio, setMyPortfolio] = useState([]);

  const [stocks, setStocks] = useState([]);

  const [sortBy, setSortBy] = useState("Alphabetically");

  const [filterBy, setFilterBy] = useState("Tech")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  function handleBuyStock(id, companyName, stockPrice, stockTicker) {
    const updatedPortfolio = [...myPortfolio, { id, companyName, stockPrice, stockTicker }];

    setMyPortfolio(updatedPortfolio);
  };

  function handleSellStock(id) {
    const updatedPortfolio = myPortfolio.filter((stock) => stock.id !== id);
    setMyPortfolio(updatedPortfolio);
  };

  function handleSortChange(e) {
    const value = e;
    setSortBy(value);
  }

  function handleFilterChange(e) {
    console.log(e)
    const value = e
    setFilterBy(value)
  }

  const filteredStocks = stocks.filter((stock) => stock.type === filterBy);

  
  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => response.json())
      .then((data) => {
        let sortedStocks = [...data];

        if (sortBy === "Alphabetically") {
          sortedStocks.sort((a, b) => a.ticker.localeCompare(b.ticker));
        } else if (sortBy === "Price") {
          sortedStocks.sort((a, b) => a.price - b.price);
        }

        setStocks(sortedStocks);
      });
  }, [sortBy]);

  return (
    <div>
      <SearchBar onSortChange={handleSortChange} sortBy={sortBy} onFilterChange={handleFilterChange} filterBy={filterBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onBuyStock={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer myPortfolio={myPortfolio} onSellStock={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;