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

class NEXT {
    constructor() {
        this.errorCode = 0;
    }

    next(obj) {
        this.errorCode = obj.code;
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

// mocking the request object as a bad request
const mockBadRequest = () => {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            name: "",
            email: "",
            password: "",
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
        // CASE 1: Error occurs when 'find' fails

        // stubbing 'find' method to throw an error
        Apartment.find.mockImplementationOnce((x) => { throw new Error("find failed") })

        // setting up the parameters with necessary mocks and stubs
        const req1 = mockRequest();
        var res1 = new RES();

        // calling the method
        const response1 = await apartmentController.getAllApartments(req1, res1, (x) => x.code);

        // asserting the right error code was returned
        expect(response1).toBe(500);


        // CASE 2: Success upon valid inputs

        // test data for the method
        const data = [{ "Test": "data" }];

        // stubbing the 'find' method of the model to return valid data
        Apartment.find.mockResolvedValue(data);

        // setting up the parameters with necessary mocks and stubs
        const req2 = mockRequest();
        var res2 = new RES();
        const next2 = jest.fn();

        // calling the method
        const response2 = await apartmentController.getAllApartments(req2, res2, next2);

        // asserting the right json is returned
        expect(JSON.stringify(res2.data.apartments)).toBe(JSON.stringify(data));


    });

    test("TEST api/apartments/addApartment", async () => {
        // CASE 1: Error due to an error with "save"

        // stubbing the 'save' method of the model to throw an error
        jest.spyOn(Apartment.prototype, 'save')
            .mockImplementationOnce(() => { throw new Error("save failed") });

        // setting up the parameters with necessary mocks and stubs
        const req1 = mockRequest();
        var res1 = new RES()

        const response1 = await apartmentController.addApartment(req1, res1, (x) => x.code);

        // asserting the right error code was returned
        expect(response1).toEqual(500)


        // CASE 2: success upon valid input set

        // stubbing the 'save' method of the model to return a valid response
        jest.spyOn(Apartment.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve('good update'))

        // setting up the parameters with necessary mocks and stubs
        const req2 = mockRequest();
        var res2 = new RES();
        const next2 = jest.fn();

        // calling the method
        const response = await apartmentController.addApartment(req2, res2, next2);

        // asserting that the method was successful and by checking the status code
        expect(res2.statusCode).toEqual(201);
    });

    test("TEST api/apartments/getById", async () => {
        // CASE 1: an error is returned if the request doesnt go through

        // stubbing findById to throw an error
        Apartment.findById.mockImplementationOnce((x) => { throw new Error("findbyIDFailed") })

        // setting up the parameters with necessary mocks and stubs
        const req1 = mockRequest();
        var res1 = new RES();

        // calling the method
        const response1 = await apartmentController.getByID(req1, res1, (x) => x.code);

        // asserting the correct error code was returned
        expect(response1).toEqual(404);


        // CASE 2: an error is returned if apartement with specified ID doesnt exist

        // stubbing 'findById' to return false -> meaning apartment doesnt exist 
        Apartment.findById.mockImplementationOnce((x) => false)

        // setting up the parameters with necessary mocks and stubs
        const req2 = mockRequest();
        var res2 = new RES();

        // calling the method
        const response2 = await apartmentController.getByID(req2, res2, (x) => x.code);

        // asserting the correct error code was returned
        expect(response2).toEqual(500);


        // CASE 3: Successful call upon valid input

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

        // stubbing the 'findById' model method to find the apartment
        Apartment.findById.mockResolvedValue(new MockModel(data));

        // setting up the parameters with necessary mocks and stubs
        const req3 = mockRequest();
        var res3 = new RES();
        const next3 = jest.fn();

        // calling the method
        const response3 = await apartmentController.getByID(req3, res3, next3);

        // asserting the correct json was returned
        expect(JSON.stringify(res3.data.apartment)).toBe(JSON.stringify(data));

    });
});


// testing the User Controller methods

// mocking the 'User' object
jest.mock('../backend/models/User.js');

