import express from 'express'
const router = express.Router()
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import Post from '../model/Post.js'

const jswpost = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const ceratePost = async (req, res) => {
    const { title, description, url, status } = req.body

    // Simple validation
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' })

    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })

        await newPost.save()

        res.json({ success: true, message: 'Happy learning!', post: newPost })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const updatePost = async (req, res) => {
    const { title, description, url, status } = req.body

    // Simple validation
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' })

    try {
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN'
        }

        const postUpdateCondition = { _id: req.params.id, user: req.userId }

        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            { new: true }
        )

        // User not authorised to update post or post not found
        if (!updatedPost)
            return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorised'
            })

        res.json({
            success: true,
            message: 'Excellent progress!',
            post: updatedPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const deletePost = async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

        // User not authorised or post not found
        if (!deletedPost)
            return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorised'
            })

        res.json({ success: true, post: deletedPost })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export { jswpost, ceratePost, updatePost, deletePost }