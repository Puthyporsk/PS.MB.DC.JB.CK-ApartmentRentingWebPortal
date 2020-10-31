const userController = require("../controllers/userController");
const User = require("../models/User");

jest.mock("../models/User");

describe("Testing usercontroller signup", () => {
   
    const mockRequest = () => {
        return {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            name: 'Test',
            email: 'test@email.com',
            password: 'password',
            })};
    };

    const mockResponse = () =>{
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    }

    test('should 201 response', async() => {
        const spy = jest.spyOn(userController, "signup");
        User.findOne.mockResolvedValue();

        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();
        const output = await spy(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test('should 422 error', async() => {
        const spy = jest.spyOn(userController, "signup");
        User.findOne.mockResolvedValue(
            {
                savedApartments: [],
                _id: '12345',
                name: 'Test',
                email: 'test@email.com',
                password: 'password',
                __v: 0
              }
        );

        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();
        const output = await spy(req, res, next);
        const error = new Error(
            "A user with that email already exists, please signup with a different email"
          );
        expect(next).toHaveBeenCalledWith(error);
    });

    // test('should 500 error', async() => {
    //     User.findOne.mockResolvedValue(new Error());

    //     const req = {
    //         method: "POST",
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //         name: 'Test',
    //         email: 'test@email.com',
    //         password: 'password',
    //         })};
    //     const res = mockResponse();
    //     const next = jest.fn();
    //     const output = await userController.signup(req, res, next);
    //     const error = new Error("Signing up failed, please try again");
    //     expect(next).toHaveBeenCalledWith(error);
    // })

});

describe("Testing userController login", () => {

    const mockRequest = () => {
        return {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email: 'test@email.com',
            password: 'password',
            })};
    };

    const mockResponse = () =>{
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    }

    test("Successful login", async () =>{
        const spy = jest.spyOn(userController, "login");

        User.findOne.mockResolvedValue({
            savedApartments: [],
            _id: '5f9c59c255618d1f0075c55c',
            name: 'Jason',
            email: 'jason@email.com',
            password: 'password',
            __v: 0
          });

        const exampleOut = {
            user: {
              savedApartments: [],
              _id: '5f9c59c255618d1f0075c55c',
              name: 'Jason',
              email: 'jason@email.com',
              password: 'password',
              __v: 0,
              id: '5f9c59c255618d1f0075c55c'
            }
          };

        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();
        const output = await spy(req, res, next);
        expect(spy).toHaveBeenCalledTimes(1);
        //expect(res).toHaveBeenCalledWith(exampleOut);
    });

    test("invalid password login", async () =>{
        const spy = jest.spyOn(userController, "login");

        User.findOne.mockResolvedValue({
            savedApartments: [],
            _id: '5f9c59c255618d1f0075c55c',
            name: 'Jason',
            email: 'jason@email.com',
            password: 'different',
            __v: 0
          });

        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();
        const output = await spy(req, res, next);
        const error = new Error(
            "Invalid login credentials, please try again"
          );
        expect(next).toHaveBeenCalledWith(error);
    });

    // test("non existant user", async () =>{
    //     const spy = jest.spyOn(userController, "login");

    //     User.findOne.mockResolvedValue();


    //     const req = mockRequest();
    //     const res = mockResponse();
    //     const next = jest.fn();
    //     const output = await spy(req, res, next);const error = new Error(
    //         "A user with that email doesn't exist"
    //       );
    //     expect(next).toHaveBeenCalledWith(error);
    // });

});