import { prisma } from './services/prisma';
import { User, UserBD } from './types/user.interface';

export class UserRepository {

    async createUser(data: User) {
        const user: UserBD = await prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                phone: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return user;
    }
    
    async getAll() {
        const users: UserBD[] = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                phone: true,
                createdAt: true,
                updatedAt: true
            }
        })
        return users;
    }
    
    async getById(id: number) {
        const user: UserBD | null = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                phone: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return user;
    }
    
    async updateUser(id: number, data: Partial<User>) {
        const user: UserBD = await prisma.user.update({
            where: {
                id,
            },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                phone: true,
                createdAt: true,
                updatedAt: true
            }
        });
    
        return user;
    }
    
    async deleteUser(id: number) {
    
        await prisma.user.delete({
            where: {
                id,
            }
        });
        return;
    }
}


