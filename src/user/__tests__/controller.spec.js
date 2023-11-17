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

        test("when user data is incorrect, then send error message", async () => {

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

            const errorValidationNameMessage = "Validation error on name. Error: name must no be null";

            await controller.create(request, response);

            expect(response._send).toEqual(errorValidationNameMessage);
        })

        const userMock = {
            name: "anyUserName",
            email: "valid@email.com",
            password: "anyUserPassword",
            phone: "anyUserPhone"
        }
    })
})