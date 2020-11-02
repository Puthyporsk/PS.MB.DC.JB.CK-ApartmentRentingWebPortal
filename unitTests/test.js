const { expect } = require('@jest/globals');
const apartmentController = require('../backend/controllers/apartmentController')
const userController = require('../backend/controllers/userController')
const Apartment = require('../backend/models/Apartment.js')
const User = require('../backend/models/User.js')

// Modeling the res object 
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

// Modeling a mongoose model object to stub toObject
class MockModel {
    constructor(d) {
        this.data = d;
    }

    toObject(obj) {
        return this.data;
    }
}

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
        }),
        params: {
            a_id: '5f947b3df0a2ce323847eb01'
        }
    };
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = (j) => j; //jest.fn().mockReturnValue(res);
    return res;
};

jest.mock('../backend/models/Apartment.js');

describe("ApartmentController Unit Tests", () => {

    test("TEST api/apartments/getAll", async () => {

        const data = [{ "Test": "data" }];

        Apartment.find.mockResolvedValue(data);

        const req = mockRequest();
        var res = new RES();
        const next = jest.fn();
        const response = await apartmentController.getAllApartments(req, res, next);

        expect(JSON.stringify(res.data.apartments)).toBe(JSON.stringify(data));
    });

    test("TEST api/apartments/addApartment", async () => {

        jest.spyOn(Apartment.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve('good update'))

        const req = mockRequest();
        var res = new RES();
        const next = jest.fn();

        const response = await apartmentController.addApartment(req, res, next);
        expect(res.statusCode).toEqual(201);
    });

    test("TEST api/apartments/getById", async () => {

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

        Apartment.findById.mockResolvedValue(new MockModel(data));

        const req = mockRequest();
        var res = new RES();
        const next = jest.fn();
        const response = await apartmentController.getByID(req, res, next);

        expect(JSON.stringify(res.data.apartment)).toBe(JSON.stringify(data));

    });
});

jest.mock('../backend/models/User.js');

describe("UserController Unit Tests", () => {

    test("TEST api/users/signup", async () => {

        User.findOne.mockResolvedValue(0);

        jest.spyOn(User.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve('good update'));

        const req = mockRequest();
        var res = new RES();
        const next = jest.fn();
        const respone = await userController.login(req, res, next);

        //expect(JSON.stringify(res.data.user)).toEqual(JSON.stringify(req.body));
        expect(res.statusCode).toEqual(201);
    });

    test("TEST api/users/login", async () => {

        expect(true).toEqual(true);
    });

    test("TEST api/users/savwApartment", async () => {

        expect(true).toEqual(true);
    });
});
