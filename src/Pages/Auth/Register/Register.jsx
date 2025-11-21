import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState:{errors} } = useForm()
    const {registerUser} = useAuth()
    const handleRegistration = (data) =>{
        console.log('after register',data)
        registerUser(data.email,data.password).
        then(result=>
        {
            console.log(result.user)
        }
        ).catch(error=>{
            console.log(error)
        })

    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email',{required:true})} className="input" placeholder="Email" />
                    {errors.email?.type==='required' && <p className="text-red-500">Email is required</p>}
                    <label className="label">Password</label>
                    <input type="password"{...register('password',{required:true, minLength:6,
                    pattern:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/    
                    })} className="input" placeholder="Password" />
                    {
                       errors.password?.type==='required' && <p className="text-red-500"> password is required</p> 
                    }
                    {
                       errors.password?.type==='minLength' && <p className="text-red-500">password must be six charecters longer</p> 
                    }
                    {
                       errors.password?.type==='pattern' && <p className="text-red-500">password must have atleast one UpperCase , atleast one LowerCase, atleast one digit and atleast one special character</p> 
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already Have an Account<Link className="text-blue-400 underline" to="/login">Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;