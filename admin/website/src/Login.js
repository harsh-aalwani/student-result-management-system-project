import React from 'react';
import logo from './assets/images/logo.png';
import './assets/css/Login.css';

function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-5 shadow-lg rounded">
            <form className="card-body cardbody-color p-lg-5">
              <div className="text-center">
                <img src={logo} className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="150px" alt="profile"/>
              </div>
              <h2 className="text-dark text-center mb-4">Login</h2>
              <div className="mb-4">
                <input type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" placeholder="User Name"/>
              </div>
              <div className="mb-4">
                <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
              </div>
              <div className="text-center">
                <input type="submit" className="btn btn-primary btn-lg w-100" name='submit' id='submit' value="Login"/>
              </div>
              <div id="emailHelp" className="form-text text-center mt-4 text-dark">
                <a href="<>" className="text-dark fw-bold">Forgot Password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
//username
//password
//submit