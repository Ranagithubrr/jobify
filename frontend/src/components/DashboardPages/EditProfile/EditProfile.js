import React, { useState } from 'react';
import './editprofile.css';
import { FiEdit } from 'react-icons/fi'
import { FaPlus } from 'react-icons/fa'
import { useEffect } from 'react';
import { storage } from '../../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem('userid');
    // loading the user
    const [user, setUser] = useState({ response: {} });
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        LoadUserDataFunc();
        // eslint-disable-next-line
    }, []);

    const userid = JSON.parse(localStorage.getItem('userid'));
    // load user old data

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
                // setLoading(false);
            }
        }
        catch (err) {
            console.log('err');
        }
    };
    // console.log(loading);


    // console.log(User);


    const { name, lastname, title, phone, education, location, bloodgroup, about, photo } = user.response;
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
        // console.log(skills);
    };

    const [file, setFile] = useState(null);
    const [img, setImg] = useState(null);
    const [photos, setImgurl] = useState(null);

    const [newuser, setNewuser] = useState({
        'name': name,
        'lastname': lastname,
        'title': title,
        'phone': phone,
        'education': education,
        'location': location,
        'bloodgroup': bloodgroup,
        'about': about,
        'skills': [skills],
        'photo': photos
    })

    // useEffect(()=>{
    //     localStorage.setItem('name',name)
    // },[newuser])

    // uploading image to firebase storage

    useEffect(() => {
        const uploadFile = () => {

            // saving file with user userid as filename
            const name = id;
            const storageRef = ref(storage, `photos/${name}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log('error');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // console.log('File available at', downloadURL);
                        setImgurl(downloadURL);
                        setNewuser({
                            photo: downloadURL
                        })
                        // setFile((prev)=>({...prev, img:downloadURL}))
                        setImg((prev) => ({ ...prev, img: downloadURL }))
                    });
                }
            );
        };
        file && uploadFile();
        // eslint-disable-next-line
    }, [file])


    // console.log(photo);
    // console.log(img);

    let names, values;
    const handleChange = (e) => {
        names = e.target.name;
        values = e.target.value;
        setNewuser({ ...newuser, [names]: values });

    }

    // console.log(newuser);
    const UpdataBtnClicked = async () => {
        // console.log(skills);
        // console.log(newuser);
        const { name, lastname, title, phone, education, location, bloodgroup, about, photo } = newuser;
        // localStorage.setItem('lastname',JSON.stringify(lastname));
        fetch('/api/v1/auth/update', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id, name, lastname, title, phone, education, location, bloodgroup, skills, about, photo
            }),
        })
            .then(response => {
                if (response.status === 406) {
                    toast.warn('Select Up to 5 Skills', {
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
                else if (response.status === 200) {
                    toast.success('Data Updated Successfully . . .', {
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
                        navigate('/profile');
                    }, 1000)
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('name', JSON.stringify(data.name))
                localStorage.setItem('lastname', JSON.stringify(data.lastname))
            })


        // update post data 

        fetch('/api/v1/jobs/update-post', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid, name, lastname, photo
            }),
        })
            .then((res) => {
                // console.log(res.status);
                return res.json();
            })
            .then((data) => console.log(data))

        // update review data 
        fetch('/api/v1/jobs/update-review', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid, name, lastname, photo
            }),
        })
            .then((res) => {
                // console.log(res.status);
                return res.json();
            })
            .then((data) => console.log(data))
    }

    return (
        <div className='profileArea'>
            <ToastContainer />
            <div className="row editProfieEdit">
                <div className="col-12 col-lg-2">
                    <div className="inputArea">
                        <div className="selectProfilePhotoArea">
                            <img src={
                                img
                                    ? img.img
                                    : photo
                            } alt="" className='img-fluid' />
                            <h6>Select Profile Picture</h6>
                            <label htmlFor="selectImage" className='inputLabel'><FaPlus /></label>
                            <input type="file" id='selectImage' onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                    </div>

                </div>
                <div className="col-12 col-lg-5">
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


                </div>
                <div className="col-12 col-lg-5">
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
