import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        bookings: {
            type: Array,
            default: [],
        },
        // totalPrice: {
        //     type: Number,
        //     default: 0,
        // },
    }, { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;