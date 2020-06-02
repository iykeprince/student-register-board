import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const login = await axios.post(
                "/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("res", login.data);
        } catch (e) {
            setError(e.response.data.message);
        }
    };

    return (
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-6 mt-5">
                <div className="card">
                    <div className="card-body">
                        <h3>Login</h3>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <button className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-2"></div>
        </div>
    );
};

export default Login;
