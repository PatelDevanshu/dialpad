import React from "react";
import { useState } from "react";
import "../Login/login.css";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [gender, setGender] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [conerror, setConError] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleConPassword = (e) => {
    setConpassword(e.target.value);
    setSubmitted(false);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      password === "" ||
      conpassword === "" ||
      email === "" ||
      gender === ""
    ) {
      setError(true);
      setConError(false);
    } else if (conpassword !== password) {
      setConError(true);
      setError(false);
    } else {
      setSubmitted(true);
      setError(false);
      setConError(false);
      setDisable(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (result) => {
          // console.log("Result", result);
          console.log("id", result.user.uid);

          let usrresultid = result.user.uid;
          console.log("usrresultid", usrresultid);
          const userColl = collection(db, "user");
          let userDoc = doc(userColl, usrresultid);
          const userData = {
            id: `${result.user.uid}`,
            name: name,
            email: email,
            password: password,
            conpassword: conpassword,
            gender: gender,
          };

          setDoc(userDoc, userData)
            .then(() => {
              console.log("Data has been set.");
            })
            .catch((error) => {
              console.log("Error in firebase input : ", error);
            });

          //REturn data from firestore database.
          // let userDoc = doc(userColl, usercredid);
          // const onSnapshot = await getDoc(userDoc);
          // if (onSnapshot.exists()) {
          //   console.log("Document data:", onSnapshot.data());
          // } else {
          //   console.log("No such document!");
          // }
        })
        .catch((e) => {
          console.log(e);
          var ec = e.code;
          console.log(ec);
          switch (ec) {
            case "auth/email-already-in-use": {
              console.log("Email exist : ", ec);
              break;
            }

            case "auth/weak-password": {
              console.log("Weak Password must be 6 characters : ", ec);
              break;
            }

            case "invalid-argument": {
              console.log("Invalid data input:  ", ec);
              break;
            }
            default: {
              console.log("Something went wrong..", ec);
              break;
            }
          }
        });

      setDisable(false);
    }
  };

  const handleReset = (e) => {
    setError(false);
    setConError(false);
    setSubmitted(false);
    setDisable(false);

    setName("");
    setEmail("");
    setPassword("");
    setConpassword("");
    setGender("");
  };

  const conErrorMessage = () => {
    return (
      <div
        className="conerror"
        style={{
          display: conerror ? "" : "none",
        }}
      >
        <h3>Confirm Password not same!!</h3>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h3>User {name} successfully registered!!</h3>
      </div>
    );
  };

  const errorMessage = () => {
    console.log("error in register");
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
      <div className="register">
        <div className="messages">
          {errorMessage()}
          {successMessage()}
          {conErrorMessage()}
        </div>
        <form action="" className="pg rg">
          {/* <Link to='/login'>Login</Link> */}
          <div>
            <h1 className="htxt">Sign Up</h1>
          </div>
          <div className="items rgtxtinp">
            <input
              type="text"
              onChange={handleName}
              className="inp"
              name="name"
              value={name}
              required
            ></input>
            <span className="txt">Name</span>
          </div>

          <div className="items rgtxtinp">
            <input
              type="email"
              onChange={handleEmail}
              value={email}
              name="email"
              className="inp"
              required
            ></input>
            <span className="txt">Email</span>
          </div>
          <div className="items rgtxtinp">
            <input
              type="password"
              onChange={handlePassword}
              value={password}
              name="pwd"
              className="inp"
              required
            ></input>
            <span className="txt">Password</span>
          </div>

          <div className="items rgtxtinp cp">
            <input
              type="password"
              onChange={handleConPassword}
              value={conpassword}
              name="cpwd"
              className="inp"
              required
            ></input>
            <span className="txt">Confirm Password</span>
          </div>

          <div className="tags">
            <span>Gender : </span>
            <select
              width="20px"
              required
              onChange={handleGender}
              value={gender}
            >
              <option value="" className="gname"></option>
              <option value="Male" className="gname">
                Male
              </option>
              <option value="Female" className="gname">
                Female
              </option>
              <option value="Other" className="gname">
                Other
              </option>
            </select>
          </div>
          <div className="tags">
            <div className="fp rgfp">
              Already a member?{" "}
              <Link to="/login" className="links">
                Log In
              </Link>
            </div>
          </div>

          <div className="btncont">
            <button
              type="register"
              onClick={handleSubmit}
              className="btn"
              disabled={disable}
            >
              Register
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

export default Register;
