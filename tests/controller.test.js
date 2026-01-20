import { describe, test, expect, jest, beforeEach } from '@jest/globals';

jest.unstable_mockModule('../src/repositories/userRepository.js', () => ({
    VerifyEmailExists: jest.fn(),
    createUser: jest.fn(),
    findUserByEmail: jest.fn()
}));

jest.unstable_unmockModule('../src/services/userService.js', () => ({
    loginUser: jest.fn(),
    registerUser: jest.fn()
}));

// A importação de arquivos vem após o mock nos respectivos arquivos
const { VerifyEmailExists, createUser, findUserByEmail } = await import("../src/repositories/userRepository.js");
const { registerUser, loginUser } = await import("../src/services/userService.js");

// Função que será testada
const { signIn, signUp } = await import("../src/controllers/userController.js");

describe('User Controller signIn', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('Deve retornar status 400 quando o email já existe ao registrar', async () => {
        VerifyEmailExists.mockResolvedValue('teste@gmail.com'); // Diz ao mock o que será retornado
        const req = {
            body: {
                name: 'Teste',
                email: 'teste@gmail.com',
                password: '12345678'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await signUp(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Email existente' });
    });

    test('Deve retornar status 201 ao fazer o registro com sucesso', async () => {
        VerifyEmailExists.mockResolvedValue(null);
        createUser.mockResolvedValue({
            id: '1',
            name: 'Fabio',
            email: 'fabio@gmail.com',
            password: '$2a$10$6OX/EUwCxD/OV2RPLi9g.eTiXJgU8zf/6avWU5YkpDGoBt8do8s3y'
        });
        const req = {
            body: {
                name: 'Fabio',
                email: 'fabio@gmail.com',
                password: '12345678'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await signUp(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Usuário registrado com sucesso' });
    });

    
});

describe('User Controller signUp', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('Deve retornar status 401 ao tentar logar com um email inexistente', async () => {
        findUserByEmail.mockResolvedValue(null);
        const req = {
            body: {
                email: 'inexistente@gmail.com',
                password: '12345678'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await signIn(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Email ou senha incorretos' });
    });

    test('Deve retornar status 401 ao tentar logar com senha incorreta', async () => {
        findUserByEmail.mockResolvedValue({
            id: '3',
            name: 'Ana',
            email: 'ana@gmail.com',
            password: '$2a$10$6OX/EUwCxD/OV2RPLi9g.eTiXJgU8zf/6avWU5YkpDGoBt8do8s3y'
        });

        const req = {
            body: {
                email: 'ana@gmail.com',
                password: '123456789'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await signIn(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Email ou senha incorretos' });
    });

    test('Deve retornar status 200 ao fazer login com sucesso', async () => {
        findUserByEmail.mockResolvedValue({
            id: '3',
            name: 'Ana',
            email: 'ana@gmail.com',
            password: '$2a$10$6OX/EUwCxD/OV2RPLi9g.eTiXJgU8zf/6avWU5YkpDGoBt8do8s3y'
        });

        const req = {
            body: {
                email: 'ana@gmail.com',
                password: '12345678'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await signIn(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Login bem-sucedido' });
    })
})