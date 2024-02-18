import React, { useState } from "react";
import styles from "./Login.module.css";
import InputControl from "../InputControl/InputController";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setsubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all Details");
      return;
    }
    setErrorMsg("");

    setsubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setsubmitButtonDisabled(false);
        
        navigate("/");
      })
      .catch((err) => {
        setsubmitButtonDisabled(false);
        setErrorMsg(err.message);
        console.log("Error", err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}> Login </h1>
        <InputControl
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          label="Email"
          placeholder=" Enter Email Here "
        />
        <InputControl
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          label="Password"
          placeholder=" Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg} </b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            {" "}
            Login{" "}
          </button>
          <p>
            Dont have an account ?{" "}
            <span>
              <Link to="/signup"> SIGNUP </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
