import User from "../models/User.js";

export const createUser = async (name, email, password) => {
    const user = new User({
        name,
        email,
        password
    });

    return await user.save();
}

export const findUserByEmail = async (email) => {
    return await User.findOne({ email })
        .select('email name password')
        .lean();
}

export const VerifyEmailExists = async (email) => {
    return await User.findOne({ email })
        .select('email')
        .lean();
    ;
}