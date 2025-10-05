import { prisma } from "../../config/db"
import bcrypt from "bcryptjs"
export async function seedSuperAdmin() {
    // ⚠️ Change this after first login
    const email = process.env.ADMIN_EMAIL as string
    const password = process.env.ADMIN_PASSWORD as string
    console.log(email, password)
    const name = "Super Admin"
    const phone = "01750296501"

    try {
        // Check if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email },
        })

        if (existingAdmin) {
            console.log("✅ Super admin already exists:", existingAdmin.email)
            return existingAdmin
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password as string, 10)

        // Create super admin
        const admin = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                role: "ADMIN", // ✅ role-based access
            },
        })

        console.log("🎉 Super admin created successfully:")
        console.log(`   Email: ${email}`)
        console.log(`   Password: ${password}`)
        return admin
    } catch (error) {
        console.error("❌ Error creating super admin:", error)
    }
}