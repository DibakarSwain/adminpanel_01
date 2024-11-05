const { z } = require("zod");

// create an object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 chars" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 chars" }),
  phone: z
    .string({ required_error: "Phoneno. is required" })
    .trim()
    .min(10, { message: "Phoneno. must be at least of 3 characters" })
    .max(20, { message: "Phoneno. must not be more than 255 chars" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at least of 3 characters" })
    .max(1024, { message: "Password must not be more than 255 chars" }),
});

module.exports = signupSchema;
