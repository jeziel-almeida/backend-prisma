import { encryptPassword } from "../encryptPassword.js";

describe("Encrypt Password", () => {

    describe("given password to hash", () => {

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

        test("hash password", async () => {

            let request = { 
                body: { 
                    name: "anyUserName",
                    email: "valid@email.com",
                    password: "anyUserPassword",
                    phone: "anyUserPhone"
                } 
            }

            response = new ResponseMock();

            const next = () => {};

            await encryptPassword(request, response, next);

            expect(request.body.password).not.toEqual("anyUserPassword");
        })
    })
})