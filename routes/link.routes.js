const {Router} = require('express');
const Link = require('../models/Link');
const shortId = require('shortid')
const config = require('config');
const authMiddleware = require('../middleware/auth.middleware')
const router = Router();

router.post(
    '/generate',
    authMiddleware,
    async (req, res) => {
        try {
            const baseUrl = config.get('baseUrl');
            const {externalUrl, user} = req.body;
            const existing = await Link.findOne({externalUrl})

            if (existing) {
                return res.json({success: 'success', link: existing})
            }

            const code = shortId.generate();
            const shortUrl = baseUrl + '/t/' + code;
            const link = new Link({
                externalUrl, shortUrl, code, owner: user.userId
            })
            await link.save();
            return res.status(201).json({success: 'success', link, message: 'link create'});
        } catch (e) {
            return res.status(500).json({message: 'Error server'});
        }
    });
router.get(
    '/',
    authMiddleware,
    async (req, res) => {
        try {
            const links = await Link.find({owner: req.body.user.userId})
            return res.json({success: 'success', links: links})
        } catch (e) {
            res.status(500).json({message: 'Error server'});
        }
    });
router.get(
    '/:id',
    authMiddleware,
    async (req, res) => {
        try {
            const link = await Link.findById(req.params.id);
            if(req.body.user.userId != link.owner){
                return res.status(401).json({error: 'error', message:'Unauthorized'})
            }
            return res.json({success: 'success', link: link})
        } catch (e) {
            res.status(500).json({message: 'Error server'});
        }
    });
module.exports = router;