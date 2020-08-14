import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import Cart from '../../models/Cart';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb();

export default async (req, res) => {
    const {name, email, password } = req.body
    try {
        //validate name, email and, password.
        if(!isLength(name, { min: 3, max: 11})) {
            return res.status(422).send("Name must be between 3-10 characters long. Sorry 'Christerpher.'")
        } else if (!isLength(password, {min: 6})) {
            return res.status(422).send("Password must be at least 6 characters")
        } else if (!isEmail(email)) {
            return res.status(422).send("Email must be valid pal")
        }
        //
        //check if user exists
        const user = await User.findOne({ email })
        if (user) {
            return res.status(422).send(`User already exists with ${email}`)
        }
        // -- if not, hash password
        const hash = await bcrypt.hash(password, 10)
        //create user
        const newUser = await new User({
            name, 
            email,
            password: hash
        }).save()
        console.log({newUser});
        //creat cart for user
        await new Cart({ user: newUser._id}).save();
        //create token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d' })
        //send back token
        res.status(201).json(token)
    } catch(error) {
        console.error(error)
        res.status(500).send("Error when signing up, soz")
    }
}