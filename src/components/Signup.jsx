import React, { useEffect, useState, useRef } from 'react'
import { IoMale } from "react-icons/io5";
import { GiFemale } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, user, } = useSelector(state => state.auth)

    // states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState('male')
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState({});
    const [catchError, setCatchError] = useState(""); // backend error
    
    // Creating refs for each label
    const nameLabelRef = useRef(null);
    const emailLabelRef = useRef(null);
    const passwordLabelRef = useRef(null);
    const confirmPasswordLabelRef = useRef(null);
    const fileLabelRef = useRef(null);  // For file upload label

    // Function to validate form fields
    const validateForm = () => {
        const newErrors = {};
        if (!name) {
            newErrors.nameError = "name is required";
        } if (!email) {
            newErrors.emailError = "email is required";
        } if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.emailError = "enter a valid email";
        } if (!password) {
            newErrors.passwordError = "Password is required";
        } if (!confirmPassword) {
            newErrors.confirmPasswordError = "Confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPasswordError = "Password not Matched";

        }
        return newErrors;
    };

    // Apply border styles based on error states
    useEffect(() => {
        if (nameLabelRef.current) {
            nameLabelRef.current.style.border = error.nameError ? "2px solid crimson" : "";
        }
        if (emailLabelRef.current) {
            emailLabelRef.current.style.border = error.emailError ? "2px solid crimson" : "";
        }
        if (passwordLabelRef.current) {
            passwordLabelRef.current.style.border = error.passwordError ? "2px solid crimson" : "";
        }
        if (confirmPasswordLabelRef.current) {
            confirmPasswordLabelRef.current.style.border = error.confirmPasswordError ? "2px solid crimson" : "";
        }
        if (fileLabelRef.current) {
            fileLabelRef.current.style.border = catchError ? "2px solid crimson" : "";
        }
    }, [error, catchError]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check file size (1 MB = 1024 * 1024 bytes)
            if (file.size > 1024 * 1024) {
                setCatchError("Max file size allowed is 1 MB");
                return;
            } else {
                setCatchError(null)
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("cpassword", confirmPassword);
        formData.append('gender', gender)

        if (image) {
            formData.append("avatar", image);
        }

        if (catchError) return

        console.log(name, email, password, confirmPassword, gender, image)

        const registerPromise = dispatch(register(formData)).unwrap();
        registerPromise.then(
            ()=>{
                if(user) navigate('/chat')
            }
        )
    }


    return (
        <div className='auth-form relative'>
        
            {image == null ? (
                <div className='flex flex-col gap-2 py-1 '>
                    <h1 className="text-3xl font-bold">Hello, Friend!</h1>
                    <div className='font-semibold mx-20 text-center leading-4'>Enter your personal details and start your journey with us</div>
                </div>
            ) : (
                <div className="profile">
                    <img src={imagePreview} />
                </div>
            )}
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


            <label ref={nameLabelRef} className="input input-ghost text-black input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input disabled={isLoading} type="text" className="grow " placeholder="Username" value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)} />
            </label>
            {error.nameError && (
                <div className="errorMessage">{error.nameError}</div>
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
                <input disabled={isLoading} type="text" className="grow " placeholder="Password" value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error.passwordError && (
                <div className="errorMessage">{error.passwordError}</div>
            )}


            <label ref={confirmPasswordLabelRef} className="input input-ghost text-black input-bordered flex items-center gap-2">
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
                <input disabled={isLoading} type="password" className="grow " placeholder="Confirm Password" value={confirmPassword}
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            {error.confirmPasswordError && (
                <div className="errorMessage">{error.confirmPasswordError}</div>
            )}

            {/* gender */}
            <div className='flex items-center gap-10'>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text mx-2 text-lg flex items-center gap-1"><IoMale size={28} /> Male</span>
                        <input disabled={isLoading} type="radio" name="gender" className="radio checked:bg-red-500" defaultChecked value="male" onChange={(e) => setGender(e.target.value)} />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text mx-2 text-lg flex items-center gap-1"><GiFemale size={28} />Female</span>
                        <input disabled={isLoading} type="radio" name="gender" value="female" className="radio checked:bg-blue-500" onChange={(e) => setGender(e.target.value)} />
                    </label>
                </div>
            </div>

            {/* upload */}
            <input disabled={isLoading} ref={fileLabelRef} type="file" onChange={handleImageChange} className="file-input file-input-bordered file-input-md w-full max-w-md" />
            {catchError && (
                <div className="errorMessage" style={{ padding: "2px 6px", fontSize: "10px , " }}>{catchError}</div> // Ensure catchError is displayed here
            )}

            <button disabled={isLoading} className="btn btn-warning" onClick={handleSignup}>Register</button>

            {/* <div className="text-center px-1 w-full">
                <Link to="/login">
                    <span className='font-semibold'>Already have an account?</span>{" "}
                    <span className="text-blue-600 font-bold">Login</span>
                </Link>
            </div> */}
        </div>
    )
}

export default Signup