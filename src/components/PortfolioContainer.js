import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ myPortfolio, onSellStock }) {

  return (
    <div>
      <h2>My Portfolio</h2>
      {myPortfolio.map((stock) => (
        <Stock
          key={stock.id}
          id={stock.id}
          companyName={stock.companyName}
          stockPrice={stock.stockPrice}
          stockTicker={stock.stockTicker}
          onMoveStock={onSellStock}
        />
      ))}
    </div>
  );
}

export default PortfolioContainer;

