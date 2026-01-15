import { findUserByEmail, VerifyEmailExists, createUser } from "../repositories/userRepository.js";
import bcrypt from "bcryptjs";

export const registerUser = async (name, email, password) => {
    const emailExists = await VerifyEmailExists(email);
    if (emailExists) {
        throw new Error('Email existente');
    }

    const passwordHash = bcrypt.hashSync(password);

    return await createUser(name, email, passwordHash);
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('Email ou senha incorretos');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Email ou senha incorretos');
    }

    return user;
}