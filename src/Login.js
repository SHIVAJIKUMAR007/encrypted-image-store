import axios from "./axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./App.css";
import sideimg from "./assets/log.jpg";
import crypto from "crypto";

const Login = () => {
  const history = useHistory();

  //use state banaya he
  const [priv_key, setPriv_key] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  //form se utha ke assign karne ke lie
  const handleInput = (e) => {
    console.log(e);
    let name, value;
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const getKey = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);
      setPriv_key(text);
    };
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    if (file.name != "privateKey.txt") {
      alert("This file is not correct");
      return;
    }
    reader.readAsText(file);
  };
  //bas user yaha se bhej dena
  const postData = async (e) => {
    e.preventDefault();

    if (user?.username == "") {
      alert("Name is required.");
      return;
    }
    if (user?.password.length < 8) {
      alert("password length must be more than 8.");
      return;
    }
    if (priv_key?.length < 8) {
      alert("Private key file either not correct or does not uploaded.");
      return;
    }

    let encPass = crypto
      .createHash("sha256")
      .update(user?.password)
      .digest("hex");
    let login = await axios.post("api/login", {
      username: user?.username,
      password: encPass,
    });

    login = await login.data;
    console.log(login);

    if (login?.status == 1) {
      console.log(login, "djfjskdjf");

      alert(login?.msg);
      window.localStorage.setItem("privateKey", priv_key);
      window.localStorage.setItem("user", JSON.stringify(login?.data));
      window.location.replace("/");
      return;
    }

    alert(login?.msg);
  };

  return (
    <>
      <div className=" form d-flex  justify-content-center ">
        <div className=" Homepage-Container p-2 w-50 row mt-5 ">
          <div className=" mr-5 ml-5 justify-content-center col p-2 ">
            <center>
              <h2 className="text-light"> Login</h2>
              <NavLink to="/signup">
                {" "}
                <p className="text-light smallFont mt-2">
                  Dont have an account? click here{" "}
                </p>
              </NavLink>
            </center>
            <form className="col  " method="POST">
              <input
                className="row text-light inputBox inputcss"
                type="text"
                name="username"
                placeholder="username"
                value={user?.username}
                onChange={handleInput}
                required
              />
              <input
                className="row  inputBox text-light inputcss"
                type="password"
                name="password"
                placeholder="Password"
                value={user?.password}
                onChange={handleInput}
                required
              />

              <label htmlFor="keyFile">Upload privateKey file</label>
              <input
                className="row inputBox  text-light inputcss"
                id="keyFile"
                type="file"
                accept="text/plain"
                placeholder="private key"
                onChange={getKey}
                required
              />
              <button className="Logbutton text-light" onClick={postData}>
                Login
              </button>
            </form>
          </div>

          <img
            className="mt-3 mr-2 border rounded justify-content-right col p-0  imagecss"
            src={sideimg}
            alt="login image"
            width="auto"
            height="300"
          />
        </div>
      </div>
    </>
  );
};

export default Login;

// Upload the private key here
//               <input className=""  type="file"  name="file"
//                     placeholder=""
//                     onChange= {, (e)=>{ e.preventDefault(); setfile(e.target.files[0])}}
//                     />
