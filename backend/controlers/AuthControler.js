import User from '../models/User.js';
import bcrypt from 'bcryptjs';



const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(411).json({ msg: "Fill all the field" })
    } else {
        if (password.length < 6) {
            res.status(411).json({ msg: "password must be at least 6 carecter" })
        } else {
            try {
                const ifExists = await User.findOne({ email })
                if (ifExists) {
                    res.status(406).json('user already exists')
                }
                else {
                    const user = await User.create(req.body);
                    const token = user.createJWT();
                    res.status(201).json({
                        user: {
                            email: user.email,
                            name: user.name,
                            lastname: user.lastname,
                            location: user.location
                        },
                        token
                    });
                }

            } catch (err) {
                res.status(500).json({ msg: 'there was an error' });
                console.log(err);
            }
        }
    }

}
const login = async (req, res) => {
    // res.send('login user')
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).json({ msg: "please fill all the fields" })
    }
    const userExists = await User.findOne({ email }).select('+password')

    // check password 

    if (userExists) {
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (isMatch) {
            // res.status(200).json({ msg: "sign in successfully " });
            const token = userExists.createJWT();
            userExists.password = undefined;
            res.status(200).json({ userExists, token })
        } else {
            res.status(401).json({ msg: "invalid crediantials" })
        }
    } else {
        res.status(401).json({ msg: "invalid crediantials" })
    }
}
const update = async (req, res) => {
    // console.log(req.body);
    // const userid = req.body.id;
    const userid = JSON.parse(req.body.id);
    // console.log(userid);
    const { name, location, lastname, about, bloodgroup, address, education, phone, title, skills, photo } = req.body;
    // console.log(skills);
    if (skills) {
        if (skills.length>5) {
            res.status(406).json({msg:"Select up to 5 skills"})
            // console.log(skills.length);
            res.end()
        } else {

            const filter = { '_id': userid };
            const doc = await User.findOne(filter);
            // console.log('old data is: ', doc);
            // console.log('old skills is: ',doc.skills);
            // const update = {
            //     name:  name == "" ? doc.name : name,
            //     email: email == "" ? doc.email : email,
            //     location: location == "" ? "" : location,
            //     lastname: lastname == "" ? "" : lastname,
            //     about: about == "" ? "" : about,
            //     bloodgroup: bloodgroup == "" ? "" : bloodgroup,
            //     education: education == "" ? "" : education,
            //     phone: phone == "" ? "" : phone,
            //     title: title == "" ? "" : title,
            //     address: address == "" ? "" : address,
            //     skills: skills == "" ? "" : skills
            // };
            const update = {
                name:  name == undefined ? doc.name :  name == "" ? "" : name,
                // email: email == undefined ? doc.email :  email == "" ? "" : email,
                location: location == undefined ? doc.location :  location == "" ? "" : location,
                lastname: lastname == undefined ? doc.lastname :  lastname == "" ? "" : lastname,
                about: about == undefined ? doc.about :  about == "" ? "" : about,
                bloodgroup: bloodgroup == undefined ? doc.bloodgroup :  bloodgroup == "" ? "" : bloodgroup,
                education: education == undefined ? doc.education :  education == "" ? "" : education,
                phone: phone == undefined ? doc.phone :  phone == "" ? "" : phone,
                title: title == undefined ? doc.title :  title == "" ? "" : title,
                address: address == undefined ? doc.address :  address == "" ? "" : address,
                photo: photo == undefined ? doc.photo :  photo == "" ? "" : photo,
                skills: !skills || skills.length == 0   ? doc.skills : skills,
            };
            // let updated = await User.findOneAndUpdate(filter, update);
            User.findOneAndUpdate(filter, update, { upsert: true }, function (err, res) {
                if (err) {
                    res.status(400).json({ msg: "not changed" })
                }
                return res;
                
            });
            
            const newData = await User.findOne(filter);
            res.status(200).json(newData);
        }   
    }else {

        const filter = { '_id': userid };
        const doc = await User.findOne(filter);
        // console.log('old data is: ', doc);
        // console.log('old skills is: ',doc.skills);
        // const update = {
        //     name:  name == "" ? doc.name : name,
        //     email: email == "" ? doc.email : email,
        //     location: location == "" ? "" : location,
        //     lastname: lastname == "" ? "" : lastname,
        //     about: about == "" ? "" : about,
        //     bloodgroup: bloodgroup == "" ? "" : bloodgroup,
        //     education: education == "" ? "" : education,
        //     phone: phone == "" ? "" : phone,
        //     title: title == "" ? "" : title,
        //     address: address == "" ? "" : address,
        //     skills: skills == "" ? "" : skills
        // };
        const update = {
            name:  name == undefined ? doc.name :  name == "" ? "" : name,
            // email: email == undefined ? doc.email :  email == "" ? "" : email,
            location: location == undefined ? doc.location :  location == "" ? "" : location,
            lastname: lastname == undefined ? doc.lastname :  lastname == "" ? "" : lastname,
            about: about == undefined ? doc.about :  about == "" ? "" : about,
            bloodgroup: bloodgroup == undefined ? doc.bloodgroup :  bloodgroup == "" ? "" : bloodgroup,
            education: education == undefined ? doc.education :  education == "" ? "" : education,
            phone: phone == undefined ? doc.phone :  phone == "" ? "" : phone,
            title: title == undefined ? doc.title :  title == "" ? "" : title,
            address: address == undefined ? doc.address :  address == "" ? "" : address,
            photo: photo == undefined ? doc.photo :  photo == "" ? "" : photo,
            skills: !skills || skills.length == 0   ? doc.skills : skills,
        };
        // let updated = await User.findOneAndUpdate(filter, update);
        User.findOneAndUpdate(filter, update, { upsert: true }, function (err, res) {
            if (err) {
                res.status(400).json({ msg: "not changed" })
            }
            return res;
            
        });
        res.status(200).json({msg:'data send'});
        const newData = await User.findOne(filter);
        console.log('updated skills is: ', skills);
        console.log('updated data is:', newData);
    }
}
// find the user 


export { register, login, update }