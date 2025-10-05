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
exports.postsService = void 0;
const db_1 = require("../../config/db");
const getAllposts = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield db_1.prisma.post.findMany();
    return posts;
});
// const createPost = async (payload: CreatePostPayload) => {
//     const user = await prisma.post.create({
//         data: payload
//     })
//     return user
// }
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validate required fields
        if (!payload.title || !payload.slug || !payload.category || !payload.authorId) {
            return {
                success: false,
                message: "Missing required fields: title, slug, category, or authorId"
            };
        }
        // 2. Check if slug already exists
        const existingPost = yield db_1.prisma.post.findUnique({
            where: { slug: payload.slug }
        });
        if (existingPost) {
            return {
                success: false,
                message: "A post with this slug already exists"
            };
        }
        // 3. Validate author exists
        const author = yield db_1.prisma.user.findUnique({
            where: { id: payload.authorId }
        });
        if (!author) {
            return {
                success: false,
                message: "Author does not exist"
            };
        }
        // 4. Create the post
        const post = yield db_1.prisma.post.create({
            data: {
                title: payload.title,
                description: payload.description,
                date: new Date(payload.date),
                readTime: payload.readTime,
                category: payload.category,
                tags: payload.tags,
                image: payload.image,
                slug: payload.slug,
                authorId: payload.authorId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        return {
            success: true,
            data: post,
            message: "Post created successfully"
        };
    }
    catch (error) {
        console.error("Error creating post:", error);
        // Handle Prisma unique constraint errors
        if (error.code === 'P2002') {
            return {
                success: false,
                message: "A post with this slug already exists"
            };
        }
        return {
            success: false,
            message: "Failed to create post"
        };
    }
});
const deletePost = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validate blogId
        if (!blogId || blogId <= 0) {
            return {
                success: false,
                message: "Invalid post ID"
            };
        }
        // 2. Check if post exists
        const existingPost = yield db_1.prisma.post.findUnique({
            where: { id: blogId }
        });
        if (!existingPost) {
            return {
                success: false,
                message: "Post not found"
            };
        }
        // 3. Delete the post
        yield db_1.prisma.post.delete({
            where: { id: blogId }
        });
        return {
            success: true,
            message: "Post deleted successfully"
        };
    }
    catch (error) {
        console.error("Error deleting post:", error);
        // Handle Prisma errors
        if (error.code === 'P2025') {
            return {
                success: false,
                message: "Post not found"
            };
        }
        return {
            success: false,
            message: "Failed to delete post"
        };
    }
});
const updatePost = (blogId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validate blogId
        if (!blogId || blogId <= 0) {
            return {
                success: false,
                message: "Invalid post ID"
            };
        }
        // 2. Check if post exists
        const existingPost = yield db_1.prisma.post.findUnique({
            where: { id: blogId }
        });
        if (!existingPost) {
            return {
                success: false,
                message: "Post not found"
            };
        }
        // 3. If slug is being updated, check for duplicates
        if (payload.slug && payload.slug !== existingPost.slug) {
            const slugExists = yield db_1.prisma.post.findUnique({
                where: { slug: payload.slug }
            });
            if (slugExists) {
                return {
                    success: false,
                    message: "A post with this slug already exists"
                };
            }
        }
        // 4. Update the post
        const updatedPost = yield db_1.prisma.post.update({
            where: { id: blogId },
            data: Object.assign(Object.assign({}, payload), { date: payload.date ? new Date(payload.date) : undefined, updatedAt: new Date() // Ensure updatedAt is set
             }),
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        return {
            success: true,
            data: updatedPost,
            message: "Post updated successfully"
        };
    }
    catch (error) {
        console.error("Error updating post:", error);
        // Handle Prisma errors
        if (error.code === 'P2025') {
            return {
                success: false,
                message: "Post not found"
            };
        }
        if (error.code === 'P2002') {
            return {
                success: false,
                message: "A post with this slug already exists"
            };
        }
        return {
            success: false,
            message: "Failed to update post"
        };
    }
});
const getASinglePost = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validate blogId
        if (!blogId || blogId <= 0) {
            return {
                success: false,
                message: "Invalid post ID"
            };
        }
        // 2. Fetch the post with author details
        const post = yield db_1.prisma.post.findUnique({
            where: { id: blogId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                        // Don't include password
                    }
                }
            }
        });
        // 3. Check if post exists
        if (!post) {
            return {
                success: false,
                message: "Post not found"
            };
        }
        // 4. Optional: Check if post is published (for public endpoints)
        // if (!post.published) {
        //     return { 
        //         success: false, 
        //         message: "Post not found" 
        //     }
        // }
        return {
            success: true,
            data: post
        };
    }
    catch (error) {
        console.error("Error fetching post:", error);
        return {
            success: false,
            message: "Failed to fetch post"
        };
    }
});
exports.postsService = {
    getAllposts,
    createPost,
    deletePost,
    updatePost,
    getASinglePost
};
