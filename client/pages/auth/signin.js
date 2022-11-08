import { useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import draw2 from '../../public/draw2.svg';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [doRequest, errors] = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    }

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <div className="img-fluid">
                            <Image src={draw2}
                                alt="Phone image">
                            </Image>
                        </div>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <h1 className='margin-bottom'>Sign in</h1>
                        <form onSubmit={onSubmit}>
                            <div className="form-outline mb-4">
                                <label className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />

                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            {errors}
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup;