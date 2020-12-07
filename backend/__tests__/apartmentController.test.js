const apartmentController = require("../controllers/apartmentController");
const Apartment = require("../models/Apartment");

jest.mock("../models/Apartment");

describe("Testing apartmentController addApartment", () => {

    const mockRequest = () => {
        return {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otherImages: [],
                mainImage: 'some image url',
                price: 2000,
                city: 'Pullman',
                sqft: 2500,
                bedAmount: 3,
                bathAmount: 3,
                __v: 0
              }),
          };
    };

    const mockResponse = () =>{
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    }

    test("successful add", async() => {
        const spy = jest.spyOn(apartmentController, "addApartment");
        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();
        const output = await spy(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
    });
});

describe("Testing apartmentController getAllApartments", () => {

    const mockRequest = () => {
        return {};
    };

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    
    test("successful 201 response", async() => {
        const spy = jest.spyOn(apartmentController, "getAllApartments");
        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();
        const output = await spy(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
    });
});

describe("Testing apartmentController getByID", () => {

    const mockRequest = () => {
        return {
            params: {
              "a_id": "0",
            }
          };
    };

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    test("no apartment by id", async() => {
        const spy = jest.spyOn(apartmentController, "getByID");
        Apartment.findById.mockResolvedValue();
        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();
        const output = await spy(req, res, next);
        const error = new Error(
            "Error.. the apartment doesn't exist"
          );
        expect(next).toHaveBeenCalledWith(error);
    });
})