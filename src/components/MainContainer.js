import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [myPortfolio, setMyPortfolio] = useState([]);

  const [stocks, setStocks] = useState([]);

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

  return (
    <div>
      <SearchBar />
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
