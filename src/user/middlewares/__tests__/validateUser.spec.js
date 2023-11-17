import { validateUser } from "../validateUser.js";

describe("Validate User", () => {

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

    describe("given request body is invalid", () => {

        const request = { 
            body: { 
                name: null,
                email: "valid@email.com",
                password: "anyUserPassword",
                phone: "anyUserPhone"
            }
        }

        response = new ResponseMock();

        const next = () => {};

        test("then return error message", async () => {
    
            const errorValidationNameMessage = "Validation error on name. Error: name is a required field";
    
            await validateUser(request, response, next);
    
            expect(response._send).toEqual(errorValidationNameMessage);
        })

        test("then return status 400", async () => {

            await validateUser(request, response, next);

            expect(response._status).toEqual(400);
        })
    })

})