import React from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useNavigate } from 'react-router-dom';
const PaymentComponent = () => {
    const orderPlace = () => {
        console.log("order placed");
      };
    
      const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };
    
      const pay = async () => {
        let amount = 100;
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
    
        const options = {
          key: "rzp_test_jPprW4DUbqmqQD", // This is Api key. you will get it from razorpay dashboard > account and settings > API keys
          amount: parseInt(amount * 100),
          currency: "INR", // your 3 letter currency code
          name: "name", // project or transaction name
          description: "Test Transaction",
          image: "", // your project logo
          handler: function (response) {
            // console.log("response", response);
            orderPlace(); // after payment completes on stripe this function will be called and you can do your stuff
          },
          prefill: {
            name: "your name",
            email: "your email",
            contact: "your contact number",
          },
          notes: {
            address: "India",
          },
          theme: {
            color: "#158993",
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
    
      return (
        <div className="App">
          <button
            className="button_pay"
            onClick={() => {
              pay();
            }}
          >
            Pay with Razorpay
          </button>
        </div>
      );
};

export default PaymentComponent;