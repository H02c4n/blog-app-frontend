import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import gif from "../assets/spinner.gif";
import {toastSuccessNotify} from "../helper/toastify";
import useAuthCalls from '../hooks/useAuthCalls';

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {login} = useAuthCalls();
  const {currentUser, loading} = useSelector((state) => state.auth);

  //console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
      toastSuccessNotify("Log-in is performed successfully");
    }
  }, [navigate, currentUser])
  

  return (
    <div className="wrapper">
      <section>
        <div className="inner">
          <div className="image-holder">
          <img src="https://picsum.photos/368/521?random=1" alt=""/>
            {/* <img src="./form-wizard-2.jpg" alt="" /> */}
          </div>
          <div className="form-content">
            <div className="form-header">
              <h3>LOGIN</h3>
              <div className="progressbar">
                <div
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                  }}
                ></div>
              </div>
            </div>
            <div className="form-body">
            <div className="form-row mt-5">
								<div className="form-holder">
									<input 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email:e.target.value})}
                  type="email"
                  placeholder="Your Email" className="form-control"/>
								</div>
								<div className="form-holder">
									<input
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password:e.target.value})}
                  type="password" placeholder="Password" className="form-control"/>
								</div>
							</div>
            </div>
            <div className="form-footer">
              <button onClick={() => login(formData)} className="btn form-buttons">
              {loading ? (<img style={{width:"25px"}} src={gif} alt="" />): "Submit"}
              
              </button>
            </div>
            <p className="mt-3">
              Do not have an account click <Link to="/register">here</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login