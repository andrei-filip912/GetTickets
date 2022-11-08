import React, { useState } from 'react'
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';

function NewTicket() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [doRequest, errors] = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title, price, date, location, description
        },
        onSuccess: () => {
            router.push('/');
        }
    })

    const onSubmit = (event) => {
        event.preventDefault();

        doRequest();
    };

    const onBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-90'>
            <form
                className='rounded w-75 form-color p-3'
                onSubmit={onSubmit}
            >
                <h1>Create a ticket</h1>
                <div className='pb-2'>
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        className='form-control'
                    />
                </div>
                <div className='pb-2'>
                    <label>Price</label>
                    <input
                        value={price}
                        onBlur={onBlur} // event onLeave
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                        className='form-control' />
                </div>
                <div className='pb-2'>
                    <label>Date</label>
                    <input
                        type='datetime-local'
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value)
                        }}
                        className='form-control' />
                </div>
                <div className='pb-2'>
                    <label>Location</label>
                    <input
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value)
                        }}
                        className='form-control' />
                </div>
                <div className='pb-2'>
                    <label>Description</label>
                    <input
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        className='form-control' />
                </div>
                {errors}
                <div className='text-center'>
                    <button className='btn btn-primary'>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default NewTicket;