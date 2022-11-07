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
    const userid = req.body.id;
    const { name, email, location, lastname, about, bloodgroup, address, education, phone, title, skills } = req.body;
    if (skills && skills.length > 8) {
        res.status(406).send("Select up to 5 skills")
    } else {



        const filter = { '_id': userid };
        const doc = await User.findOne(filter);
        // console.log('old data is: ', doc);
        const update = {
            name: name,
            email: email,
            location: location,
            lastname: lastname,
            about: about,
            bloodgroup: bloodgroup,
            education: education,
            phone: phone,
            title: title,
            address: address,
            skills: skills
        };
        // let updated = await User.findOneAndUpdate(filter, update);
        User.findOneAndUpdate(filter, update, { upsert: true }, function (err, res) {
            if (err) {
                res.status(400).json({ msg: "not changed" })
            }
            return res;

        });
        res.status(200).send('data send');
        // const newData = await User.findOne(filter);
        // console.log('updated data is:', newData);
    }
}
// find the user 


export { register, login, update }