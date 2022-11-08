import React, { useState, useEffect } from 'react'

const OrderIndex = ({ orders }) => {
    const [html, setHtml] = useState('');
    useEffect(() => {
        setHtml(orderList);
    }, [orders])

    const displayOrders = orders.reverse();
    const orderList = displayOrders.map(order => {
        return (
            <tr 
                className='table-light'
                key={order.id}
            >
                <td>{order.id}</td>
                <td>{order.ticket.title}</td>
                <td>{order.ticket.price}</td>
                <td>{order.status}</td>
            </tr>
        );
    })

    return (
        <table className='table mt-4'>
            <thead className='form-color'>
                <tr>
                    <th scope='col'>Order ref. id</th>
                    <th scope='col'>Ticket title</th>
                    <th scope='col'>price</th>
                    <th scope='col'>status</th>
                </tr>
            </thead>
            <tbody>
                {html}
            </tbody>
        </table>
    )
}

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');

    return { orders: data };
};

export default OrderIndex