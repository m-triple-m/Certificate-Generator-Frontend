import { Formik } from "formik";
import React, { useContext } from "react";
import app_config from "../config";
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Login = () => {

  const url = app_config.api_url;
  const navigate = useNavigate();

  const {loggedin, setLoggedIn} = useContext(UserContext);

  if(loggedin) return <Navigate to="/generate" />

  const loginSubmit = async (formdata, {resetForm, setSubmitting}) => {
    console.log(formdata);
    setSubmitting(true);
    const response = await fetch(`${url}/user/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
    if(response.status === 200){
      setSubmitting(false);
      resetForm();
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem('user', JSON.stringify(data));
      setLoggedIn(true);
      Swal.fire({
        title: 'Success',
        text: 'Login Successful',
        icon: 'success'
      }).then(() => {
        navigate('/generate');
      })
    }else{
      console.error('Something went wrong');
    }
  }

  return (
    <div style={{height: '70vh'}} className="d-flex justify-content-center align-items-center">
      <div className="col-md-5 col-lg-4 mx-auto">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center">Login Here</h3>
            <hr />
            <Formik initialValues={{email : '', password : ''}} onSubmit={loginSubmit}>
              {({values, handleChange, handleSubmit, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control mt-2 mb-4" name="email" onChange={handleChange} value={values.email} />
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control mt-2 mb-4" name="password" onChange={handleChange} value={values.password} />

                    <button disabled={isSubmitting} className="mt-5 btn btn-primary w-100">Login</button>

                  </form>
              )}
            </Formik>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
