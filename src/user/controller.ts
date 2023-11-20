import { Request, Response } from "express";
import { UserRepository } from "./repository";
import { UserBD } from "./types/user.interface";

export class UserController {

    #userRepository;

    constructor(userRepository?: UserRepository) {
        this.#userRepository = userRepository || new UserRepository();
    }

    create(req: Request, res: Response) {

        return this.#userRepository.createUser(req.body).then((user: UserBD) => {
            res.status(201).send(user);

        }).catch((error: any) => {
            res.status(400).send(error);

        })
    }

    get(req: Request, res: Response) {
    
        return this.#userRepository.getAll().then((users: UserBD[]) => {
            res.status(200).send(users);
    
        }).catch((error: any) => {
            res.status(400).send(error);
    
        })
    }

    getId(req: Request, res: Response) {
    
        return this.#userRepository.getById(Number(req.params.id)).then((user: UserBD | null) => {
            res.status(200).send(user);
    
        }).catch((error: any) => {
            res.status(400).send(error);
            
        })
    
    }

    update(req: Request, res: Response) {
    
        return this.#userRepository.updateUser(Number(req.params.id), req.body).then((user: UserBD) => {
            res.status(200).send(user);
    
        }).catch((error: any) => {
            res.status(400).send(error);
    
        })
    }

    remove(req: Request, res: Response) {
    
        return this.#userRepository.deleteUser(Number(req.params.id)).then(() => {
            res.status(200).send();
    
        }).catch((error: any) => {
            res.status(400).send(error);
    
        })
    }
}