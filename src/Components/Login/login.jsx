import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError(true);
    } else {
      // setSubmitted(true);
      // setError(false);
      // console.log("We are loggin");
      // // navigate("/dial");
      // console.log("We are loggin");
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          console.log(userCredentials);
          console.log(userCredentials.user);
          console.log(userCredentials.user.uid);
          setSubmitted(true);
          setError(false);
          console.log("We are loggin");
          navigate("/dial");

          const userColl = collection(db, "user");
          let userDoc = doc(userColl, userCredentials.user.uid);
          const onSnapshot = await getDoc(userDoc);
          if (onSnapshot.exists()) {
            console.log("Document data:", onSnapshot.data());
            let userInfo = onSnapshot.data();
            setUserName(userInfo.name);
          } else {
            console.log("No such document!");
          }

          // const q = query(
          //   userColl,
          //   where("id", "==", userCredentials.user.uid)
          // );

          // console.log("q : ", q);
          // const querySnapshot = await getDocs(q);
          // querySnapshot.forEach((doc) => {
          //   console.log("We had our query");
          //   // doc.data() is never undefined for query doc snapshots
          //   console.log(doc.id, " => ", doc.data());
          //   let d1 = doc.data();
          //   console.log("d1", d1);
          // });
        })
        .catch((error1) => {
          console.log(error1);
        });
    }
  };

  const handleReset = (e) => {
    console.log("Resetbtn");

    setError(false);
    setSubmitted(false);
    setEmail("");
    setPassword("");
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h3>User {username}! You have been Logged In</h3>
      </div>
    );
  };

  const errorMessage = () => {
    console.log("error");
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h3>Please enter all the fields</h3>
      </div>
    );
  };
  return (
    <>
      <div className="login">
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
        <form action="" className="pg">
          <div>
            <h1 className="htxt">Login</h1>
          </div>
          <div className="items txtinp">
            <input
              type="email"
              onChange={handleEmail}
              className="inp"
              name="email"
              required
            ></input>
            <span className="txt">Email</span>
          </div>

          <div className="items txtinp">
            <input
              type="password"
              onChange={handlePassword}
              className="inp"
              name="pwd"
              required
            ></input>
            <span className="txt">Password</span>
          </div>

          <div className="items">
            <Link to="" className="links fp">
              Forgot Password?
            </Link>
          </div>

          <div className="items">
            <div className="fp fptxt">
              Don't have an Account?
              <Link to="/register" className="links">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="items btncont">
            <button className="btn" onClick={handleSubmit}>
              Login
            </button>
            <button type="reset" onClick={handleReset} className="btn">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
