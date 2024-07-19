import Book from "../models/book.model.js";
import { errorHandler } from "../utils/error.js";

export const bookCar = async (req, res, next) => {
    try {
        const { postId, userId, startDate, endDate } = req.body;

        if (userId !== req.user.id) {
            return next(errorHandler(403, 'You can not book...'));
        }

        const newBook = new Book({
            postId,
            userId,
            startDate,
            endDate,
        });
        await newBook.save();

        res.status(200).json(newBook);

    } catch (error) {
        next(error);
    }
};

export const getCarBookings = async (req, res, next) => {
    try {
        const bookings = await Book.find({ postId: req.params.postId }).sort({
            createdAt: -1,
        });
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};