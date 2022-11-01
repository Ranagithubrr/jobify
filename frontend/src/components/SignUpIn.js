import React from 'react';
import Logo from '../assets/images/logo.svg';
import {Link} from 'react-router-dom';
import './SignUpIn.css'

const SignUpIn = (props) => {
    return (
        <div className='signinpage'>
            <form action="">
                <div className="signinArea">
                    <img src={Logo} alt="Logo here" />
                    <h3 className='my-3'>{props.Pagename}</h3>
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
                    <p className='signreglink'>{props.Member}<Link to={props.LinkTo}>{props.OtherPage}</Link> </p>
                </div>
            </form>

        </div>
    )
}

export default SignUpIn
