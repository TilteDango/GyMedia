import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ handleClick }) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/user-settings",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form
          className="w-30vw min-w-500px self-center rounded-lg shadow-md bg-white p-10 box-border relative"
          id="payment-form"
          onSubmit={handleSubmit}
        >
          <button
            onClick={handleClick}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center absolute top-6 right-6"
            style={{ marginRight: "-1.5rem", marginTop: "-1.5rem" }}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <LinkAuthenticationElement
            id="link-authentication-element"
            onChange={(e) => setEmail(e.target.value)}
            className="mb-6"
          />
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
            className="mb-6"
          />
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="w-full bg-orange-600 text-white font-semibold rounded-md py-3 text-lg focus:outline-none transition-all duration-200 shadow-sm hover:contrast-125 disabled:opacity-50 disabled:cursor-default"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner h-20 w-20 mx-auto relative">
                  <span className="block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="block absolute h-10 w-10 rounded-full bg-orange-600"></span>
                  </span>
                </div>
              ) : (
                "Pagar ahora"
              )}
            </span>
          </button>
          {message && (
            <div
              id="payment-message"
              className="text-gray-600 text-base text-center pt-3"
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
