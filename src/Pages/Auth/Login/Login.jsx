import React from 'react';
import { useForm } from 'react-hook-form';
import { CgArrowsExpandLeft } from 'react-icons/cg';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {

    const { signInUser } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handelLogin = (data) => {
        console.log('form data', data)
        signInUser(data.email, data.password).
            then(result => {
                console.log(result.user)
            }
            ).catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
             <h3 className="text-3xl text-center">Welcome to ZapShift</h3>
             <p className="text-center">please Register</p>
            <form className="card-body" onSubmit={handleSubmit(handelLogin)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />

                    {
                        errors.email?.type === "required" && <p className="text-red-500">Email is required</p>

                    }
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />

                    {
                        errors.password?.type === "minLength" && <p className="text-red-500">password must be six character long</p>

                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>New to ZapShift <Link className="text-blue-400 underline" to="/register">Register</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;