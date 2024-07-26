import { string, object } from "yup"

export const emailFormValidation = object().shape({
    name: string().required('IS REQUIRED'),
    email: string()
        .email('PLEASE ENTER A VALID')
        .test(
            'emailDomain',
            'PLEASE ENTER A VALID',
            (value) => value.includes('.')
        )
        .required('IS REQUIRED'),
    message: string().required('AN EMPTY $ CANNOT BE PROCESSED')
})