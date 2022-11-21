import React, { useState } from 'react';
import Logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "", password: ""
    });
    let name, value;
    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    const showToast = () =>{
        toast("Wow so easy!")
    }
    // get res from form submit 
    const FormSubmitted = async (e) => {
        e.preventDefault();
        if (user.email === '' || user.password === '') {
            toast.error(' Please Fill all the fields!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
            // window.alert('Please fill all the fields')
        } else {
            // console.log(user);
            const { email, password } = user;
            const res = await fetch('/api/v1/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                }),
            });
            const data = await res.json();
            // console.log(data);
            console.log(res.status);
            if (res.status === 201 || res.status === 200) {
                
                toast.success('Sign in success . . . Rederecting to Dashboard', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    });
                    setTimeout(()=>{
                        navigate('/');
                    },3000)
                console.log(data.userExists.name);
                localStorage.setItem('userid', JSON.stringify(data.userExists._id));
                localStorage.setItem('name', JSON.stringify(data.userExists.name));
                if(data.userExists.lastname === undefined){
                    localStorage.setItem('lastname', '');
                }else{
                    localStorage.setItem('lastname', JSON.stringify(data.userExists.lastname));
                }
                
                // localStorage.setItem('token', JSON.stringify(data.token));
            } else {
                toast.error('Authentication error !', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    });
                // window.alert('Authentication errror');
            }
        }

    }



    return (
        <div className='signinpage'>
            <ToastContainer 
            position="top-center"
            autoClose={2000}
            />
            <form onSubmit={FormSubmitted}>
                <div className="signinArea">
                    <img src={Logo} alt="Logo here" />
                    <h3 className='my-3'>Log in</h3>
                    <div className="inputArea">
                        <label for="email">email</label>
                        <input
                            type="email"
                            id='email'
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputArea">
                        <label for="password">password</label>
                        <input
                            type="password"
                            id='password'
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputArea mt-3">
                        <input type="submit" value='Submit' className='defaultBtn' />
                    </div>
                    <p className='signreglink'>Not a member yet? <Link to="/register" >Register</Link></p>
                    
                </div>
            </form>
        </div>
    )
}

export default Login
