import { encryptPassword } from "../encryptPassword.js";

describe("Encrypt Password", () => {

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

    test("given password to hash, then hash password", async () => {

        let request = { 
            body: { 
                password: "anyUserPassword",
            } 
        }

        response = new ResponseMock();

        const next = () => {};

        await encryptPassword(request, response, next);

        expect(request.body.password).not.toEqual("anyUserPassword");
    })

    test("given no password, then show error message", async () => {

        let request = {
            body: {
                password: null
            }
        }

        response = new ResponseMock();

        const next = () => {};

        await encryptPassword(request, response, next);

        expect(response._send).toEqual("Erro ao criptografar a senha");
    })

    test("given no password, then return status 400", async () => {

        let request = {
            body: {
                password: null
            }
        }

        response = new ResponseMock();

        const next = () => {};

        await encryptPassword(request, response, next);

        expect(response._status).toEqual(400);
    })

})