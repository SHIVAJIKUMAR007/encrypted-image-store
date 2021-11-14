import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./App.css";
import sideimg from "./assets/sign.png";
import axios from "./axios";
import crypto from "crypto";

const Signup = () => {
  const history = useHistory();

  //use state banaya he
  const [user, setUser] = useState({
    name: "",
    password: "",
    cpassword: "",
    privateKey: "",
  });
  const [public_key, setPublic_key] = useState("");

  //form se utha ke assign karne ke lie
  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  //   //bas user yaha se bhej dena
  //   const postData = async (e) => {
  //   };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([user?.privateKey], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "privateKey.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.name == "") {
      alert("Name is required.");
      return;
    }
    if (user?.password.length < 8) {
      alert("password length must be more than 8.");
      return;
    }
    if (user?.password != user?.cpassword) {
      alert("password must be same as confirm password.");
      return;
    }
    if (user?.name == "") {
      alert("Private key length must be more than 8.");
      return;
    }
    let encPass = crypto
      .createHash("sha256")
      .update(user?.password)
      .digest("hex");
    let signup = await axios.post("api/signup", {
      username: user?.name,
      password: encPass,
    });

    signup = await signup.data;

    if (signup?.status == 1) {
      alert(signup?.msg);
      downloadTxtFile();
      history.push("/login");
      return;
    }

    alert(signup?.msg);
  };
  return (
    <>
      <div className=" form d-flex  justify-content-center ">
        <div className=" Homepage-Container p-2 w-50 row mt-5 ">
          <div className=" mr-5 ml-5 justify-content-center col p-2 ">
            <center>
              <h2 className="text-light"> Signup</h2>
              <NavLink to="/login">
                {" "}
                <p className="text-light smallFont mt-2">
                  Already have an account?
                </p>
              </NavLink>{" "}
            </center>
            <form method="POST" onSubmit={handleSubmit}>
              <input
                className="text-light inputBox"
                type="name"
                name="name"
                value={user.name}
                onChange={handleInput}
                placeholder="Userame"
                required
              />

              <input
                className="text-light inputBox"
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="password"
                required
              />

              <input
                className="text-light inputBox"
                type="password"
                name="cpassword"
                value={user.cpassword}
                onChange={handleInput}
                placeholder="Confirm Password"
                required
              />

              <input
                className="text-light inputBox"
                type="password"
                name="privateKey"
                id="privateKeyDownload"
                value={user.privateKey}
                onChange={handleInput}
                placeholder="Private key"
                required
              />
              <br />

              <div className="d-flex">
                <input type="checkbox" id="terms" value="Bike" />
                <label htmlFor="terms" className=" mx-4">
                  We do not store your private key hence on submiting this form
                  you will a file privateKey.txt will downloaded, you have to
                  upload that privateKey.txt file each time you login. Once you
                  lose file there will not way to retrive your private key and
                  your data, if you are are ready then click on checkbox and
                  move further.
                </label>
              </div>
              <br />
              <button type="submit" className="Logbutton text-light">
                Sign up
              </button>
            </form>
          </div>

          <img
            className="mt-3 mr-2 border rounded justify-content-right col p-0  imagecss"
            src={sideimg}
            alt="login image"
            width="auto"
            height="350"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
