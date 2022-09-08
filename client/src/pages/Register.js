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
import { register } from '../redux/features/authSlice';

const initialState = {
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword: ""

}

const Register = () => {
    const [formValue, setFormValue] = useState(initialState);
    const {loading, error} = useSelector((state) => ({...state.auth}))
    const { firstName,lastName,email, password,confirmPassword} =  formValue;
    const [emailErrMsg, setEmailErrMsg] = useState(null);
    const [passErrMsg, setPassErrMsg] = useState(null);
    const [confirmPassErrMsg, setConfirmPassErrMsg] = useState(null);
    const [firstNameErr, setFirstNameErr] = useState(null);
    const [lastNameErr, setLastNameErr] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    },[error])

   const handleSubmit = (e) => {
        e.preventDefault();
        if(!email.length){setEmailErrMsg("Please provide email")}
        if(!firstName.length){setFirstNameErr("Please provide first name")}
        if(!lastName.length){setLastNameErr("Please provide last name")}
        if(!password.length){setPassErrMsg("Please provide password")}
        if(!confirmPassword.length){setConfirmPassErrMsg("Please provide confirm password")}

        if(password !== confirmPassword){
            return toast.error("password should match");
        }
        if(email && password && firstName && lastName && confirmPassword) {
            dispatch(register({formValue, navigate, toast}))
        }
        handlerClear();
    };

    const handlerClear = () => {
        if(email && password && firstName && lastName && confirmPassword){
            setEmailErrMsg(null);
            setPassErrMsg(null); 
            setConfirmPassErrMsg(null);  
            setFirstNameErr(null);
            setLastNameErr(null);
        }
    }

    const onInputChange =( e) => {
        let { name, value } = e.target;
        setFormValue({...formValue, [name]:value });
    };

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
                <h5>Sign Up</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit = {handleSubmit} noValidate className="row g-3">
                             <div className="col-md-6">
                                <MDBInput 
                                    label="First Name"
                                    type="text"
                                    value={firstName}
                                    name="firstName"
                                    onChange = {onInputChange}
                                    required
                                    invalid
                                />
                                {firstNameErr&& <div className="tagerrmsg" style={{color : "#f93154"}}>{firstNameErr}</div>}
                            </div>
                            <div className="col-md-6">
                                <MDBInput 
                                    label="Last Name"
                                    type="text"
                                    value={lastName}
                                    name="lastName"
                                    onChange = {onInputChange}
                                    required
                                    invalid
                                />
                                {lastNameErr&& <div className="tagerrmsg" style={{color : "#f93154"}}>{lastNameErr}</div>}
                            </div>
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
                            <div className="col-md-12">
                                <MDBInput 
                                    label="Password confirm"
                                    type="password"
                                    value={confirmPassword}
                                    name="confirmPassword"
                                    onChange = {onInputChange}
                                    required
                                    invalid
                                />
                                {confirmPassErrMsg && <div className="tagerrmsg" style={{color : "#f93154"}}>{confirmPassErrMsg}</div>}
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
                                            />
                                        )
                                    }
                                    Register
                                </MDBBtn>
                            </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to = "/login">
                        <p>
                            Already have an a account? Sign In
                        </p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>

    </div>
  )
}

export default Register;