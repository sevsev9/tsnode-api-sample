import {object, string, TypeOf} from 'zod';

export const creatUserSchema = object({
    body: object({
        email: string({ required_error: "Email is required" }).email("Email is invalid"),
        name: string({ required_error: "Email is required" }),
        password: string({ required_error: "Password is required"}).min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"),
        passwordConfirmation: string({ required_error: "Password confirmation is required" })
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    })
});


export type CreateUserInput = Omit<TypeOf<typeof creatUserSchema>, "body.passwordConfirmation">;