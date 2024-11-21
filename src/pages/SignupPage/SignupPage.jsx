import React, { useState } from 'react';
import { auth, provider } from '../../Firebase/firebase.js'; // Import Firebase authentication and provider for Google
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth"; // Firebase auth methods
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore
import { useNavigate } from "react-router-dom"; // For redirection after signup
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Formik for form handling

const SignupPage = () => {
    const [error, setError] = useState('');
    const db = getFirestore(); // Firestore reference
    const navigate = useNavigate();

    // Google Authentication handler
    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Store user information in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                uid: user.uid
            });

            // Redirect to home after Google signup
            navigate('/profile');
        } catch (error) {
            setError(error.message);
        }
    };

    // Form submission handler using Formik
    const handleSubmit = async (values, { setSubmitting }) => {
        const { name, mobile, email, password } = values;

        try {
            // Create a new user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user's display name
            await updateProfile(user, { displayName: name });

            // Store user information in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name,
                mobile,
                email,
                uid: user.uid
            });

            // Redirect to the home page after signup
            navigate('/profile');
        } catch (error) {
            setError(error.message);
        }

        setSubmitting(false);
    };

    return (
        <div>
            <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
                <div className="bg-[#D5ED9F] rounded-2xl flex max-w-3xl p-5 items-center">
                <div className="md:block hidden w-1/2 bg-white min-h-[500px] rounded-2xl flex items-center justify-center">
                        <img
                            className="rounded-2xl mt-[50px] scale-75 shadow-2xl"
                            src='5023219.jpg'
                            alt="login"
                        />
                    </div>
                    <div className="md:w-1/2 px-8">
                        <h2 className="font-bold text-3xl text-[#006769]">Sign Up</h2>
                        <p className="text-sm mt-4 text-[#006769]">Create an account to get started.</p>
                        {error && <p className="text-red-500">{error}</p>}

                        <Formik
                            initialValues={{
                                name: '',
                                mobile: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = 'Full Name is required';
                                }
                                if (!values.mobile) {
                                    errors.mobile = 'Mobile Number is required';
                                }
                                if (!values.email) {
                                    errors.email = 'Email Address is required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.password) {
                                    errors.password = 'Password is required';
                                }
                                if (!values.confirmPassword) {
                                    errors.confirmPassword = 'Confirm Password is required';
                                } else if (values.password !== values.confirmPassword) {
                                    errors.confirmPassword = 'Passwords do not match';
                                }
                                return errors;
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-4">
                                    <Field
                                        className="p-2 mt-8 rounded-xl border"
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500" />

                                    <Field
                                        className="p-2 mt-2 rounded-xl border"
                                        type="tel"
                                        name="mobile"
                                        placeholder="Mobile Number"
                                    />
                                    <ErrorMessage name="mobile" component="div" className="text-red-500" />

                                    <Field
                                        className="p-2 mt-2 rounded-xl border"
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500" />

                                    <Field
                                        className="p-2 rounded-xl border w-full"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500" />

                                    <Field
                                        className="p-2 rounded-xl border w-full"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />

                                    <button
                                        className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Sign Up
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        <div className="mt-6 items-center text-white-500">
                            <hr className="border-gray-300" />
                            <p className="text-center text-sm text-[#006769]">OR</p>
                            <hr className="border-gray-300" />
                        </div>

                        <button
                            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
                            onClick={handleGoogleSignup}

                        >
                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.165,4.165-3.936,5.573c0.003-0.002,0.005-0.003,0.008-0.005l6.19,5.238c-0.438,0.389,6.817-5.126,6.817-18.889C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Sign Up with Google
                        </button>

                        <div className="mt-5 text-center">
                            <button
                                className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
                                onClick={() => navigate('/')} // Navigate back to login page
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignupPage;


