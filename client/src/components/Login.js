import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [error, setError] = useState();

  const [data, setData] = useState({
    username: "",
    passowrd: "",
    loggedIn: false
  });
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
const logout =() => {
  localStorage.clear("token")
}
  const login = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", data)
      .then(response => {
        console.log(response.data);
        const { data } = response;
        localStorage.setItem("token", data.payload);
        setData({...data, loggedIn: true})
      })
      .catch(error => console.log("LOGIN ERROR", error), setError(error));
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        {error && <div className="error">{error}</div>}
        <legend>{data.LoggedIn ? "Logged in" : "Please login"}</legend>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={data.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
        />

        <button type="submit"> Login </button>
        <button onClick={logout} >Logout</button>
      </form>
    </>
  );
};

export default Login;
