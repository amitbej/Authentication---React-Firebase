import React, { useState } from "react";
import styles from "./Signup.module.css";
import InputControl from "../InputControl/InputController";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setsubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all Details");
      return;
    }
    setErrorMsg("");

    setsubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then( async (res) => {
        setsubmitButtonDisabled(false);
        const user = res.user;
       await updateProfile(user, {
          displayName: values.name,
        });
        navigate('/')
        console.log(user);
      })      
      .catch((err) => {
        setsubmitButtonDisabled(false);
        setErrorMsg(err.message);
        console.log("Error", err.message);
      });
  };

  return (
    <div className={styles.container}>
      {/* <Link to="/">  <h1> Home </h1> </Link> */}
      <div className={styles.innerBox}>
        <h1 className={styles.heading}> SignUp </h1>
        <InputControl
          label="Full Name"
          placeholder=" Enter Your Name Here "
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder=" Enter Email Here "
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder=" Enter Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>

          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            {" "}
            Signup{" "}
          </button>
          <p>
            Already have an account ?{" "}
            <span>
              <Link to="/login"> LOGIN </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
