import * as yup from 'yup';

const userValidation = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required().min(6),
    phone: yup.string().nullable(true)
});

export const validateUser = async (req, res, next) => {

    try {

        await userValidation.validate(req.body);
        next();

    } catch (error) {
        const message = "Validation error on " + error.path + ". Error: " + error.errors[0];
        res.status(400).send(message);
    }
}