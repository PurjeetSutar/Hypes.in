import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent. Please check your inbox.');
            setError('');
        } catch (err) {
            setError('Failed to send password reset email. Please try again.');
            setMessage('');
        }

        setTimeout(()=>{
          navigate('/')
        },10000)
    };

    return (
      <>
      <div>
            <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center shadow-lg">
                <div className="bg-[#D5ED9F] rounded-2xl flex max-w-3xl p-5 items-center shadow-lg">
                    <div className="md:block hidden w-1/2 bg-white min-h-[500px] rounded-2xl flex items-center justify-center">
                        <img
                            className="rounded-2xl mt-[75px] scale-75 shadow-2xl"
                            src='3275434.jpg'
                            alt="login"
                        />
                    </div>

                    <div className="md:w-1/2 px-8">
                        <h2 className="font-bold text-3xl text-[#006769]">Forget Password</h2>
                        <p className="text-sm mt-4 text-[#006769]">If you already a member, easily log in now.</p>
                        <form  onSubmit={handlePasswordReset} className="flex flex-col gap-4">
                            <input
                                className="p-2 mt-8 rounded-xl border"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required

                            />
                            
                    {message && <p className="text-green-500 text-center">{message}</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}

                            <button className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium" type="submit">
                               Reset Password
                            </button>
                        </form>
           
                        <div className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip">
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export default ForgetPasswordPage;
