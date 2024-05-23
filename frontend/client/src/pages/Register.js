import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(name ==="" || email ==="" || password ===""){
            return toast.error("Please enter your details")
        }

        const response = await axios.post('http://localhost:5000/api/user/signup', {name, email, password})
        try{
            if(response.data.success === true){
                toast.success(response.data.message)
            }
        }
        catch(err){
            toast.error(err.message)
        }
    };

  return (
    <div>
      <div className='container mt-4'>
        <div className='row justify-content-center'>
            <div className='col-md-6'>
            <div className='card shadow'>
                <h4 className='text-center p-2'>Registration Form</h4>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <input type='text' className='form-control' placeholder='Name'
                        value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <input type='email' className='form-control' placeholder='Email'
                        value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <input type='password' className='form-control' placeholder='Password'
                        value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className='mb-2 mt-2'>
                        <button type='submit' className='btn btn-primary'>Sign Up</button>
                    </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register
