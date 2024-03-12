const router = require("express").Router()
const uploader = require('./../middleware/uploader.middleware')

router.post('/image', uploader.single('imageData'), (req, res) => {
    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error cargando el archivo' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})

router.put('/travels/:travelId/image', uploader.single('imageData'), (req, res) => {
    const { travelId } = req.params

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error cargando el archivo' })
        return;
    }

    res.json({ cloudinary_url: req.file.path })
});

module.exports = router
