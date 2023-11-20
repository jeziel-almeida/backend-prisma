import { encryptPassword } from "../encryptPassword";

describe("Encrypt Password", () => {

    let response;

    class ResponseMock {
        _send = null;
        _status = 0;
        send(value: any) {
            this._send = value;
        }
        status(value: number) {
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

