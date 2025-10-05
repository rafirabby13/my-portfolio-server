"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsController = void 0;
const posts_services_1 = require("./posts.services");
const getAllposts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield posts_services_1.postsService.getAllposts();
        res.status(200).send({ posts });
    }
    catch (error) {
        res.send({ message: error });
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("data.........", req.body);
        const result = yield posts_services_1.postsService.createPost(req.body);
        // Check if the service returned a success flag
        if (result.success) {
            res.status(201).json({
                message: result.message || "Post created successfully",
                success: true,
                data: result.data
            });
        }
        else {
            res.status(400).json({
                message: result.message || "Failed to create post",
                success: false
            });
        }
    }
    catch (error) {
        console.error("Error in createPost controller:", error);
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = Number(req.params.id);
        if (isNaN(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }
        const result = yield posts_services_1.postsService.deletePost(blogId);
        if (result.success) {
            res.status(200).json({
                message: result.message || "Post deleted successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                message: result.message || "Post not found",
                success: false
            });
        }
    }
    catch (error) {
        console.error("Error in deletePost controller:", error);
        res.status(500).json({
            message: error.message || "Failed to delete post",
            success: false
        });
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = Number(req.params.id);
        if (isNaN(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }
        const payload = req.body;
        const result = yield posts_services_1.postsService.updatePost(blogId, payload);
        if (result.success) {
            res.status(200).json({
                message: result.message || "Post updated successfully",
                success: true,
                data: result.data
            });
        }
        else {
            res.status(404).json({
                message: result.message || "Post not found",
                success: false
            });
        }
    }
    catch (error) {
        console.error("Error in updatePost controller:", error);
        res.status(500).json({
            message: error.message || "Failed to update post",
            success: false
        });
    }
});
const getASinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = Number(req.params.id);
        if (isNaN(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }
        const result = yield posts_services_1.postsService.getASinglePost(blogId);
        if (result.success) {
            res.status(200).json({
                success: true,
                data: result.data
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: result.message
            });
        }
    }
    catch (error) {
        console.error("Error in getASinglePost controller:", error);
        res.status(500).json({
            message: "Failed to fetch post",
            success: false
        });
    }
});
exports.postsController = {
    getAllposts,
    createPost,
    deletePost,
    updatePost,
    getASinglePost
};
