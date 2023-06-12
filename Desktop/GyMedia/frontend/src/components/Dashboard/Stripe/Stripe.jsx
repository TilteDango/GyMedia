import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

export default function Stripe({ modal, handleClick }) {
  const stripePromise = loadStripe(
    "pk_test_51N6zoTAmM8GrdizRpzH3Kvdvo2UEVSUTcHVJV2YKt9FzxHcUpyLKvTw6wwnqhuOztdVzxcnykjqk471w4S8mZkVM00Y93oYeh6"
  );

  useEffect(() => {
    fetch("http://127.0.0.1:6001/api/stripe/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div
        className={
          modal
            ? "flex overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 justify-center items-center z-50 backdrop-blur"
            : "fixed top-0 left-0 w-full h-full flex justify-center items-start bg-gray-500 bg-opacity-50 z-50"
        }
      >
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm handleClick={handleClick} />
          </Elements>
        )}
      </div>
    </>
  );
}
