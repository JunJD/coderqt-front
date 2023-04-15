import zmRequest from '@/service';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authStore } from '@/store/auth';
import './index.less';

export default function SignInPage() {
    const [auth, setAuth] = useRecoilState(authStore);

    const navigator = useNavigate();
    const accessPermission = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        console.log(formData);
        // 将 formData 转换为对象
        const data = Object.fromEntries(formData.entries());
        const res = await zmRequest.post({
            url: '/auth/login',
            data: {
                phone: data.phone,
                password: data.password,
            },
        });
        if (res.success) {
            setAuth({
                ...auth,
                token: res.result.accessToken,
                userInfo: {
                    phone: res.result.sub,
                    username: res.result.username,
                },
            });
        }
    };

    useEffect(() => {
        if (auth.token) {
            navigator('/main');
        }
    }, [auth.token, navigator]);

    return (
        <div className="text-center">
            <h2>Sign in to us</h2>
            <form onSubmit={accessPermission}>
                <p>
                    <label>phone or email address</label>
                    <br />
                    <input type="text" name="phone" required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password">
                        <label className="right-label">Forget password?</label>
                    </Link>
                    <br />
                    <input type="password" name="password" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">
                        Login
                    </button>
                </p>
            </form>
            <footer>
                <p>
                    First time? <Link to="/register">Create an account</Link>.
                </p>
                <p>
                    <Link to="/">Back to Homepage</Link>.
                </p>
            </footer>
        </div>
    );
}
