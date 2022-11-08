import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import Router, { useRouter } from 'next/router';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function OrderShow({ order, currentUser }) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(0);
    const [doRequest, errors] = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: () => router.push('/orders')
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft(); // calling function so it does not get called 1s later
        const timerId = setInterval(findTimeLeft, 1000);
        
        // function is called when navigating away from the page
        return () => {
            clearInterval(timerId);
        }
    }, [order]);


    if (timeLeft < 0) {
        return <div>Order Expired</div>;
    }
    return (
        <div className='d-flex justify-content-sm-center align-items-center vh-100'>
            <div className='row rounded form-color'>
                <div className='col text-center justify-content-center'>
                    <div className='m-4'>
                        <CountdownCircleTimer
                            isPlaying
                            duration={60}
                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                            colorsTime={[60, 40, 20, 0]}
                        >
                            {({ remainingTime }) => (
                                <div>
                                    <h2>{remainingTime}</h2>
                                    <p>seconds left to pay</p>
                                </div>
                            )}
                        </CountdownCircleTimer>
                    </div>


                    <StripeCheckout
                        token={({ id }) => doRequest({ token: id })}
                        stripeKey="pk_test_51Ln2cvDXI6Nj26FFTpKF6pfGVKKbR8ucsDDlhKWESTP9SHCTEoKI5CTyPlGdgFWlrly66iSoZEyUq6HKnlv39t9j006SAFwYjx"
                        amount={order.ticket.price * 100}
                        email={currentUser.email}
                        currency={'EUR'}
                        className='m-3 '
                    />
                    {errors}
                </div>

            </div>
        </div>
    )
}
OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
}
export default OrderShow