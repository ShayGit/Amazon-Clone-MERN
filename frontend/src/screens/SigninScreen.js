import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from '../components/MessageBox';
import { signin } from "../actions/userActions";

export default function SigninScreen(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(signin(email,password))
    }

    const redirect = props.location.search? props.location.search.split('=')[1]
    : '/';

    const userSignin = useSelector((state) => state.userSignin);
  const {userInfo, loading, error} = userSignin;

  useEffect(() =>{
    if(userInfo){
        props.history.push(redirect);
    }
  },[props.history, redirect, userInfo])
    return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox/>}
        
        <div>
          <label htmlFor="email">Email address: </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            value={email}

            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label />
          <button className="primary" type="submit">
            Sign in
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to="/signup">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
