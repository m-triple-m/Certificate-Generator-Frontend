import { Formik } from "formik";
import React from "react";

const Login = () => {
  return (
    <div style={{height: '70vh'}} className="d-flex justify-content-center align-items-center">
      <div className="col-md-5 col-lg-4 mx-auto">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center">Login Here</h3>
            <hr />
            <Formik initialValues={{email : '', password : ''}} onSubmit={formdata => {
              console.log(formdata);
            }}>
              {({values, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control mt-2 mb-4" name="email" onChange={handleChange} value={values.email} />
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control mt-2 mb-4" name="password" onChange={handleChange} value={values.password} />

                    <button className="mt-5 btn btn-primary w-100">Login</button>

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
