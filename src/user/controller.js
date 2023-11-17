import { UserRepository } from "./repository.js";
import { userValidation } from "./validations/validation.js";
import bcrypt from "bcrypt";

export class UserController {

    #userRepository;

    constructor(userRepository) {
        this.#userRepository = userRepository || new UserRepository();
    }

    async create(req, res) {
        try {
    
            await userValidation.validate(req.body);
    
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashPassword;

            return this.#userRepository.createUser(req.body).then((user) => {
                res.status(201).send(user);

            }).catch((error) => {
                res.status(400).send(error);

            })

        } catch (error) {
    
            if(error.name && error.name === 'ValidationError') {
                const message = "Validation error on " + error.path + ". Error: " + error.errors[0];
                res.status(400).send(message);
            } else {
                res.status(400).send(error);
            }
        }
    }

    get(req, res) {
    
        return this.#userRepository.getAll().then((users) => {
            res.status(200).send(users);
    
        }).catch((error) => {
            res.status(400).send(error);
    
        })
    }

    getId(req, res) {
    
        return this.#userRepository.getById(Number(req.params.id)).then((user) => {
            res.status(200).send(user);
    
        }).catch((error) => {
            res.status(400).send(error);
            
        })
    
    }

    update(req, res) {
    
        return this.#userRepository.updateUser(Number(req.params.id), req.body).then((user) => {
            res.status(200).send(user);
    
        }).catch((error) => {
            res.status(400).send(error);
    
        })
    }

    remove(req, res) {
    
        return this.#userRepository.deleteUser(Number(req.params.id)).then(() => {
            res.status(200).send();
    
        }).catch((error) => {
            res.status(400).send(error);
    
        })
    }
}