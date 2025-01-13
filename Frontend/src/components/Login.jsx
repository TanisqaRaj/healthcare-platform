import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImg from '../assets/images/loginimg.png'; // Adjust the path as per your project structure
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
    const [identifier, setIdentifier] = useState(''); // Can be email, phone, or username
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Regex validations
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/; // Simple phone number validation
    const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/; // Simple username validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Frontend validation
        if (!emailRegex.test(identifier) && !phoneRegex.test(identifier) && !usernameRegex.test(identifier)) {
            setErrorMessage('Please enter a valid email, phone number, or username.');
            return;
        }

        if (!passwordRegex.test(password)) {
            setErrorMessage('Password must be at least 6 characters long and include both letters and numbers.');
            return;
        }

        // Backend call

    };

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className="flex min-h-screen">
            {/* Login form section */}
            <div className="w-full md:w-1/2 bg-blue-600 flex flex-col justify-center items-center p-8 shadow-2xl rounded-lg">
                <div className="w-full max-w-xs bg-white p-2 rounded-lg shadow-lg">
                    <button onClick={handleBackClick} className="text-blue-600 mb-4">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h1 className="text-4xl text-blue-600 mb-2">Let&apos;s you sign in</h1>
                    <p className="text-blue-600 mb-4">
                        Welcome to our Page{' '}
                        <a href="/registration" className="text-blue-300">
                            Sign Up
                        </a>
                    </p>
                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-sm">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        {/* Login Type Dropdown */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="role"
                            >
                                Select Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >   <option >Select Role</option>
                                <option value="user">User</option>
                                <option value="doctor">Doctor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        {/* Identifier Input */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="identifier"
                            >
                                Email, Phone Number, or Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="identifier"
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="Email, Phone Number, or Username"
                            />
                        </div>
                        {/* Password Input */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
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
                        {/* Submit Button */}
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
            {/* Login Image Section */}
            <div className="hidden md:flex md:w-1/2 bg-white justify-center items-center">
                <img src={LoginImg} alt="login img" className="max-w-full h-auto" />
            </div>
        </div>
    );
};

export default Login;