describe("User Controller Unit Tests", () => {

    test("TEST api/users/signup", async () => {
        // CASE 1: Error when the user already exists

        // stubbing the 'findOne' method
        User.findOne.mockResolvedValue(1);

        // setting up the parameters with necessary mocks and stubs
        const req1 = mockRequest();
        var res1 = new RES();

        const response1 = await userController.signup(req1, res1, (x) => x.code);

        // asserting the correct error code was thrown
        expect(response1).toEqual(422);


        // CASE 2: Error upon an error with "findOne"

        // stubbing findOne to throw an error
        User.findOne.mockImplementationOnce((x) => { throw new Error("FineOne failed") })

        // setting up the parameters with necessary mocks and stubs
        const req2 = mockRequest();
        var res2 = new RES();

        const response2 = await userController.signup(req2, res2, (x) => x.code);

        // asserting the right error was thrown
        expect(response2).toEqual(500);


        // CASE 3: Error upon failure with 'save'

        // stubbing appropriate methods
        jest.spyOn(User.prototype, 'save')
            .mockImplementationOnce(() => { throw new Error("Save failed") });
        User.findOne.mockResolvedValue(0);

        // setting up the parameters with necessary mocks and stubs
        const req3 = mockRequest();
        var res3 = new RES();

        const response3 = await userController.signup(req3, res3, (x) => x.code);

        // asserting the correct error code was returned
        expect(response3).toEqual(500);

        // CASE 4: success upon valid inputs

        // stubbing the 'save' model method
        jest.spyOn(User.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve('good update'));

        // setting up the parameters with necessary mocks and stubs
        const req4 = mockRequest();
        var res4 = new RES();
        const next4 = jest.fn();

        // calling the method
        const respone4 = await userController.signup(req4, res4, next4);

        // asserting the method was successful by checking the statusCode
        expect(res4.statusCode).toEqual(201);
    });

    test("TEST api/users/login", async () => {
        // CASE 1: Error when user doesn't have an account

        // stubbing 'findOne' to return an empty string
        User.findOne.mockResolvedValue("");

        // setting up the parameters with necessary mocks and stubs
        const req1 = mockBadRequest();
        var res1 = new RES();

        // calling the method
        const response1 = await userController.login(req1, res1, (x) => x.code);

        // asserting the right error code is returned
        expect(response1).toEqual(500);


        // CASE 2: Error upon Wrong Password

        // setting up test data
        const data = {
            name: 'Test',
            email: 'test@email.com',
            password: 'password',
        }

        // stubbing the 'findOne' model method
        User.findOne.mockResolvedValue(new MockModel(data));

        // setting up the parameters with necessary mocks and stubs
        const req2 = mockBadRequest();
        var res2 = new RES();

        // calling the method
        const response2 = await userController.login(req2, res2, (x) => x.code);

        // asserting the correct error code is returned
        expect(response2).toEqual(401);


        // CASE 3: Successful login with valid inputs

        // setting up the parameters with necessary mocks and stubs
        const req3 = mockRequest();
        var res3 = new RES();
        const next3 = jest.fn();

        // calling the method
        const response3 = await userController.login(req3, res3, next3);

        // asserting the returned json is correct
        expect(JSON.stringify(res3.data.user)).toEqual(JSON.stringify(data));
    });

    test("TEST api/users/saveApartment", async () => {
        // CASE 1: Error upon invalid userID

        // stubbing 'findById to return 0
        User.findById.mockResolvedValue(0);

        // setting up the parameters with necessary mocks and stubs
        const req1 = mockRequest();
        var res1 = new RES();

        // calling the method
        const response1 = await userController.saveApartment(req1, res1, (x) => x.code);

        // asserting the correect error code was returned
        expect(response1).toEqual(500);


        // CASE 2: Error upon error with finding the apartment

        // stubbing both 'findById' methods to hit this specific case
        User.findById.mockResolvedValue(1);
        Apartment.findById.mockResolvedValue(0);

        // setting up the parameters with necessary mocks and stubs
        const req2 = mockRequest();
        var res2 = new RES();

        // calling the method
        const response2 = await userController.saveApartment(req2, res2, (x) => x.code);

        // asserting the correct error code was returned
        expect(response2).toEqual(500);


        // CASE 3: Error due to user already uploadeding the apartment

        // setting up test data
        const duplicate = { savedApartments: [{ _id: 123 }] };
        const apartement = { _id: 123 }

        // stubbing methods to return the test data
        User.findById.mockResolvedValue(duplicate);
        Apartment.findById.mockResolvedValue(apartement)


        // setting up the parameters with necessary mocks and stubs
        const req3 = mockRequest();
        var res3 = new RES();

        // calling the method
        const response3 = await userController.saveApartment(req2, res2, (x) => x.code);

        // asserting the correct error code was returned
        expect(response3).toEqual(500);


        // CASE 4: Successful insertion with valid inputs

        // stubbing the 'findById' of both models and the 'save' method of the User model
        User.findById.mockResolvedValue(new MockModel({ user: "Nick" }));
        Apartment.findById.mockResolvedValue(new MockModel({ apartment: "GTH2" }));

        jest.spyOn(User.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve('good update'));

        // setting up the parameters with necessary mocks and stubs
        const req4 = mockRequest();
        var res4 = new RES();
        const next4 = jest.fn();

        // calling the method
        const response4 = await userController.saveApartment(req4, res4, next4);

        // asserting the method was successful by checking the status code
        expect(res4.statusCode).toEqual(201);
    });
});
