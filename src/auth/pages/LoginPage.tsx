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
            <h2>登录</h2>
            <form onSubmit={accessPermission}>
                <p>
                    <label>手机号/邮箱</label>
                    <br />
                    <input type="text" name="phone" required />
                </p>
                <p>
                    <label>密码</label>
                    <Link to="/forget-password">
                        <label className="right-label">忘记密码?</label>
                    </Link>
                    <br />
                    <input type="password" name="password" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">
                        登录
                    </button>
                </p>
            </form>
            <footer>
                <p>
                    第一次? <Link to="/register">创建账号</Link>.
                </p>
                <p>
                    <Link to="/landingpage">回到主页</Link>.
                </p>
            </footer>
        </div>
    );
}
