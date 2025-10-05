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
exports.seedSuperAdmin = seedSuperAdmin;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function seedSuperAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        // ⚠️ Change this after first login
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const name = "Super Admin";
        const phone = "01750296501";
        try {
            // Check if admin already exists
            const existingAdmin = yield db_1.prisma.user.findUnique({
                where: { email },
            });
            if (existingAdmin) {
                console.log("✅ Super admin already exists:", existingAdmin.email);
                return existingAdmin;
            }
            // Hash password
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            // Create super admin
            const admin = yield db_1.prisma.user.create({
                data: {
                    name,
                    email,
                    phone,
                    password: hashedPassword,
                    role: "ADMIN", // ✅ role-based access
                },
            });
            console.log("🎉 Super admin created successfully:");
            console.log(`   Email: ${email}`);
            console.log(`   Password: ${password}`);
            return admin;
        }
        catch (error) {
            console.error("❌ Error creating super admin:", error);
        }
    });
}
