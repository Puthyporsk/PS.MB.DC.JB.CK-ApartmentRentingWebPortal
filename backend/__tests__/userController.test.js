const userController = require("../controllers/userController");
const Apartment = require("../models/Apartment");
const User = require("../models/User");

jest.mock("../models/User");
jest.mock("../models/Apartment");

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

describe("Testing userController saveApartment", () => {

    const mockRequest = () => {
        return {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid: "123",
              aid: "456",
            }),
          };
    };

    const mockResponse = () =>{
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    }

    // existing user (user with no saved apartments)
    // {
    // savedApartments: [],
    // _id: 5f9c59c255618d1f0075c55c,
    // name: 'Jason',
    // email: 'jason@email.com',
    // password: 'password',
    // __v: 0
    // }

    // existing user (user with 1 saved apartments)
    // {
    // savedApartments: [
    //     {
    //     otherImages: [Array],
    //     _id: 5f947a70f0a2ce323847eb00,
    //     mainImage: 'https://photos.zillowstatic.com/fp/2585250d1fd67ba8b8ece3a1d868db9f-cc_ft_960.jpg',
    //     price: 1025,
    //     city: 'Spokane',
    //     sqft: 850,
    //     bedAmount: 2,
    //     bathAmount: 1,
    //     __v: 0
    //     }
    // ],
    // _id: 5f9c59c255618d1f0075c55c,
    // name: 'Jason',
    // email: 'jason@email.com',
    // password: 'password',
    // __v: 1
    // }

    // existing user (user with 2 saved apartments)
    // {
    // savedApartments: [
    //     {
    //     otherImages: [Array],
    //     _id: 5f947a70f0a2ce323847eb00,
    //     mainImage: 'https://photos.zillowstatic.com/fp/2585250d1fd67ba8b8ece3a1d868db9f-cc_ft_960.jpg',
    //     price: 1025,
    //     city: 'Spokane',
    //     sqft: 850,
    //     bedAmount: 2,
    //     bathAmount: 1,
    //     __v: 0
    //     },
    //     {
    //     otherImages: [Array],
    //     _id: 5f947b3df0a2ce323847eb01,
    //     mainImage: 'https://photos.zillowstatic.com/fp/1e8d7634b79ce6ba59c6aa8ed25c1c90-cc_ft_960.jpg',
    //     price: 2000,
    //     city: 'Pullman',
    //     sqft: 2500,
    //     bedAmount: 3,
    //     bathAmount: 3,
    //     __v: 0
    //     }
    // ],
    // _id: 5f9c59c255618d1f0075c55c,
    // name: 'Jason',
    // email: 'jason@email.com',
    // password: 'password',
    // __v: 2
    // }

    //apartment listing
    // {
    //     otherImages: [
    //       'https://photos.zillowstatic.com/fp/11711826c358d08a27ed98f45a1b8326-cc_ft_576.jpg',
    //       'https://photos.zillowstatic.com/fp/f574316d05fe6ffa038266ec63204653-cc_ft_576.jpg',
    //       'https://photos.zillowstatic.com/fp/643544ff6a45695042de8ec85ae41cbd-cc_ft_576.jpg'
    //     ],
    //     _id: 5f947b3df0a2ce323847eb01,
    //     mainImage: 'https://photos.zillowstatic.com/fp/1e8d7634b79ce6ba59c6aa8ed25c1c90-cc_ft_960.jpg',
    //     price: 2000,
    //     city: 'Pullman',
    //     sqft: 2500,
    //     bedAmount: 3,
    //     bathAmount: 3,
    //     __v: 0
    //   }

    // test("successful add", async() => {
    //     const spy = jest.spyOn(userController, "saveApartment");
    //     User.findById.mockResolvedValue({
    //         savedApartments: [],
    //         _id: '5f9c59c255618d1f0075c55c',
    //         name: 'Jason',
    //         email: 'jason@email.com',
    //         password: 'password',
    //         __v: 0
    //         });
    //     Apartment.findById.mockResolvedValue({
    //         otherImages: [],
    //         _id: '5f947b3df0a2ce323847eb01',
    //         mainImage: 'https://photos.zillowstatic.com/fp/1e8d7634b79ce6ba59c6aa8ed25c1c90-cc_ft_960.jpg',
    //         price: 2000,
    //         city: 'Pullman',
    //         sqft: 2500,
    //         bedAmount: 3,
    //         bathAmount: 3,
    //         __v: 0
    //       });
    //       Apartment.toObject.mockResolvedValue({});

    //     const req = mockRequest();
    //     const res = mockResponse();
    //     const next = jest.fn();
    //     const output = await spy(req, res, next);
    //     expect(res.status).toHaveBeenCalledWith(201);
    // });

    test("no user found by ID", async() => {
      const spy = jest.spyOn(userController, "saveApartment");
      User.findById.mockResolvedValue();
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();
      const output = await spy(req, res, next);
      const error = new Error(
        "A user with this ID doesn't exist"
        );
      expect(next).toHaveBeenCalledWith(error);
    });

    test("no apartment found by ID", async() => {
      const spy = jest.spyOn(userController, "saveApartment");
      User.findById.mockResolvedValue({});
      Apartment.findById.mockResolvedValue();
      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();
      const output = await spy(req, res, next);
      const error = new Error(
        "An error ocurred with trying to find the apartment"
        );
      expect(next).toHaveBeenCalledWith(error);
    });
});