import React, { useState } from 'react';
import './editprofile.css';
import {FiEdit} from 'react-icons/fi'

const EditProfile = () => {
    let skills = [];
    const CheckboxChanged = (e) => {
        // skills.push(e.target.value);
        // console.log(skills);
        let userExists = skills.indexOf(e.target.value) > -1; //true
        if (!userExists) {
            skills.push(e.target.value)
        } else {
            for (var i = skills.length - 1; i >= 0; i--) {
                if (skills[i] === e.target.value) {
                    skills.splice(i, 1);
                }
            }
        }
        // console.log(userExists);
        // console.log(skills);
    };
    const UpdataClicked = () =>{
        console.log('clicked');
    }


    // getting input fields value
    

    return (
        <div className='profileArea'>
            <div className="row editProfieEdit">
                <div className="col-6">
                    <div className="inputArea">
                        <input type="text" id="name" name="name" placeholder='First Name' />
                    </div>
                    <div className="inputArea">
                        <input type="text" id="title" name="title" placeholder='Title' />
                    </div>
                    <div className="inputArea">
                        <input type="text" id="education" name="education" placeholder='Education' />
                    </div>
                    <div className="inputArea">
                        <input type="text" id="location" name="location" placeholder='Location' />
                    </div>
                    
                    
                </div>
                <div className="col-6">
                    <div className="inputArea">
                        <input type="text" id="lastname" name="lastname" placeholder='Last Name' />
                    </div>
                    <div className="inputArea">
                        <input type="number" id="phone" name="phone" placeholder='Phone' />
                    </div>
                    <div className="inputArea">
                        <input type="email" id="email" name="email" placeholder='email is not changeable' disabled />
                    </div>
                    <div className="inputArea">
                        <div className="bloodGroupBox">
                        <span>Blood Group</span>
                        <select name="blood" id="blood">
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                        </div>

                    </div>

                </div>
                <div className="row">
                    <div className="col">
                    <h5>Skills</h5>
                        <div className="skillsArea">
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="HTML" />HTML</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="CSS" />CSS</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="JS" />JS</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="REACT" />REACT</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="NODE JS" />NODE JS</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="PYTHON" />PYTHON</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="C" />C</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="C++" />C++</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="C#" />C#</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="Django" />Django</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="Autocad 2d" />Autocad 2D</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="Autocad 3d" />Autocad 3D</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="Adobe Photoshop" />Adobe Photoshop</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="Adobe Illustrator" />Adobe Illustrator</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="Adobe Premiere Pro" />Adobe Premiere Pro</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="Motion Graphics" />Motion Graphics</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="Java" />Java</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="Kotlin" />Kotlin</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="Laravel" />Laravel</label>
                            </div>
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="PHP" />PHP</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row editProfileAboutTextArea">
                    <div className="col">
                        <textarea name="about" id="" cols="30" rows="5" placeholder='About yourself . . .'></textarea>
                    </div>
                    <div className="userButtonArea">
                    <button className='defaultBtn' onClick={UpdataClicked}> <FiEdit /> Update</button>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default EditProfile
