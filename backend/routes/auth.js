const router = require('express').Router();
const User = require("../models/user");
const UserToken = require("../models/UserToken");
const crypto = require("crypto");
const authenticated = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        // const hashPassword = bcrypt.hashSync(password);
        // console.log(hashPassword);
        const user = new User({ email, username, password });
        await user.save().then(() => res.status(200).json({ user: user }));
    } catch (err) {
        res.status(400).json({ message: " User already exists" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "please sign up first" });
        }
        //const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.passoword);
        if (req.body.password != user.password) {
            return res.status(400).json({ message: "invalid password.please enter again" });
        }
        const token = crypto.randomBytes(64).toString('hex');
        const userToken = new UserToken({ token: token, is_active: 1, user: user });
        const response = await userToken.save();
        const { password, ...others } = user._doc;

        return res.status(200).json(response);
    } catch (err) {
        return res.status(400).json({ message: " User already exists" });
    }
});

module.exports = router;
