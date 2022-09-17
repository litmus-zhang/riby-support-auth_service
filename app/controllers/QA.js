const QA = require('../models/QA');
const {  validateRegister, validateLogin, validateResetPassword, validateUpdatePassword } = require('../middleware/Input-validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const request = require('../config/mail');
exports.Register = async (req, res) =>
{
    const QA_MODEL = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    
    try
    {
        const { error, value } = validateRegister(QA_MODEL);

        if (error)
        {
            return res.status(400).json({ message: error.details});
        }
        const user = await QA.findOne({ where: { email: value.email } });
        if (user)
        {
            return res.status(422).json({message: "QA already exists"});
        }
       
       const hashedPassword = await bcrypt.hash(QA_MODEL.password, 12);
        const new_user = await QA.create({
            name: QA_MODEL.name,
            email: QA_MODEL.email,
            password: hashedPassword
        });
        await new_user.save();
        return res.status(201).json({ message: "QA created successfully" });
        // return res.status(201).json(new_user);
    }
    catch (err)
    {
   
        return res.status(500).json({ message: "You are not Authorized" });
    }
}

exports.Login = async (req, res) =>
{
    try {
        const QA_MODEL = {
            email: req.body.email,
            password: req.body.password
        }
        const { error, value } = validateLogin(QA_MODEL);
        if (error)
        {
            return res.status(400).json({ message: error.details});
        }
        const user = await QA.findOne({ where: { email: value.email } });
        if (!user)
        {
           return res.status(401).json({ message: "QA does not exist" });
        }
        const isEqual = await bcrypt.compare(value.password, user.password);
        if (!isEqual)
        {
            return res.status(401).json({message: "Password is incorrect"});
        }
        //Generate token
        // const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
        return res.status(200).json({ token: token, userId: user.id, message: "QA logged in successfully" });

        // return res.status(200).json(user);
    } catch (error)
    {
        
        return res.status(500).json({ message: "You are not Authorized" });
    }
}

exports.ResetPassword = async (req, res) =>
{
    try
    {
        const { error, value } = validateResetPassword(req.body);
        if (error)
        {
            return res.status(400).json({ message: error.details});
        }
        const user = await QA.findOne({ where: { email: value.email } });
        if (!user)
        {
            return res.status(401).json({message: "There is no QA with this email"});
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const useremail = user.email;
        const username = user.name;
        await request(useremail, username);

        return res.status(200).json({ message: "Reset password link sent to your email" });

    } catch (error)
    {
        console.log(error);
        return res.status(500).json({ message: "You are not Authorized" });
    }
}
exports.UpdatePassword = async (req, res) =>
{

    try
    {
        const { error, value } = validateUpdatePassword(req.body);
        if (error)
        {
            return res.status(400).json({ message: error.details});
        }
        const user = await QA.findOne({ where: { email: value.email } });
        if (!user)
        {
            return res.status(401).json({message: "There is no QA with this email"});
        }
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password changed successfully" });
    }
    catch (err)
    {
        return res.status(500).json({ message: "You are not Authorized" });
    }
   
}
