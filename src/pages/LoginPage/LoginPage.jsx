import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase/firebase"; // Adjust path to your firebase.js

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Handle login with email and password
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");  // Reset error message before trying again
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Login successful!", user);
            // Redirect to another page after successful login
            navigate("/startupfeed");
        } catch (err) {
            console.error("Login error: ", err);
            setError(err.message);  // Display the error message to the user
        }
    };

    // Handle login with Google
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Google Sign-In successful!", user);
            navigate("/startupfeed"); // Redirect after successful login
        } catch (err) {
            console.error("Google Sign-In error: ", err);
            setError(err.message);
        }
    };

    const RegisterClick = () => {
        navigate('/signup');
    };

    return (
        <div>
            <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center shadow-lg">
                <div className="bg-[#D5ED9F] rounded-2xl flex max-w-3xl p-5 items-center shadow-lg">
                    <div className="md:block hidden w-1/2 bg-white min-h-[500px] rounded-2xl flex items-center justify-center">
                        <img
                            className="rounded-2xl mt-[125px] scale-75 shadow-2xl"
                            src='4993397.jpg'
                            alt="login"
                        />
                    </div>

                    <div className="md:w-1/2 px-8">
                        <h2 className="font-bold text-3xl text-[#006769]">Login</h2>
                        <p className="text-sm mt-4 text-[#006769]">If you already a member, easily log in now.</p>
                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            <input
                                className="p-2 mt-8 rounded-xl border"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="relative">
                                <input
                                    className="p-2 rounded-xl border w-full"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium" type="submit">
                                Login
                            </button>
                        </form>
                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        <div className="mt-6 items-center text-white-500">
                            <hr className="border-gray-300" />
                            <p className="text-center text-sm text-[#006769]">OR</p>
                            <hr className="border-gray-300" />
                        </div>
                        <button
                            onClick={handleGoogleLogin}
                            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
                        >
                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Login with Google
                        </button>
                        <div className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip">
                        <a href="/forgetpassword" className="text-indigo-600 hover:text-indigo-800">
                            Forgot Password?
                        </a>
                        </div>
                        <div className="mt-4 text-sm flex justify-between items-center container-mr">
                            <p className="mr-3 md:mr-0 ">If you don't have an account..</p>
                            <button onClick={RegisterClick} className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Register</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
