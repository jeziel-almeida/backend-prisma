import { createUser } from "../repositories/user.repository";
import bcrypt from "bcrypt";

export const create = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        const user = await createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}