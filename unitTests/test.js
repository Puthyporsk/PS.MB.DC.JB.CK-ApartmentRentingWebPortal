const { expect } = require('@jest/globals');
const apartmentController = require('../backend/controllers/apartmentController')
const userController = require('../backend/controllers/userController')
const Apartment = require('../backend/models/Apartment.js')
const User = require('../backend/models/User.js')

// Modeling the res object, couldn't mock it with Jest
class RES {
    constructor() {
        this.statusCode = 98812;
        this.data = {}
    }
    status(code) {
        this.statusCode = code;
        return this;
    }
    json(obj) {
        this.data = obj;
    }
}

// Modeling a mongoose model object to stub toObject and save(). I couldn't stub them using Jest
class MockModel {
    constructor(d) {
        this.data = d;
        this.password = "password";
        this.savedApartments = [];
    }

    toObject(obj) {
        return this.data;
    }

    async save() {

    }
}

// mocking the request object
const mockRequest = () => {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            name: 'Test',
            email: 'test@email.com',
            password: 'password',
        },
        params: {
            a_id: '5f947b3df0a2ce323847eb01'
        }
    };
};

// mocking the Apartment Model
jest.mock('../backend/models/Apartment.js');

// Testing the apartment controller methods
describe("Apartment Controller Unit Tests", () => {

    test("TEST api/apartments/getAll", async () => {

        // test data for the method
        const data = [{ "Test": "data" }];

        // stubbing the 'find' method of the model
        Apartment.find.mockResolvedValue(data);

        // setting up the parameters with necessary mocks and stubs
        const req = mockRequest();
        var res = new RES();
        const next = jest.fn();

        // calling the method
        const response = await apartmentController.getAllApartments(req, res, next);

        // asserting the right json is returned
        expect(JSON.stringify(res.data.apartments)).toBe(JSON.stringify(data));
    });

    test("TEST api/apartments/addApartment", async () => {

        // stubbing the 'save' method of the model
        jest.spyOn(Apartment.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve('good update'))

        // setting up the parameters with necessary mocks and stubs
        const req = mockRequest();
        var res = new RES();
        const next = jest.fn();

        // calling the method
        const response = await apartmentController.addApartment(req, res, next);

        // asserting that the method was successful and by checking the status code
        expect(res.statusCode).toEqual(201);
    });

    test("TEST api/apartments/getById", async () => {

        // test data for the method
        const data = {
            otherImages: [],
            _id: '5f947b3df0a2ce323847eb01',
            mainImage: 'https://photos.zillowstatic.com/fp/1e8d7634b79ce6ba59c6aa8ed25c1c90-cc_ft_960.jpg',
            price: 2000,
            city: 'Pullman',
            sqft: 2500,
            bedAmount: 3,
            bathAmount: 3,
            __v: 0
        };

        // stubbing the 'findById' model method
        Apartment.findById.mockResolvedValue(new MockModel(data));

        // setting up the parameters with necessary mocks and stubs
        const req = mockRequest();
        var res = new RES();
        const next = jest.fn();

        // calling the method
        const response = await apartmentController.getByID(req, res, next);

        // asserting the correct json was returned
        expect(JSON.stringify(res.data.apartment)).toBe(JSON.stringify(data));

    });
});

// testing the User Controller methods

jest.mock('../backend/models/User.js');

describe("User Controller Unit Tests", () => {

    test("TEST api/users/signup", async () => {

        // stubbing the 'findOne' model method
        User.findOne.mockResolvedValue(0);

        // stubbing the 'save' model method
        jest.spyOn(User.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve('good update'));

        // setting up the parameters with necessary mocks and stubs
        const req = mockRequest();
        var res = new RES();
        const next = jest.fn();

        // calling the method
        const respone = await userController.signup(req, res, next);

        // asserting the method was successful by checking the statusCode
        expect(res.statusCode).toEqual(201);
    });

    test("TEST api/users/login", async () => {

        // setting up test data
        data = {
            name: 'Test',
            email: 'test@email.com',
            password: 'password',
        }

        // stubbing the 'findOne' model method
        User.findOne.mockResolvedValue(new MockModel(data));

        // setting up the parameters with necessary mocks and stubs
        const req = mockRequest();
        var res = new RES();
        const next = jest.fn();

        // calling the method
        const respone = await userController.login(req, res, next);

        // asserting the returned json is correct
        expect(JSON.stringify(res.data.user)).toEqual(JSON.stringify(data));
    });

    test("TEST api/users/saveApartment", async () => {

        // stubbing the 'findById' of both models and the 'save' method of the User model
        User.findById.mockResolvedValue(new MockModel({ user: "Nick" }));
        Apartment.findById.mockResolvedValue(new MockModel({ apartment: "GTH2" }));

        jest.spyOn(User.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve('good update'));

        // setting up the parameters with necessary mocks and stubs
        const req = mockRequest();
        var res = new RES();
        const next = jest.fn();

        // calling the method
        const respone = await userController.saveApartment(req, res, next);

        // asserting the method was successful by checking the status code
        expect(res.statusCode).toEqual(201);
    });
});
