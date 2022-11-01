import React from 'react';
import Logo from '../../assets/images/logo.svg';
import {Link} from 'react-router-dom';
// import Button from '../../assets/wrappers/Button';
import './Login.css';

const Login = () => {
    return (
        <div className='signinpage'>
            <form action="">
                <div className="signinArea">
                    <img src={Logo} alt="Logo here" />
                    <h3 className='my-3'>Log in</h3>
                    <div className="inputArea">
                        <label for="email">email</label>
                        <input type="email" id='email' />
                    </div>
                    <div className="inputArea">
                        <label for="password">password</label>
                        <input type="password" id='password' />
                    </div>
                    <div className="inputArea mt-3">
                        <input type="submit" value='Submit' className='defaultBtn'/>
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

