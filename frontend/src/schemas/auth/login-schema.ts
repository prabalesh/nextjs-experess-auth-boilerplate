import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .min(8, { message: "Password should be minimum of 8 characters" })
        .max(255, { message: "Password can be maximum of 255 characters" }),
});

export default loginSchema;
