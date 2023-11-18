import bcrypt from "bcrypt";

export const encryptPassword = async (req, res, next) => {

    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        next();
        
    } catch (error) {
        res.status(400).send("Erro ao criptografar a senha");
        
    }
    
}