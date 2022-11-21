import React, { useState } from 'react';
import Logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", password: ""
    });
    let name, value;
    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    const FormSubmitted = async (e) => {
        e.preventDefault();
        // console.log(user);
        const { name, email, password } = user;
        if (name === '' || email === '' || password === '') {
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
        }
        else{
            const res = await fetch('/api/v1/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                }),
            });
            const data = await res.json();
            console.log(res.status);
            if (res.status === 201 || res.status === 200) {
                toast.success('Register success . . . Rederecting to Login', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });

                setTimeout(() => {
                    navigate('/login');
                }, 3000)
                console.log(data);
                // redirect to login page 
                // navigate('/login');
            } else if (res.status === 406) {
                toast.warn(' user already exists !', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(' Server error !', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }
    return (
        <div className='signinpage'>
            <ToastContainer
                position="top-center"
                autoClose={2000} />
            <form onSubmit={FormSubmitted}>
                <div className="signinArea">
                    <img src={Logo} alt="Logo here" />
                    <h3 className='my-3'>Register</h3>
                    <div className="inputArea">
                        <label for="email">name</label>
                        <input type="name" id='name' name="name"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputArea">
                        <label for="email">email</label>
                        <input type="email" id='email' name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputArea">
                        <label for="password">password</label>
                        <input type="password" id='password' name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputArea mt-3">
                        <input type="submit" value='Submit' className='defaultBtn' />
                    </div>
                    <p className='signreglink'>Already a member ? <Link to="/login">Login</Link></p>
                </div>
            </form>

        </div>
    )
}

export default Register;
