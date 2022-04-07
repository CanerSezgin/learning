import { Test } from "@nestjs/testing";
import { User } from "./users.entity";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";


describe('AuthService', () => {
    let service: AuthService
    let mockUsersService: Partial<UsersService>

    beforeEach(async () => {
        // Create a fake copy of the users service
        const users: User[] = []
        mockUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email)
                return Promise.resolve(filteredUsers)
            },
            create: (email: string, password: string) => {
                const user = { 
                    id: Math.floor(Math.random() * 999999),
                    email,
                    password
                } as User

                users.push(user)
                return Promise.resolve(user)
            }
                
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: mockUsersService
                }
            ]
        }).compile()

        service = module.get(AuthService)
    })

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined()
    })

    it('creates a new user with a salted and hashed password', async () => {
        const PASSWORD = 'PASSWORD'
        const user = await service.signup('asd@asd.com', PASSWORD)

        expect(user.password).not.toEqual(PASSWORD)
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('throws an error if user signs up with email that is use', async () => {
        await service.signup('asd@asd.com', 'pass1')
        await expect(service.signup('asd@asd.com', 'pass2')).rejects.toThrow(BadRequestException)
    })

    it('throws if signin is called with unused email', async () => {
        await expect(service.signin('asd@asd.com', 'pass')).rejects.toThrow(NotFoundException)
    })

    it('throws if an invalid password is provided', async () => {
        await service.signup('asd@asd.com', 'valid_pass')
        await expect(service.signin('asd@asd.com', 'invalid_pass')).rejects.toThrow(BadRequestException)
    })

    it('returns a user if correct password is provided', async () => {
        await service.signup('asd@asd.com', 'valid_pass')
        const user = await service.signin('asd@asd.com', 'valid_pass')
        expect(user).toBeDefined()
    })

})

