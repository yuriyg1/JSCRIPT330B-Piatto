const request = require("supertest");
var jwt = require('jsonwebtoken');

const server = require("../server");
const testUtils = require('../test-utils');

const User = require('../models/user');

describe("/signin", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.clearDB);
    afterAll(testUtils.stopDB);
  
    const user0 = {
        email: 'testOne0@gmail.com',
        password: 'passwordOne'
    };
    const user1 = {
        firstName: 'tester2',
        lastName: 'testerTwo',
        email: 'testTwo0@gmail.com',
        password: 'passwordTwo'
    };
  
    describe("POST /signin", () => {
      it("should return 404 without an email", async () => {
        const res = await request(server).post("/signin").send({
          password: user0.password
        });
        expect(res.statusCode).toEqual(400);
      });
  
      it("should return 404 without a password", async () => {
        const res = await request(server).post("/signin").send({
          email: user0.email
        });
        expect(res.statusCode).toEqual(400);
      });
  
      it("should return 404 for a usr that dne", async () => {
        const res = await request(server).post("/signin").send({
          email: 'doesNot@exist.com',
          password: 'password123'
        });
        expect(res.statusCode).toEqual(404);
      });
});

    describe("POST /signin", () => {
        beforeAll(async () => {
          // Create a user with the correct password
          await request(server).post("/signup").send(user1);
        });
      
        it("should return 401 for an invalid password", async () => {
          const res = await request(server).post("/signin").send({
            email: user1.email,
            password: 'wrongpassword'
          });
          expect(res.statusCode).toEqual(401);
        });
      
        it("should return 200 with valid credentials", async () => {
          const res = await request(server).post("/signin").send({
            email: user1.email,
            password: user1.password
          });
          expect(res.statusCode).toEqual(200);
        });
      });
  });
  