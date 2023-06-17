const request = require("supertest");
const server = require("../server");
const testUtils = require('../test-utils');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

//////////////////////// Test Structure ///////////////////////
// Create Quote & User (need User to save Quote)
// Save Quote to DB
// Test Search by passing a word in the quote, should return quote
// Test Search by passing a word not in  quote, should return null
////////////////////////////////////////////////////////////////

const testSubject = () => {
    const user = {
        firstName: `${generateRandomString(5)}`,
        lastName: `${generateRandomString(5)}`,
        email: `${generateRandomString(5)}@gmail.com`,
        password: `${generateRandomString(5)}`
    };
    return user
  }

const testQuote = () => {
    const quote = {
        _id: 'enj2b5h4b3ie25p',
        content: 'Software testing proves the existence of bugs not their absence',
        author: 'Anonymous',
        tags: [ 'Joke' ],
        authorSlug: 'Anonymous-1',
        length: 63,
        dateAdded: '2020-05-05',
        dateModified: '2022-05-05'
    };
    return quote
  }

  describe('User Routes', () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.clearDB);
    afterAll(testUtils.stopDB);
  
  
    const user0 = testSubject()   // Main User
    const quote = testQuote()     // Quote
  
    describe('Test /search', () => {
      let user0JWT
      let user0_id;
  
      //Create user
      it("should return 200 with valid credentials -- Create User", async () => {
        const res = await request(server).post("/signup").send({
          firstName: user0.firstName,
          lastName: user0.lastName,
          email: user0.email,
          password: user0.password
        });
        expect(res.statusCode).toEqual(200);
        user0JWT = JSON.parse(res.text).jwToken;
        const decodedToken = jwt.decode(user0JWT);
        user0_id = decodedToken.userId
      });
  
      // Pass quote to store
      it('should return 200 and saved quote', async () => {
          const response = await request(server)
            .post('/quotes')
            .set('Authorization', `Bearer ${user0JWT}`)
            .send({quote});
        
          expect(response.statusCode).toBe(200);
          expect(response.body.savedQuote).toBeDefined();
      });

    // Test error state, will also console error
    it("should return 500 without req.query", async () => {
        const response = await request(server)
          .get('/search')
        expect(response.statusCode).toEqual(500);
    });

    // Test search on bad word, should fail to find
    it("should fail to return quote if passed passed low hit probability term", async () => {
        const searchTerm = 'ooooo';
        const response = await request(server)
          .get('/search')
          .query({ q: searchTerm });
      
          expect(response.body).toEqual([]);
    });

    // Test search on known word from sentence, should hit quote
    it("should return 200 and searched quote", async () => {
        const searchTerm = 'Software';
        const response = await request(server)
          .get('/search')
          .query({ q: searchTerm });
      
        expect(response.statusCode).toEqual(200);
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