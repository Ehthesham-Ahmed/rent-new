import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.carname || !req.body.carcompany || !req.body.price) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
    const slug = new Date().getTime() + '-' + req.body.carname
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }

};

export const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.carname && { carname: req.query.carname }),
            ...(req.query.seats && { seats: req.query.seats }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });

    } catch (error) {
        next(error);
    }
};