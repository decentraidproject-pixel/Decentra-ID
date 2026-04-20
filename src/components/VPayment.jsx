import React from "react";
import '../Header.css'


const PaymentStart = () => {
  const handleClick = () => {
    
    window.open(
      "https://buy.stripe.com/test_9B68wHctHf9V90GdI483C02",
      "_parent"
    );
  };

  return (
    <div className="payment-container">
      <button className="payment-btn" onClick={handleClick}>
        Payment Now to Get Started
      </button>
    </div>
  );
};

export default PaymentStart;
