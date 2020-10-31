const loginController = require("../Login/Login");

describe("Testing login.js", () => {

    let mockfn = jest.fn();

    beforeEach( () => { mockfn.mockClear(); });

    test("This should always pass", () => {
        expect(true).toEqual(true);
    })

    test("handle login", () => {
        const email = 'test@mail.com';
        const pass = 'pasword';

        loginController.setSignupEmail(email);
        expect(mockfn).toBeCalled();
    });
});