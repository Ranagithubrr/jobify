import React, { useState } from 'react';
import './editprofile.css';
import { FiEdit } from 'react-icons/fi'
import { useEffect } from 'react';

const EditProfile = (props) => {
    const id = localStorage.getItem('userid');

    // loading the user
    const [user, setUser] = useState({ response: {} });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        LoadUserDataFunc();
    }, []);

    const userid = JSON.parse(localStorage.getItem('userid'));

    const LoadUserDataFunc = async () => {

        try {
            const res = await fetch('/api/v1/jobs/userdata', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userid
                }),
            });
            const response = await res.json();
            if (response) {
                setUser({ ...user, response });
                setLoading(false);
            }
        }
        catch (err) {
            console.log('err');
        }
    };
    console.log(loading);


    // console.log(User);


    const { name, lastname, title, phone, education, location, bloodgroup, about } = user.response;
    // console.log(name);




    



    let skills = [];
    const CheckboxChanged = (e) => {
        let userExists = skills.indexOf(e.target.value) > -1; //true
        if (!userExists) {
            skills.push(e.target.value)
        } else {
            for (var i = skills.length - 1; i >= 0; i--) {
                if (skills[i] === e.target.value) {
                    skills.splice(i, 1);
                }
            }
        };
        console.log(skills);
    };


    const [newuser, setNewuser] = useState({
        'name': name,
        'lastname': lastname,
        'title': title,
        'phone': phone,
        'education': education,
        'location': location,
        'bloodgroup': bloodgroup,
        'about': about,
        'skills': [skills]
    })

   
    // const [reducerValue,forcedUpdate] = useReducer(x=>x+1,0);

    let names, values;
    const handleChange = (e) => {
        names = e.target.name;
        values = e.target.value;
        setNewuser({ ...newuser, [names]: values });
        
    }
    console.log(newuser);
    const UpdataBtnClicked = async () => {
        console.log(skills);
        console.log(newuser);
        const { name, lastname, title, phone, education, location, bloodgroup, about } = newuser;
        const res = await fetch('/api/v1/auth/update', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id, name, lastname, title, phone, education, location, bloodgroup, skills, about
            }),
        });
        const data = await res;
        console.log(data);
        if (data.status === 406) {
            window.alert('Select up to 5 skills')
        }
        if (data.status === 200) {
            window.alert('Data Updated Successfully');
            window.location.reload();
        }
    }

    return (
        <div className='profileArea'>
            <div className="row editProfieEdit">
                <div className="col-6">
                    <div className="inputArea">
                        <input type="text" id="name" name="name" defaultValue={name} onChange={handleChange} placeholder='First Name' />
                    </div>
                    <div className="inputArea">
                        <input type="text" id="title" name="title" defaultValue={title} onChange={handleChange} placeholder='Title' />
                    </div>
                    <div className="inputArea">
                        <input type="text" id="education" name="education" defaultValue={education} onChange={handleChange} placeholder='Education' />
                    </div>
                    <div className="inputArea">
                        <input type="text" id="location" name="location" defaultValue={location} onChange={handleChange} placeholder='Location' />
                    </div>
                    <div className="inputArea">
                        <h6>Select Profile Picture</h6>
                    </div>


                </div>
                <div className="col-6">
                    <div className="inputArea">
                        <input type="text" id="lastname" name="lastname" defaultValue={lastname} onChange={handleChange} placeholder='Last Name' />
                    </div>
                    <div className="inputArea">
                        <input type="number" id="phone" name="phone" defaultValue={phone} onChange={handleChange} placeholder='Phone' />
                    </div>
                    <div className="inputArea">
                        <input type="email" id="email" name="email" onChange={handleChange} placeholder='email is not changeable' disabled />
                    </div>
                    <div className="inputArea">
                        <div className="bloodGroupBox">
                            <span>Blood Group</span>
                            <select name="bloodgroup" id="blood" onChange={handleChange} defaultValue={bloodgroup}>
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
                            <div className="skillsBox">
                                <label><input type="checkbox" onChange={CheckboxChanged} value="FLUTTER" />FLUTTER</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row editProfileAboutTextArea">
                    <div className="col">
                        <textarea name="about" id="" cols="30" rows="5" placeholder='About yourself . . .' onChange={handleChange} defaultValue={about}></textarea>
                    </div>
                    <div className="userButtonArea">
                        <button className='defaultBtn' onClick={UpdataBtnClicked}> <FiEdit /> Update</button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditProfile
