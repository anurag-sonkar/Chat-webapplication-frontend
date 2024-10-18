import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, user, } = useSelector(state => state.auth)

    // states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [catchError, setCatchError] = useState(""); // backend error

    // Creating refs for each label
    const emailLabelRef = useRef(null);
    const passwordLabelRef = useRef(null);

    // Function to validate form fields
    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.emailError = "email is required";
        } if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.emailError = "enter a valid email";
        } if (!password) {
            newErrors.passwordError = "Password is required";
        }
        return newErrors;
    };

    // Apply border styles based on error states
    useEffect(() => {

        if (emailLabelRef.current) {
            emailLabelRef.current.style.border = error.emailError ? "2px solid crimson" : "";
        }
        if (passwordLabelRef.current) {
            passwordLabelRef.current.style.border = error.passwordError ? "2px solid crimson" : "";
        }

    }, [error, catchError]);


    const handleLoginWithGuestCredentials = (e)=>{
        setEmail('guestlogin02251@gmail.com')
        setPassword('123456')
        handleLogin(e)

    }

    const handleLogin = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        if (catchError) return

        const loginPromise = dispatch(login(formData)).unwrap();
        loginPromise.then(
            () => {
                if (user) navigate('/chat')
            }
        )
    }


    return (
        <div className='auth-form relative' style={{gap:"1rem"}}>
            <div className='flex flex-col gap-2 py-8 '>
                <h1 className="text-4xl font-bold">Welcome Back!</h1>
                <div className='font-semibold mx-20 text-center leading-4'>To keep connected with us please login with your personal info</div>
            </div>

            <label ref={emailLabelRef} className="input input-ghost text-black input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input disabled={isLoading} type="text" className="grow " placeholder="Email" value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </label>
            {error.emailError && (
                <div className="errorMessage">{error.emailError}</div>
            )}



            <label ref={passwordLabelRef} className="input input-ghost text-black input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                </svg>
                <input disabled={isLoading} type="password" className="grow " placeholder="Password" value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error.passwordError && (
                <div className="errorMessage">{error.passwordError}</div>
            )}


            <div className='flex flex-col gap-2 mt-8'>
                <button disabled={isLoading} className="btn btn-error" onClick={handleLoginWithGuestCredentials}>Login With Guest Credentials</button>
                <button disabled={isLoading} className="btn btn-warning text-lg" onClick={handleLogin}>Login</button>
            </div>


        </div>
    )
}

export default Login