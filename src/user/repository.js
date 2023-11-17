import { prisma } from './services/prisma.js';

export class UserRepository {

    async createUser(data) {
        const user = await prisma.user.create({
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
        return user
    }
    
    async getAll() {
        const users = await prisma.user.findMany({
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
    
    async getById(id) {
        const user = await prisma.user.findUnique({
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
    
    async updateUser(id, data) {
        const user = await prisma.user.update({
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
    
    async deleteUser(id) {
    
        await prisma.user.delete({
            where: {
                id,
            }
        });
        return;
    }
}


