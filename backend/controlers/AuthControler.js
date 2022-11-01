import User from '../models/User.js';



const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(411).json({ msg: "Fill all the field" })
    } else {
       if(password.length < 6){
        res.status(411).json({msg:"password must be at least 6 carecter"})
       }else{
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
const login = (req, res) => {
    res.send('login user')
}
const update = (req, res) => {
    res.send('update user')
}

export { register, login, update }