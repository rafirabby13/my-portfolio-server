
import { User } from "@prisma/client";
import { prisma } from "../../config/db"
import { LoginUserPayload } from "../../utils/type.user"
import bcrypt from "bcryptjs";




const userLogin = async (payload: LoginUserPayload) => {
      if (!payload.email || !payload.password) {
        return { success: false, message: "Email and password are required" };
    }
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (!user) {
       return { success: false, message: "Invalid email or password" };
    }

    if (!user.password) {
        return { success: false, message: "Invalid email or password" };
    }

    const isPasswordMatched = await bcrypt.compare(
        payload.password as string,
        user.password
    );
    console.log(payload.password,isPasswordMatched, user.password)
    if (!isPasswordMatched) {
        return { success: false, message: "Invalid email or password" };
    }
   

    // Exclude password from returned object
    const { password, ...userWithoutPassword } = user;

    return {
        success: true,
        user: userWithoutPassword
    };
};


export const authService = {

    userLogin
}