
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"
import Room from "../models/Room.js"

export const createHotel = async (req, res, next) => {
    try {
        const saveHotel = Hotel.create(req.body)
        res.status(200).json(saveHotel)
    } catch (error) {
        next(createError(error))
    }

    // const newHotel = new Hotel(req.body)

    // try {
    //     const savedHotel = await newHotel.save()
    //     res.status(200).json(savedHotel)
    // } catch (error) {
    //     res.status(500).json(err)
    // }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(createError(error))
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(createError(error))
    }
}

// export const getHotels = async (req, res, next) => {
//     try {
//         const hotels = await Hotel.find(req.query).limit(req.query.limit)
//         res.status(200).json(hotels)
//     } catch (error) {
//         next(error)
//     }
// }

export const getHotels = async (req, res, next) => {

    try {
        const { min, max, limit, ...filterQuery } = req.query;
        const hotels = await Hotel.find({...filterQuery, cheapestPrice : {$gt : min || 100, $lt : max || 10000}}).limit(parseInt(limit) || 10);
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted Successfully")
    } catch (error) {
        next(createError(error))
    }
}

export const countBycity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            // return Hotel.find({city : city}).length doesn't works
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const countByType = async (req, res, next) => {


    try {
        const HotelCount = await Hotel.countDocuments({ type: "Hotel" })
        const VillaCount = await Hotel.countDocuments({ type: "Villa" })
        const ResortCount = await Hotel.countDocuments({ type: "Resort" })
        const ApartmentCount = await Hotel.countDocuments({ type: "Apartment" })

        res.status(200).json([
            { type: "Hotel", count: HotelCount },
            { type: "Villa", count: VillaCount },
            { type: "Resort", count: ResortCount },
            { type: "Apartment", count: ApartmentCount },
        ])

    } catch (error) {
        next(error)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }))

        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}