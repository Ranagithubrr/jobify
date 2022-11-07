import React, { useState } from 'react';
import Logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
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


    // get res from form submit 
    const FormSubmitted = async (e) => {
        e.preventDefault();
        if (user.email === '' || user.password === '') {
            window.alert('Please fill all the fields')
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
                navigate('/');
                window.alert('sign in successfully');
                console.log(data.userExists.name);
                localStorage.setItem('userid', JSON.stringify(data.userExists._id));
                // localStorage.setItem('token', JSON.stringify(data.token));
            } else {
                window.alert('Authentication errror');
            }
        }

    }



    return (
        <div className='signinpage'>
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




// import React from 'react'
// import SignUpIn from '../../components/SignUpIn';

// const Login = () => {
//   return (
//     <div>
//         <SignUpIn Pagename="Log in" OtherPage="Register" LinkTo="/register" Member="Not a member yet ?"/>
//     </div>
//   )
// }

// export default Login

