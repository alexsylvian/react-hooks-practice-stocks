import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [myPortfolio, setMyPortfolio] = useState([]);

  const [stocks, setStocks] = useState([]);

  const [sortBy, setSortBy] = useState("Alphabetically");

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
    console.log(e)
    console.log('test1')
    console.log('Selected value:', e);
    console.log('Current sortBy state:', sortBy);
    const value = e;
    setSortBy(value);
    console.log('test2')
  }
  
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
      <SearchBar onSortChange={handleSortChange} sortBy={sortBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} onBuyStock={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer myPortfolio={myPortfolio} onSellStock={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;