// Importação de depêndencias 
import joi from 'joi';

// Validação do login
export const signInValidate = (data) => {
    const schema = joi.object({
        name: joi.string().required().min(3).max(50),
        email: joi.string().required().min(13).max(50),
        password: joi.string().required().min(8).max(100),
    })

    return schema.validate(data)
}

// Validação do register
export const signUpValidate = (data) => {
    const schema = joi.object({
        name: joi.string().required().min(3).max(50),
        email: joi.string().required().min(13).max(50),
        password: joi.string().required().min(8).max(100),
    })

    return schema.validate(data)
}