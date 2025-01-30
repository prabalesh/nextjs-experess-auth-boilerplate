import { z } from "zod";

import loginSchema from "@/schemas/auth/login-schema";
import registerSchema from "@/schemas/auth/register-schema";

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
