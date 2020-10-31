const userController = require("../controllers/userController");
const fetch = require("node-fetch");
const User = require("../models/User");
const { deleteOne } = require("../models/User");
const { validationResult } = require("express-validator");

jest.mock("../models/User");

describe("Testing usercontroller signup", () => {
   

    const spy = jest.spyOn(userController, "signup");
    test("insert", async () => {
        // const req = {
        //     method: "POST",
        //     headers: {
        //     "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //     name: 'Jason',
        //     email: 'jason@email.com',
        //     password: 'password',
        //     }),
        // };
        // const responseData = await userController.signup(req);
        // expect(spy).toHaveBeenCalledTimes(1);
        // expect(spy).toHaveBeenCalledWith(req);
        // expect(spy).toHaveReturnedWith('test');
    });
    
    const mockRequest = () => {
        return {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            name: 'Jason',
            email: 'jason@email.com',
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
        User.findOne.mockResolvedValue();

        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();
        const output = await userController.signup(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test('should 422 error', async() => {
        User.findOne.mockResolvedValue(
            {
                savedApartments: [],
                _id: '5f9c59c255618d1f0075c55c',
                name: 'Jason',
                email: 'jason@email.com',
                password: 'password',
                __v: 0
              }
        );

        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();
        const output = await userController.signup(req, res, next);
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

});