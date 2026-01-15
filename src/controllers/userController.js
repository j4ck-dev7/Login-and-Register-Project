import { registerUser, loginUser } from "../services/userService.js";

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await registerUser(name, email, password);
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        if(error.message === 'Email existente') {
            return res.status(409).json({ error: error.message });
        }

        res.status(500).json({ error: 'Erro ao registrar usuário' });
        console.log(error);
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        await loginUser(email, password);
        res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        if(error.message === 'Email ou senha incorretos') {
            return res.status(401).json({ error: error.message });
        }
        
        res.status(500).json({ error: 'Erro ao fazer login' });
        console.log(error);
    }
}