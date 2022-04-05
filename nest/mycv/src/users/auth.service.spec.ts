import { Test } from "@nestjs/testing";
import { User } from "./users.entity";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { BadRequestException } from "@nestjs/common";


describe('AuthService', () => {
    let service: AuthService
    let mockUsersService: Partial<UsersService>

    beforeEach(async () => {
        // Create a fake copy of the users service
        mockUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) =>
                Promise.resolve({ id: 1, email, password } as User)
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
        mockUsersService.find = () => Promise.resolve([
            { id: 1, email: 'a', password: 'pass' } as User
        ])
        await expect(service.signup('asd@asd.com', 'pass')).rejects.toThrow(BadRequestException)
    })
})

