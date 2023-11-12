import React from "react";

function Stock({ id, companyName, stockPrice, stockTicker, onMoveStock }) {
  
  function handleBuyStock() {
    onMoveStock(id, companyName, stockPrice, stockTicker);
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{companyName}</h5>
          <p className="card-text">{`${stockTicker}: $${stockPrice}`}</p>
          <button onClick={handleBuyStock}>MOVE STOCK</button>
        </div>
      </div>
    </div>
  );
}

export default Stock;


