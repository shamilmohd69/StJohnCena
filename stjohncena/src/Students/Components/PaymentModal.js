import React from 'react'
import axios from 'axios'

import cancel from '../Util/cancel_b.svg'

const PaymentModal = ({ isOpen, onClose, course, data }) => {


    if (!course) return null;

    const name = data.firstname + " " + data.lastname;
    const id = data.login;
    const money = course.fees;

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
        let amount = money;
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: "rzp_test_jPprW4DUbqmqQD",
            amount: parseInt(amount * 100),
            currency: "INR",
            name: name,
            description: "Test Transaction",
            image: "",
            handler: async function (response) {
                try {
                    await axios.post(`http://localhost:4000/student/payment?id=${id}`)
                } catch (err) {
                    console.log(err)
                }
            },
            prefill: {
                name: name,
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

    if (!isOpen) return null;
    return (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Pay</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} />
                </div>
                <div>
                    <b>Amount : {money}</b>
                </div>
                {data.fees == 'paid' ? (
                    <div>
                        <b>Paid</b>
                    </div>
                ) : (
                    <button onClick={pay} style={{
                        marginTop: '20px',
                        backgroundColor: 'rgb(0,0,40)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer'
                    }}>Pay</button>
                )}
            </div>
        </div >
    )
}

export default PaymentModal