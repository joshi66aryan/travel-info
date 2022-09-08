import React,{useState,useEffect} from 'react';
import { 
    MDBCard, 
    MDBCardBody, 
    MDBInput,
    MDBCardFooter, 
    MDBValidation,
    MDBBtn,
    MDBIcon, 
    MDBSpinner}
from "mdb-react-ui-kit";
import {Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { googleSignIn, login } from '../redux/features/authSlice';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const initialState = {
    email : "",
    password : "",
}

const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const {loading, error} = useSelector((state) => ({...state.auth}))
    const { email, password} =  formValue;
    const [emailErrMsg, setEmailErrMsg] = useState(null);
    const [passErrMsg, setPassErrMsg] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    },[error])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email.length){
            setEmailErrMsg("Please provide email")
        }
        if(!password.length){
            setPassErrMsg("Please provide password")
        }
        if(email && password) {
            dispatch(login({formValue, navigate, toast}))
        }
        handlerClear();
    };
    const handlerClear = () => {
        if(email && password){
            setEmailErrMsg(null);
            setPassErrMsg(null);   
        }

    }

    const onInputChange =(e) => {
        let { name, value } = e.target;
        setFormValue({...formValue, [name]:value });
    };

    const googleSuccess = (res) => {
       var userObject  = jwt_decode(res.credential);
        const email = userObject?.email;
        const name = userObject?.name;
        const googleId = userObject?.sub; 
        const token = res?.credential;
        const result = {email, name, token, googleId};
        dispatch(googleSignIn({result, navigate, toast}));
    }

    const googleFailure = (err) => {
        toast.error(err);
    }

  return (
    <div style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent:"center",
        marginTop:"120px"
    }}>
        <MDBCard alignment="center">
            <MDBIcon fas icon="user-circle" className="fa-2x"/>
            <h5>Sign In</h5>
            <MDBCardBody>
                <MDBValidation onSubmit = {handleSubmit} noValidate className="row g-3">
                        <div className="col-md-12">
                            <MDBInput 
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange = {onInputChange}
                                required
                                invalid
                            />
                            {emailErrMsg&& <div className="tagerrmsg" style={{color : "#f93154"}}>{emailErrMsg}</div>}
                        </div>
                        <div className="col-md-12">
                            <MDBInput 
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange = {onInputChange}
                                required
                                invalid
                            />
                            {passErrMsg && <div className="tagerrmsg" style={{color : "#f93154"}}>{passErrMsg}</div>}
                        </div>
                        <div className = "col-12">
                            <MDBBtn style={{width: "100%"}} className = "mt-2">
                                {
                                    loading && ( 
                                        <MDBSpinner
                                            size ="sm"
                                            role = "status"
                                            tag = "span"
                                            className ="me-2"
                                        /> )
                                }
                                Login
                            </MDBBtn>
                        </div>
                </MDBValidation>
                <br/>
                    <GoogleLogin 
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        state_cookie_domain="single_host_origin"
                        width='370px'
                    />
            </MDBCardBody>
            <MDBCardFooter>
                <Link to = "/register">
                    <p>
                        Don't have an account ? Sign up 
                    </p>
                </Link>
            </MDBCardFooter>
        </MDBCard>

    </div>
  )
}

export default Login;