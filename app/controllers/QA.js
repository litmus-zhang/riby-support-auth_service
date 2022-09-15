const QA = require('../models/QA');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
exports.Register = async (req, res) =>
{

    const QA_MODEL = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    
    try
    {
        const user = await QA.findOne({ where: { email: req.body.email } });
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
        const user = await QA.findOne({ where: { email: QA_MODEL.email } });
        if (!user)
        {
           return res.status(401).json({ message: "QA does not exist" });
        }
        const isEqual = await bcrypt.compare(QA_MODEL.password, user.password);
        if (!isEqual)
        {
            return res.status(401).json({message: "Password is incorrect"});
        }
        //Generate token
        // const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // return res.status(200).json(user);
        return res.status(200).json({ message: "QA logged in successfully" });
         
    } catch (error)
    {
        
        return res.status(500).json({ message: "You are not Authorized" });
    }
}

exports.ResetPassword = async (req, res) =>
{
    try {
        const user = await QA.findOne({ where: { email: req.body.email } });
        if (!user)
        {
            return res.status(401).json({message: "There is no QA with this email"});
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // const msg = {
        //     to: user.email,
        //     from: '',
        //     subject: 'Reset Password',
        //     text: 'Reset Password',
        //     html: ``,
        // };
        // sgMail.send(msg);
        return res.status(200).json({ message: "Reset password link sent to your email" });

    } catch (error) {
        return res.status(500).json({ message: "You are not Authorized" });
    }
}
exports.UpdatePassword = async (req, res) =>
{
    const user = await QA.findOne({ where: { email: req.body.email } });
    if (!user)
    {
        return res.status(401).json({message: "There is no QA with this email"});
    }
    const isEqual = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isEqual)
    {
        throw new Error("Old password is incorrect");
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
}
