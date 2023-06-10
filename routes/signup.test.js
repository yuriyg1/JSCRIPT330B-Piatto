const request = require("supertest");
const server = require("../server");
const testUtils = require('../test-utils');

const User = require('../models/user');

const testSubject = () => {
    const user = {
        firstName: `${generateRandomString(5)}`,
        lastName: `${generateRandomString(5)}`,
        email: `${generateRandomString(5)}@gmail.com`,
        password: `${generateRandomString(5)}`
    };
    return user
}
const user0 = testSubject(); // to be used in 3 tests

describe("/signup", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.clearDB);
    afterAll(testUtils.stopDB);

    describe("POST /signup", () => {     
        it("should return 200 with valid credentials", async () => {
          const res = await request(server).post("/signup").send({
            firstName: user0.firstName,
            lastName: user0.lastName,
            email: user0.email,
            password: user0.password
          });
          expect(res.statusCode).toEqual(200);
        });
      });

    describe("POST /signup", () => { 
        it("should return 409 if email taken", async () => {
        const res = await request(server).post("/signup").send({
          firstName: user0.firstName,
          lastName: user0.lastName,
          email: user0.email,
          password: user0.password
        });
        expect(res.statusCode).toEqual(409);
      });
    });
      
    describe("POST /signup", () => {
        it("should return 400 when firstName is missing", async () => {
          const user1 = testSubject()
          const res = await request(server).post("/signup").send({
              firstName: "",
              lastName: user1.lastName,
              email: user1.email,
              password: user1.password
          });
          expect(res.statusCode).toEqual(400);
        });
        it("should return 400 when first/last names are missing", async () => {
            const user2 = testSubject()
            const res = await request(server).post("/signup").send({
                firstName: "",
                lastName: "",
                email: user2.email,
                password: user2.password
            });
            expect(res.statusCode).toEqual(400);
          });
        it("should return 400 when names & email is missing", async () => {
            const user3 = testSubject()
            const res = await request(server).post("/signup").send({
                firstName: "",
                lastName: "",
                email: "",
                password: user3.password
            });
            expect(res.statusCode).toEqual(400);
        });
        it("should return 400 when all is missing", async () => {
            const user4 = testSubject()
            const res = await request(server).post("/signup").send({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            });
            expect(res.statusCode).toEqual(400);
        });
      });
});

function generateRandomString(length) {
    const characters = 'qwertyuiopasdfghjklzxcvbnm';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}
