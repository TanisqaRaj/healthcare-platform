import React from 'react';
import { Grid, Cell } from 'react-bento-grid';
import './Login.css';

const Temp = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bg-blue-300 rounded-full h-64 w-64 top-10 left-10 opacity-50"></div>
                <div className="absolute bg-pink-300 rounded-full h-64 w-64 bottom-10 right-10 opacity-50"></div>
                <div className="absolute bg-yellow-300 rounded-full h-64 w-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            </div>
            <Grid columns={12} gap={20}>
                <Cell span={4} />
                <Cell span={4}>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input type="email" placeholder="Enter your email" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input type="password" placeholder="Enter your password" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Profile Photo</label>
                                <input type="file" accept="image/*" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Login</button>
                        </form>
                    </div>
                </Cell>
                <Cell span={4} />
            </Grid>
        </div>
    );
};

export default Temp;