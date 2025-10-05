
import { prisma } from "../../config/db"
import { CreatePostPayload, CreateUserPayload, UpdatePostPayload } from "../../utils/type.user"
import bcrypt from "bcryptjs";

const getAllposts = async () => {
    const posts = await prisma.post.findMany()
    return posts

}
// const createPost = async (payload: CreatePostPayload) => {
//     const user = await prisma.post.create({
//         data: payload

//     })
//     return user

// }
const createPost = async (payload: CreatePostPayload) => {
    try {
        // 1. Validate required fields
        if (!payload.title || !payload.slug || !payload.category || !payload.authorId) {
            return {
                success: false,
                message: "Missing required fields: title, slug, category, or authorId"
            }
        }

        // 2. Check if slug already exists
        const existingPost = await prisma.post.findUnique({
            where: { slug: payload.slug }
        })

        if (existingPost) {
            return {
                success: false,
                message: "A post with this slug already exists"
            }
        }

        // 3. Validate author exists
        const author = await prisma.user.findUnique({
            where: { id: payload.authorId }
        })

        if (!author) {
            return {
                success: false,
                message: "Author does not exist"
            }
        }

        // 4. Create the post
        const post = await prisma.post.create({
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
        })

        return {
            success: true,
            data: post,
            message: "Post created successfully"
        }

    } catch (error: any) {
        console.error("Error creating post:", error)

        // Handle Prisma unique constraint errors
        if (error.code === 'P2002') {
            return {
                success: false,
                message: "A post with this slug already exists"
            }
        }

        return {
            success: false,
            message: "Failed to create post"
        }
    }
}
const deletePost = async (blogId: number) => {
    try {
        // 1. Validate blogId
        if (!blogId || blogId <= 0) {
            return {
                success: false,
                message: "Invalid post ID"
            }
        }

        // 2. Check if post exists
        const existingPost = await prisma.post.findUnique({
            where: { id: blogId }
        })

        if (!existingPost) {
            return {
                success: false,
                message: "Post not found"
            }
        }

        // 3. Delete the post
        await prisma.post.delete({
            where: { id: blogId }
        })

        return {
            success: true,
            message: "Post deleted successfully"
        }

    } catch (error: any) {
        console.error("Error deleting post:", error)

        // Handle Prisma errors
        if (error.code === 'P2025') {
            return {
                success: false,
                message: "Post not found"
            }
        }

        return {
            success: false,
            message: "Failed to delete post"
        }
    }
}
const updatePost = async (blogId: number, payload: UpdatePostPayload) => {
    try {
        // 1. Validate blogId
        if (!blogId || blogId <= 0) {
            return {
                success: false,
                message: "Invalid post ID"
            }
        }

        // 2. Check if post exists
        const existingPost = await prisma.post.findUnique({
            where: { id: blogId }
        })

        if (!existingPost) {
            return {
                success: false,
                message: "Post not found"
            }
        }

        // 3. If slug is being updated, check for duplicates
        if (payload.slug && payload.slug !== existingPost.slug) {
            const slugExists = await prisma.post.findUnique({
                where: { slug: payload.slug }
            })

            if (slugExists) {
                return {
                    success: false,
                    message: "A post with this slug already exists"
                }
            }
        }

        // 4. Update the post
        const updatedPost = await prisma.post.update({
            where: { id: blogId },
            data: {
                ...payload,
                date: payload.date ? new Date(payload.date) : undefined,
                updatedAt: new Date() // Ensure updatedAt is set
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
        })

        return {
            success: true,
            data: updatedPost,
            message: "Post updated successfully"
        }

    } catch (error: any) {
        console.error("Error updating post:", error)

        // Handle Prisma errors
        if (error.code === 'P2025') {
            return {
                success: false,
                message: "Post not found"
            }
        }

        if (error.code === 'P2002') {
            return {
                success: false,
                message: "A post with this slug already exists"
            }
        }

        return {
            success: false,
            message: "Failed to update post"
        }
    }
}
const getASinglePost = async (blogId: number) => {
    try {
        // 1. Validate blogId
        if (!blogId || blogId <= 0) {
            return {
                success: false,
                message: "Invalid post ID"
            }
        }

        // 2. Fetch the post with author details
        const post = await prisma.post.findUnique({
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
        })

        // 3. Check if post exists
        if (!post) {
            return {
                success: false,
                message: "Post not found"
            }
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
        }

    } catch (error: any) {
        console.error("Error fetching post:", error)

        return {
            success: false,
            message: "Failed to fetch post"
        }
    }
}

export const postsService = {
    getAllposts,
    createPost,
    deletePost,
    updatePost,
    getASinglePost
}