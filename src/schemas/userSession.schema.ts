import { object, string, ref } from "yup";

export const createUserSessionSchema = object({
    body: object({
        email: string().required("Email is required").email("Email is invalid"),
    })
});