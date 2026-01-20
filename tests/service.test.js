import { describe, test, expect, jest, beforeEach } from '@jest/globals'; // Importa as funções do Jest, usando ESM é necessário importar explicitamente
// Além disso é necessário importar o jest para usar mocks

// Mocks, serve para simular o comportamento dos repositórios e do bcrypt, sem usar dados reais
// mocks devem ser declarados antes dos imports que serão testados. Este código está comentado porque a sintaxe de mock para ESM é diferente
// CommonJs (dinâmico e síncrono):
// jest.mock('../src/repositories/userRepository.js', () => ({
//     VerifyEmailExists: jest.fn(),
//     createUser: jest.fn(),
//     findUserByEmail: jest.fn()
// }));

// unstable_mockModule para ESM || é um mock para módulos ES6. O unstable_mockModule cria um mock antes da importação do módulo real, sendo necessário 
// por que normalmente os imports são feitos no topo do arquivo, assim executando eles primeiro fazendo com que o mock falhe. Então o unstable_mockModule 
// permite criar o mock antes da importação do módulo real, já que imports são estáticos e resolvido antes de qualquer código rodar.
// Apenas utilize mocks em depêndencias que deseja simular, mas nunca no módulo que está sendo testado. Neste caso, o userService.js não deve ser mockado,
// o userService.js só deve ser mockado em outros testes que ele é uma depêndencia como testes no controller.
jest.unstable_mockModule('../src/repositories/userRepository.js', () => ({
    VerifyEmailExists: jest.fn(),
    createUser: jest.fn(),
    findUserByEmail: jest.fn()
}));

// A importação de arquivos vem após o mock nos respectivos arquivos
const { VerifyEmailExists, createUser, findUserByEmail } = await import("../src/repositories/userRepository.js");

// Importa a função que será testada (Não deve ser mockada)
const { registerUser, loginUser } = await import("../src/services/userService.js");

// Cria variáveis para os mocks, 
// const VerifyEmailExists_ = jest.mocked(VerifyEmailExists);
// const createUser_ = jest.mocked(createUser);

describe('User Service Register', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('Deve retornar erro quando o email já existe', async () => {
        VerifyEmailExists.mockResolvedValue('teste@gmail.com'); // Diz ao mock o que será retornado

        await expect(
            registerUser('Teste', 'teste@gmail.com', '12345678') // A função que será testada não deve ser mockada
        ).rejects.toThrow('Email existente');

        expect(VerifyEmailExists).toHaveBeenCalledWith('teste@gmail.com');
        expect(createUser).not.toHaveBeenCalled();
    });

    test('Deve registrar um novo usuário com senha hasheada', async () => {
        VerifyEmailExists.mockResolvedValue(null); // Simula que o email não existe
        createUser.mockResolvedValue({
            id: '2',
            name: 'Ana',
            email: 'ana@gmail.com',
            password: '$2a$10$6OX/EUwCxD/OV2RPLi9g.eTiXJgU8zf/6avWU5YkpDGoBt8do8s3y'
        });

        const result = await registerUser('Ana', 'ana@gmail.com', '12345678');
        expect(createUser).toHaveBeenCalledWith('Ana', 'ana@gmail.com', expect.not.stringContaining('12345678')); // Verifica se a senha foi hasheada
        expect(result).toEqual({
            id: '2',
            name: 'Ana',
            email: 'ana@gmail.com',
            password: '$2a$10$6OX/EUwCxD/OV2RPLi9g.eTiXJgU8zf/6avWU5YkpDGoBt8do8s3y'
        });
    });
});

describe('User Service Login', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('Deve retornar erro ao tentar logar com senha incorreta', async () => {
        findUserByEmail.mockResolvedValue({
            id: '3',
            name: 'Carlos',
            email: 'carlos@gmail.com',
            password: '$2a$10$6OX/EUwCxD/OV2RPLi9g.eTiXJgU8zf/6avWU5YkpDGoBt8do8s3y'
        });
        await expect(
            loginUser('carlos@gmail.com', '123456789')
        ).rejects.toThrow('Email ou senha incorretos');
    });

    test('Deve retornar erro ao tentar logar com email inexistente', async () => {
        findUserByEmail.mockResolvedValue(null);
        await expect(
            loginUser('bruno@gmail.com', '12345678')
        ).rejects.toThrow('Email ou senha incorretos');
    });

    test('Deve logar com sucesso com email e senha corretos', async () => {
        findUserByEmail.mockResolvedValue({
            id: '4',
            name: 'Pedro',
            email: 'pedro@gmail.com',
            password: '$2a$10$6OX/EUwCxD/OV2RPLi9g.eTiXJgU8zf/6avWU5YkpDGoBt8do8s3y' // Hash da senha '12345678'
        })

        const result = await loginUser('pedro@gmail.com', '12345678');
        expect(result).toEqual({
            id: '4',
            name: 'Pedro',
            email: 'pedro@gmail.com',
            password: '$2a$10$6OX/EUwCxD/OV2RPLi9g.eTiXJgU8zf/6avWU5YkpDGoBt8do8s3y'
        });
    })
})