const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Error email').isEmail(),
        check('password', 'Error password').isLength({min: 6, max: 50})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(421).json({
                    errors: errors.array(),
                    message: 'Errors validate'
                });
            }
            const {email, password} = req.body;
            const candidate = await User.findOne({email});

            if (candidate) {
                return res.status(400).json({message: 'User is added'});
            }
            const hashPassword = await bcrypt.hash(password, 'cbmch');
            const user = new User({email, password: hashPassword});
            await user.save();
            return res.status(201).json({success:'success',message: 'User is created'});
        } catch (e) {
            res.status(500).json({message: 'Error server'});
        }
    });

router.post(
    '/login',
    [
        check('email', 'Error email').normalizeEmail().isEmail(),
        check('password', 'Error password').isLength({min: 6, max: 50})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(421).json({
                    errors: errors.array(),
                    message: 'Errors validate'
                });
            }
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: 'User not found'});//Email or Password not found
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Email or Password not found'});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );
            return res.json({success:'success',token, userId: user.id, message: 'Good work'});
        } catch (e) {
            res.status(500).json({message: 'Error server'});
        }
    });
module.exports = router;
