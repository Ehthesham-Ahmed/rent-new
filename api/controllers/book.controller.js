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

export const getbookings = async (req, res, next) => {
    if (!req.user.isAdmin)
        return next(errorHandler(403, 'You are not allowed to get all bookings'));
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;
        const bookings = await Book.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);
        const totalBookings = await Book.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthBookings = await Book.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({ bookings, totalBookings, lastMonthBookings });
    } catch (error) {
        next(error);
    }
};