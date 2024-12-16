import React from 'react'
import{link}from'react-router-dom'
import{ToastContainer}from 'react-toastify';

const Signup = () => {
  return (
    <div className='conatainer'>
        <h1>Login</h1>
        <form>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                type='text'
                name='name'
                autoFocus
                placeholder='Enter your name...'
                />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                type='Email'
                name='Email'
                
                placeholder='Enter your Email...'>

                </input>
            </div>
        
            <div>
            <label htmlFor='Password'>Password</label>
                <input
                type='Password'
                name='Password'
                
                placeholder='Enter your Password...'>

                </input>
            </div>
            <button>Signup</button>
            <span>Already have an account?
                <link to="/login">Login</link>
            </span>
        </form>
</div>
  )
}

export default Signup