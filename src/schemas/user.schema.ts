import { object, string, ref } from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required."),
        password: string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must only contain UTF-8 characters and must at least contain one number, one uppercase and one lowercase letter and one special character."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "Passwords must match."
        ),
        email: string().required("Email is required.").email("Email must be valid."),
    })
})