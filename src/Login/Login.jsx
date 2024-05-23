import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Input from './Input';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import styles from './Login.module.css'

function Login() {
    const[value,setValue] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const Submit = async(data)=>{
        console.log(data)
        if(data.name === "admin" && data.password === "admin"){
            localStorage.setItem('name',data.name);
          navigate("/")
        }
        else{
          alert("Invalid Credentials")
        }
      }

  return (
    <>
  <div className={styles.wrapper}>
      <h1 className={styles.heading}>Welcome to the Login Page</h1>
      <div className={styles.container}>
        <div className={styles.img}>
          <img width="100%" height="100%" src="/login-image.jpg" alt="cover" />
        </div>
        <div className={styles.outerDiv}>
          <div className={styles.form}>
            <form onSubmit={handleSubmit(Submit)}>
              <Input
                id="user-name"
                label="UserName"
                {...register("name", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name?.type === "required" && (
                <p role="alert">First name is required</p>
              )}
              <Input
                id="password"
                label="Password"
                type="password"
                {...register("password")}
              />
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login