// import express from 'express'
// import User from '../models/User';
// import bcrypt from 'bcrypt'

// const register = async (req, res) => {
//     try {
//         const { username, email, password} = req.body;
//         const existing_user = await User.findOne({ email });
//         if(existing_user){
//             res.status(500).json({ message: "User already exist"})
//             return;
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, salt)
//         const user = new User({
//             username,
//             email,
//             password: hash
//         })
//         await user.save()
//         res.status(201).json({
//             message: "Register successful",
//             user: {
//                username: user.username,
//                email: user.email
//             }
//         })
//     } catch (err) {
//         res.status(500).json({ message: "Registration failed"});
//         console.error("Registration error", err)
//     }
// }

// export default register