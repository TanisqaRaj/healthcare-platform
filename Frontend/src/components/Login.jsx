import { useState } from 'react';
import LoginImg from '.././assets/images/loginimg.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('doctor');
    const [errorMessage, setErrorMessage] = useState('');

    // Email validation regex (simple)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Password validation regex (at least 6 alphanumeric characters)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset error message
        setErrorMessage('');

        // Validate email
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        // Validate password
        if (!passwordRegex.test(password)) {
            setErrorMessage('Password must be at least 6 characters long and include both letters and numbers.');
            return;
        }

        // If validation passes, proceed with login logic
        alert('Login successful!');
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-full md:w-1/2 bg-blue-600 flex flex-col justify-center items-center p-8">
                <h1 className="text-4xl text-white mb-2">Lets you sign in</h1>
                <p className="text-white mb-4">
                    Welcome to our Page{' '}
                    <a href="#" className="text-blue-300">
                        Sign Up
                    </a>
                </p>
                <div className="w-full max-w-xs">
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-sm">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-white text-sm font-bold mb-2"
                                htmlFor="loginType"
                            >
                                Login As
                            </label>
                            <select
                                id="loginType"
                                value={loginType}
                                onChange={(e) => setLoginType(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="doctor">Patient</option>
                                <option value="doctor">Doctor</option>
                                <option value="pharmacy">Pharmacy</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-white text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-white text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="inline-flex items-center text-white">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="ml-2">Keep me logged in</span>
                            </label>
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden md:flex md:w-1/2 bg-white justify-center items-center">
                <img src={LoginImg} alt="login img" className="max-w-full h-auto" />
            </div>
        </div>
    );
};

export default Login;
