import { createUser, deleteUser, getAll, getById, updateUser } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { userValidation } from "../validations/user.validation";

export const create = async (req, res) => {
    try {

        await userValidation.validate(req.body);

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        const user = await createUser(req.body);
        res.status(201).send(user);
    } catch (error) {

        if(error.name && error.name === 'ValidationError') {
            const message = "Validation error on " + error.path + ". Error: " + error.errors[0];
            res.status(400).send(message);
        } else {
            res.status(400).send(error);
        }
    }
}

export const get = (req, res) => {

    getAll().then((users) => {
        res.status(200).send(users);

    }).catch((error) => {
        res.status(400).send(error);

    })
}

export const getId = (req, res) => {

    getById(Number(req.params.id)).then((user) => {
        res.status(200).send(user);

    }).catch((error) => {
        res.status(400).send(error);
        
    })

}

export const update = (req, res) => {

    updateUser(Number(req.params.id), req.body).then((user) => {
        res.status(200).send(user);

    }).catch((error) => {
        res.status(400).send(error);

    })
}

export const remove = (req, res) => {

    deleteUser(Number(req.params.id)).then(() => {
        res.status(200).send();

    }).catch((error) => {
        res.status(400).send(error);

    })
}