import { createUser } from "../repositories/user.repository";

export const create = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}