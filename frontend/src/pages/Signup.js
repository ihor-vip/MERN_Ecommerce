import React, {useState} from 'react';
import {BiHide, BiShow} from "react-icons/bi";

import loginSignUpImage from '../assets/login-animation.gif';
import {Link} from "react-router-dom";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev);
    }

    const handleOnChange = (e) => {
        const [name, value] = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {firstName, email, password, confirmPassword} = data;
        if (firstName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                alert('success')
            } else {
                alert('password not match confirm password')
            }
        } else {
            alert('please fill all fields')
        }
    }

    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
                {/*<h1 className='text-center text-2xl font-bold'>Sign up</h1>*/}
                <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
                    <img src={loginSignUpImage} className='w-full' alt=""/>
                </div>

                <form className='flex flex-col w-full py-3' onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type={'text'}
                        id={'firstName'}
                        name='firstName'
                        value={data.firstName}
                        onChange={handleOnChange}
                        className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type={'text'}
                        id={'lastName'}
                        name='lastName'
                        value={data.lastName}
                        onChange={handleOnChange}
                        className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type={'email'}
                        id={'email'}
                        name='email'
                        value={data.email}
                        onChange={handleOnChange}
                        className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                    />

                    <label htmlFor="password">Password</label>
                    <div className='
                        flex
                        px-2
                        py-1
                        bg-slate-200
                        rounded
                        mt-1
                        mb-2
                        focus-within:outline
                        focus-within:outline-blue-300'
                    >
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id={'password'}
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                            className='w-full bg-slate-200 border-none outline-none'
                        />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
                            {showPassword ? <BiShow/> : <BiHide/>}
                        </span>
                    </div>

                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <div className='
                        flex
                        px-2
                        py-1
                        bg-slate-200
                        rounded
                        mt-1
                        mb-2
                        focus-within:outline
                        focus-within:outline-blue-300'
                    >
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id={'confirmpassword'}
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                            className='w-full bg-slate-200 border-none outline-none'
                        />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>
                            {showConfirmPassword ? <BiShow/> : <BiHide/>}
                        </span>
                    </div>

                    <button
                        className='
                            w-full
                            max-w-[150px]
                            m-auto
                            bg-red-500
                            hover:bg-red-60
                            cursor-pointer
                            text-white
                            text-xl
                            font-medium
                            text-center
                            py-1
                            rounded-full
                            mt-4'
                    >
                        Sign up
                    </button>
                </form>

                <p className='text-left text-sm mt-2'>
                    Already have an account? <Link to={'login'} className='text-red-500 underline'>Login</Link>
                </p>

            </div>
        </div>
    )
}

export default Signup