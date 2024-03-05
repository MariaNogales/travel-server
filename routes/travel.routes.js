const mongoose = require("mongoose")
const router = require("express").Router()

const Travel = require("../models/Travel.model")
const Review = require("../models/Review.model")

router.post('/', (req, res, next) => {

    const { country, includesAccomodation, includesTransport, themes, itinerary, date, price } = req.body

    Travel
        .create(req.body)
        .then(newTravel => res.json(newTravel))
        .catch(err => res.status(500).json(err))
})

router.get('/', (req, res, next) => {

    Travel
        .find()
        .then(allTravels => res.json(allTravels))
        .catch(err => res.status(500).json(err))

})

router.get('/:travelId', (req, res, next) => {

    const { travelId } = req.params

    if (!mongoose.Types.ObjectId.isValid(travelId)) {
        res.status(400).json({ message: 'Specified travel id is not valid' })
        return
    }

    Travel
        .findById(travelId)
        .then(travel => res.json(travel))
        .catch(err => res.status(500).json(err))
})


router.get('/:travelId/reviews', (req, res, next) => {
    const { travelId } = req.params

    if (!mongoose.Types.ObjectId.isValid(travelId)) {
        res.status(400).json({ message: 'Specified travel id is not valid' })
        return;
    }

    Travel
        .findById(travelId)
        .populate("reviews")
        .then(travel => {
            if (!travel) {
                return res.status(404).json({ message: 'Travel not found' })
            }
            res.json(travel.reviews)
        })
        .catch(err => res.status(500).json(err))
})



router.put('/:travelId', (req, res, next) => {

    const { travelId } = req.params
    const { country, includesAccomodation, includesTransport, themes, itinerary, date, price } = req.body


    if (!mongoose.Types.ObjectId.isValid(travelId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Travel
        .findByIdAndUpdate(travelId, req.body, { new: true, runValidators: true })
        .then(updatedTravel => res.json(updatedTravel))
        .catch(err => res.status(500).json(err))
})



router.delete('/:travelId', (req, res, next) => {

    const { travelId } = req.params

    if (!mongoose.Types.ObjectId.isValid(travelId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Travel
        .findByIdAndDelete(travelId)
        .then(() => res.sendStatus(204))
        .catch(err => res.status(500).json(err))
})

module.exports = router

