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
            <h2>注册</h2>
            {/* <h5>创建属于你的账户</h5> */}
            <form onSubmit={registerAccount}>
                <p>
                    <label>用户名</label>
                    <br />
                    <input type="text" name="first_name" required />
                </p>
                <p>
                    <label>邮箱地址</label>
                    <br />
                    <input type="email" name="email" required />
                </p>
                <p>
                    <label>密码</label>
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
                        我同意xxxxx{' '}
                        <a
                            href="register"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            服务条款
                        </a>
                    </span>
                    .
                </p>
                <p>
                    <button id="sub_btn" type="submit">
                        注册
                    </button>
                </p>
            </form>
            <footer>
                <p>
                    <Link to="/landingpage">返回主页</Link>.
                </p>
            </footer>
        </div>
    );
}
