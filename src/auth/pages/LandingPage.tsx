import React from 'react';
import { Link } from 'react-router-dom';

import './index.less';

export default function LandingPage() {
    return (
        <header className="landing-page">
            <h1 className="main-title text-center">coderQt</h1>
            <p className="main-para text-center">现在加入我们</p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">登录 </button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn">
                        <span>注册 </span>
                    </button>
                </Link>
            </div>
        </header>
    );
}
