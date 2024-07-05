import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        carname: {
            type: String,
            required: true,
            unique: false,
        },
        carcompany: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            default: 'https://www.shutterstock.com/image-vector/car-icon-vector-on-black-600w-1233810298.jpg',
        },
        fuel: {
            type: String,
            default: 'uncategorized',
        },
        seats: {
            type: String,
            default: 'uncategorized',
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    }, { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;