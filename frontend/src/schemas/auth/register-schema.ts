import { z } from "zod";

const registerSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name should be minimum of 2 characters" })
        .max(255, { message: "Name can be maximum of 255 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .min(8, { message: "Password should be minimum of 8 characters" })
        .max(255, { message: "Password can be maximum of 255 characters" }),
});

export default registerSchema;
