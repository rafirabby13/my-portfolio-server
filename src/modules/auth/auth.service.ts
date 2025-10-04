
import { User } from "@prisma/client";
import { prisma } from "../../config/db"
import { LoginUserPayload } from "../../utils/type.user"
import bcrypt from "bcryptjs";




const userLogin = async (payload: LoginUserPayload) => {
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (!user) {
        return { success: false, message: "User does not exist" };
    }

    if (!user.password) {
        return { success: false, message: "User has no password set" };
    }

    const isPasswordMatched = await bcrypt.compare(
        payload.password as string,
        user.password
    );
    console.log(payload.password,isPasswordMatched, user.password)
    if (!isPasswordMatched) {
        return { success: false, message: "Password not matched" };
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