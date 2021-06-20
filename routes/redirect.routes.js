const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        if (link) {
            link.clicks++
            await link.save()
            return res.redirect(link.externalUrl)
        }
        res.status(404).json({error:'error',message:'Link not found'})
    } catch (e) {
        res.status(500).json({message: 'Server error'})
    }
})

module.exports = router