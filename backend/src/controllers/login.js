// import express from 'express'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import User from '../models/User';


// const login = async (req, res) => {
//     const secret = process.env.SECRET_KEY
//     try {
//         const { email, password} = req.body;
//         const existing_user = await User.findOne({ email });
//         if(!existing_user){
//             res.status(404).json({ message: "User not found"});
//             return;
//         }
//         const compare_password = await bcrypt.compare(password, existing_user.password);
//         if(!compare_password){
//             res.status(401).json({ message: "Password mismatch"})
//             return;
//         }
//         const token = jwt.sign(
//             {userId: existing_user._id, email: existing_user.email},
//             secret,
//             {expiresIn: '1h'}
//         )
//         res.status(200).json({
//             message: "Login successful",
//             token: token,
//             user: {
//                 id: existing_user._id,
//                 username: existing_user.username,
//                 email: existing_user.email
//             }
//         })

//     } catch (err) {
//         res.status(500).json({ message: "Login failure"});
//         console.error("Login failed", err)
//     }
// }
// export default login