const request = require("supertest");
const server = require("../server");
const testUtils = require('../test-utils');
const userDAO = require('../daos/userDAO');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

//////////////////////// Test Structure ///////////////////////
// Create User + 2 Followers (1 will follower User, 1 will not)
// Test Grab User by token            (GET /)
// Test add Follower to User          (POST /follow)
// Test retrieve User's Follower      (GET /following)
// Test retrieve User's not Follower  (GET /not-following)
// Test remove Follower from User     (POST /unfollow)
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

describe('User Routes', () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.clearDB);
  afterAll(testUtils.stopDB);


  const user0 = testSubject() // Main User
  const user1 = testSubject() // Follower 1
  const user2 = testSubject() // Follower 2

  describe('Test /users', () => {
    let user0JWT
    let user0_id;
    let user1JWT;
    let user1_id;
    let user2JWT;
    let user2_id;

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
      // console.log('decodedToken0', decodedToken,'user0_id', user0_id)
    });

    //Create Follower1
    it("should return 200 with valid credentials -- Create Follower1", async () => {
      const res = await request(server).post("/signup").send({
        firstName: user1.firstName,
        lastName: user1.lastName,
        email: user1.email,
        password: user1.password
      });
      expect(res.statusCode).toEqual(200);
      user1JWT = JSON.parse(res.text).jwToken;
      console.log('res', user1JWT)
      const decodedToken = jwt.decode(user1JWT);
      user1_id = decodedToken.userId
      // console.log('decodedToken1', decodedToken,'user1_id', user1_id)
    });

    //Create Follower2
    it("should return 200 with valid credentials -- Create Follower2", async () => {
      const res = await request(server).post("/signup").send({
        firstName: user2.firstName,
        lastName: user2.lastName,
        email: user2.email,
        password: user2.password
      });
      expect(res.statusCode).toEqual(200);
      user2JWT = JSON.parse(res.text).jwToken;
      console.log('res', user2JWT)
      const decodedToken = jwt.decode(user1JWT);
      user2_id = decodedToken.userId
      // console.log('decodedToken2', decodedToken,'user2_id', user2_id)
    });

    // Check if User exists in DB
    it('should return the user if found in the DB | Return 200', async () => {
      expect(user0JWT).toBeDefined();

      const response = await request(server)
        .get('/users')
        .set('Authorization', `Bearer ${user0JWT}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
    });

    // Add Follower1 to User
    it('should add Follower1 to User followingId array | Return 200', async () => {
      const response = await request(server)
        .post('/users/follow')
        .set('Authorization', `Bearer ${user1JWT}`)
        .send({ userId: user0_id }); // Pass the user0_id as the userId in the request body
    
      expect(response.statusCode).toBe(200);
      expect(response.body.users).toBeDefined();
    });

    // Try adding a non-Existing user, should induce 404
    it('should return 404 if failed to follow user | Return 404', async () => {
      const response = await request(server)
        .post('/users/follow')
        .set('Authorization', `Bearer ${user1JWT}`)
        .send({ userId: 'bogusUserId' });
    
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('User not found');
    });

    // Check if Follower1 is following User
    it('should check if Follower1 is following User | Return 200', async () => {
      const response = await request(server)
        .get('/users/following')
        .set('Authorization', `Bearer ${user1JWT}`)
        .send({ userId: user0_id }); // Pass the user0_id as the userId in the request body
    
      expect(response.statusCode).toBe(200);
      expect(response.body.users).toBeDefined();
    });

    // Check if Follower2 is not following User
    it('should check if Follower2 is not following User | Return 200', async () => {
      const response = await request(server)
        .get('/users/not-following')
        .set('Authorization', `Bearer ${user2JWT}`)
        .send({ userId: user0_id }); // Pass the user0_id as the userId in the request body
    
      expect(response.statusCode).toBe(200);
      expect(response.body.users).toBeDefined();
    });

    // Unfollow Follower1 from User
    it('should unfollow Follower1 from User | Return 200', async () => {
      const response = await request(server)
        .post('/users/unfollow')
        .set('Authorization', `Bearer ${user1JWT}`)
        .send({ userId: user0_id }); // Pass the user0_id as the userId in the request body
    
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Unfollowed successfully');
    });
    
    // Test if not-following user attempts to unfollow 
    it('should fail if unfollowing Follower wants to be removed from User following array| Return 404', async () => {
      const response = await request(server)
        .post('/users/unfollow')
        .set('Authorization', `Bearer ${user2JWT}`)
        .send({ userId: user0_id }); // Pass the user0_id as the userId in the request body
    
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('User not found or other issue');
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

