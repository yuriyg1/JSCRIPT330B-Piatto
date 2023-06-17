const request = require("supertest");
const server = require("../server");
const testUtils = require('../test-utils');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

//////////////////////// Test Structure ///////////////////////
// Create User
// Test save fav quote to User's stack      (POST /)
// Test get all quotes from User's stack    (POST /follow)
// Test delete quote from stack             (GET /following)
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
        _id: `${generateRandomString(12)}`,
        content: `${generateRandomString(30)}`,
        author: `${generateRandomString(5)} ${generateRandomString(3)} ${generateRandomString(5)}`,
        tags: [`${generateRandomString(5)}`],
        authorSlug: `${generateRandomString(5)}-${generateRandomString(3)}`,
        length: 30,
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

  describe('Test /users', () => {
    let user0JWT
    let user0_id;
    let Qid;

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
      
    // Return all quotes
    it('should return 200 and all quotes for user', async () => {
        const response = await request(server)
          .get('/quotes')
          .set('Authorization', `Bearer ${user0JWT}`);
      
        expect(response.statusCode).toBe(200);
      

        const { allQuote } = response.body;
        // allQuote.forEach((quote, index) => {
        // const { quoteId, author, content, tags, length } = quote;
        const { _id, quoteId, author, content, tags, length } = allQuote[0];
            Qid = _id //Mongo-made _id for quote, to be used in the next test

            expect(quoteId).toBe(quote._id);
            expect(content).toBe(quote.content);
            expect(author).toBe(quote.author);
            expect(tags).toEqual(quote.tags);
            expect(length).toBe(quote.length);
        // });
    });

    // Delete Quote
    it('should return 404 if something is wrong', async () => {
        const response = await request(server)
          .delete(`/quotes/${null}`)
          .set('Authorization', `Bearer ${user0JWT}`);
      
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Failed to delete');
      });
      
    // Delete Quote
    it('should return 200 and delete quote', async () => {
        const response = await request(server)
          .delete(`/quotes/${Qid}`)
          .set('Authorization', `Bearer ${user0JWT}`);
      
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Successfully deleted');
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