import LoginImg from '../assets/images/loginimg.png';

const Login = () => {
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
                    <div className="mb-4">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="loginType"
                        >
                            Login As
                        </label>
                        <select
                            id="loginType"
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
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex md:w-1/2 bg-white justify-center items-center">
                <img src={LoginImg} alt="login img" className="max-w-full h-auto" />
            </div>
        </div>
    );
};

export default Login;
