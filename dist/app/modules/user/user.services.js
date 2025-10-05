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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllusers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
            image: true,
        }
    });
    return users;
});
const getASingleUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        where: {
            email
        }
    });
    return user;
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validate required fields
        if (!payload.email || !payload.name || !payload.password) {
            return {
                success: false,
                message: "Email, name, and password are required"
            };
        }
        // 2. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload.email)) {
            return {
                success: false,
                message: "Invalid email format"
            };
        }
        // 3. Validate password strength
        if (payload.password.length < 6) {
            return {
                success: false,
                message: "Password must be at least 6 characters long"
            };
        }
        // 4. Normalize email
        const normalizedEmail = payload.email.trim().toLowerCase();
        // 5. Check if user already exists
        const existingUser = yield db_1.prisma.user.findUnique({
            where: { email: normalizedEmail }
        });
        if (existingUser) {
            return {
                success: false,
                message: "User with this email already exists"
            };
        }
        // 6. Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(payload.password, Number(process.env.PASS_SALT) || 10);
        // 7. Create user
        const user = yield db_1.prisma.user.create({
            data: {
                email: normalizedEmail,
                name: payload.name.trim(),
                image: payload.image,
                phone: payload.phone,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                status: true,
                image: true,
                isVerified: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return {
            success: true,
            data: user,
            message: "User created successfully"
        };
    }
    catch (error) {
        console.error("Error creating user:", error);
        // Handle Prisma unique constraint error
        if (error.code === 'P2002') {
            return {
                success: false,
                message: "User with this email already exists"
            };
        }
        return {
            success: false,
            message: "Failed to create user"
        };
    }
});
exports.userService = {
    getAllusers,
    createUser,
    getASingleUser
};
