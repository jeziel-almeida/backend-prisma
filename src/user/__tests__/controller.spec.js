import { UserController } from "../controller.js";

describe("User Controller", () => {

    let request;
    let response;

    class ResponseMock {
        _send = null;
        _status = 0;
        send(value) {
            this._send = value;
        }
        status(value) {
            this._status = value;
            return this;
        }
    }

    const userMock = {
        name: "anyUserName",
        email: "valid@email.com",
        phone: "anyUserPhone",
        createdAt: "anyDateTime",
        updatedAt: "anyDateTime"
    }

    beforeEach(() => {
        request = {};
        response = new ResponseMock();
    });

    describe("given create user", () => {

        test("when success, then return user", async () => {

            const controller = new UserController({
                createUser: () => Promise.resolve(userMock)
            });

            request = { 
                body: { 
                    name: "anyUserName",
                    email: "valid@email.com",
                    password: "anyUserPassword",
                    phone: "anyUserPhone"
                } 
            }

            await controller.create(request, response);

            expect(response._send).toEqual(userMock);
        })

        test("when success, then return status 201", async () => {

            const controller = new UserController({
                createUser: () => Promise.resolve(userMock)
            });

            request = { 
                body: { 
                    name: "anyUserName",
                    email: "valid@email.com",
                    password: "anyUserPassword",
                    phone: "anyUserPhone"
                } 
            }

            await controller.create(request, response);

            expect(response._status).toEqual(201);
        })

        test("when fail, then return error", async () => {

            const controller = new UserController({
                createUser: () => Promise.reject({ message: "erro ao criar usuário" })
            });

            request = {
                body: { 
                    name: "anyUserName",
                    email: "valid@email.com",
                    password: "anyUserPassword",
                    phone: "anyUserPhone"
                } 
            }

            await controller.create(request, response);

            expect(response._send).toEqual({ message: "erro ao criar usuário" });
        })

        test("when fail, then return status 400", async () => {

            const controller = new UserController({
                createUser: () => Promise.reject({})
            });

            request = { 
                body: { 
                    name: "anyUserName",
                    email: "valid@email.com",
                    password: "anyUserPassword",
                    phone: "anyUserPhone"
                } 
            }

            await controller.create(request, response);

            expect(response._status).toEqual(400);
        })

        test("when request body is incorrect, then send error message", async () => {

            const controller = new UserController({
                createUser: () => Promise.resolve(userMock)
            });

            request = { 
                body: { 
                    name: null,
                    email: "valid@email.com",
                    password: "anyUserPassword",
                    phone: "anyUserPhone"
                }
            }

            const errorValidationNameMessage = "Validation error on name. Error: name is a required field";

            await controller.create(request, response);

            expect(response._send).toEqual(errorValidationNameMessage);
        })

        test("the password must be hashed", async () => {

            const controller = new UserController({
                createUser: () => Promise.resolve(userMock)
            });

            request = { 
                body: { 
                    name: "anyUserName",
                    email: "valid@email.com",
                    password: "anyUserPassword",
                    phone: "anyUserPhone"
                } 
            }

            await controller.create(request, response);

            expect(request.body.password).not.toEqual("anyUserPassword");
        })
    })

    describe("given get all users", () => {

        const usersMock = [
            {
                name: "anyUserName",
                email: "valid@email.com",
                password: "anyUserPassword",
                phone: "anyUserPhone"
            },
            {
                name: "anyOtherUserName",
                email: "otherValid@email.com",
                password: "anyOtherUserPassword",
                phone: "anyOtherUserPhone"
            }
        ]

        test("when success, then return users", async () => {

            const controller = new UserController({
                getAll: () => Promise.resolve(usersMock)
            });

            await controller.get(request, response);

            expect(response._send).toEqual(usersMock);
        })

        test("when success, then return status 200", async () => {

            const controller = new UserController({
                getAll: () => Promise.resolve(usersMock)
            });

            await controller.get(request, response);

            expect(response._status).toEqual(200);
        })

        test("when fail, then return error message", async () => {

            const controller = new UserController({
                getAll: () => Promise.reject({ message: "erro ao buscar usuários "})
            });

            await controller.get(request, response);

            expect(response._send).toEqual({ message: "erro ao buscar usuários "});
        })

        test("when fail, then return status 400", async () => {

            const controller = new UserController({
                getAll: () => Promise.reject({})
            });

            await controller.get(request, response);

            expect(response._status).toEqual(400);
        })
    })

    describe("given get user by id", () => {

        const userGetByIdMock = {
            id: 1,
            name: "anyUserName",
            email: "valid@email.com",
            phone: "anyUserPhone",
            createdAt: "anyDateTime",
            updatedAt: "anyDateTime"
        }

        const userRepositoryMock = {
            getById(id) {
                if(id === 1) {
                    return Promise.resolve(userGetByIdMock)
                }
                return Promise.reject({ message: "erro ao buscar user pelo id" })
            }
        }

        test("when success, then return user", async () => {

            const controller = new UserController(userRepositoryMock);

            request = {
                params: {
                    id: "1"
                }
            }

            await controller.getId(request, response);

            expect(response._send).toEqual(userGetByIdMock);
        })

        test("when success, then return status 200", async () => {

            const controller = new UserController(userRepositoryMock);

            request = {
                params: {
                    id: "1"
                }
            }

            await controller.getId(request, response);

            expect(response._status).toEqual(200);
        })

        test("when fail, then return error message", async () => {

            const controller = new UserController(userRepositoryMock);

            request = {
                params: {
                    id: "2"
                }
            }

            await controller.getId(request, response);

            expect(response._send).toEqual({ message: "erro ao buscar user pelo id" });
        })

        test("when fail, then return status 400", async () => {

            const controller = new UserController(userRepositoryMock);

            request = {
                params: {
                    id: "2"
                }
            }

            await controller.getId(request, response);

            expect(response._status).toEqual(400);
        })
    })
})