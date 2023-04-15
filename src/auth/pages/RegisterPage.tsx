import React from 'react';
import { Link } from 'react-router-dom';
// import zmRequest from '@/service/index'
import './index.less';

export default function SignUpPage() {
    const registerAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={registerAccount}>
                <p>
                    <label>Username</label>
                    <br />
                    <input type="text" name="first_name" required />
                </p>
                <p>
                    <label>Email address</label>
                    <br />
                    <input type="email" name="email" required />
                </p>
                <p>
                    <label>Password</label>
                    <br />
                    <input type="password" name="password" required />
                </p>
                <p>
                    <input
                        type="checkbox"
                        name="checkbox"
                        id="checkbox"
                        required
                    />{' '}
                    <span>
                        I agree all statements in{' '}
                        <a
                            href="register"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            terms of service
                        </a>
                    </span>
                    .
                </p>
                <p>
                    <button id="sub_btn" type="submit">
                        Register
                    </button>
                </p>
            </form>
            <footer>
                <p>
                    <Link to="/">Back to Homepage</Link>.
                </p>
            </footer>
        </div>
    );
}
