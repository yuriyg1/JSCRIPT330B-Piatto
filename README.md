![Image Alt Text](AppScreens.png)

npm start			- Start Front-End
node index.js		- Start Backend		
npm run coverage	- Test coverage
npm test 			- Run tests

QuoteBox App

QuoteBox is a Mobile App developed in React Native with Expo. This App utilizes NodeJS and MongoDB as the backend, with JEST testing.

CRUD routes:
	Quotes:
	- POST '/quotes': Adds a quote to the db liked by the user
	- GET '/quotes': Returns all of user's liked quotes from the DB
	- DELETE '/quotes/:quoteId': Deletes a previously liked user's quote from the DB

	Users:
	- GET '/users': Retrieves the user from the DB
	- GET '/users/following': Retrieves user information the main user is following
	- GET '/users/not-following': Retrieves user information the main user is not following
	- POST '/users/follow': Adds user profile to follow list for main user
	- POST '/users/unfollow': Removes user profile from follow list for main user

	Search:
	- GET '/search': Takes provided search term, and using meta score search, will return any quotes that have a significant textScore as defined by Mongo. Else will display message.

	Signup:
	- POST '/signup': Takes provided firstName/lastName/email/password, checks if an email record exists, if not hashes password with bcrypt, and stores info in DB. Returns a minted JWT.

	Signin:
	- POST '/signin': Takes provided email/password, and compares bcrypt hashword, if valid returns a JWT token

Text Search:
	Search:
	- A Mongo text meta score search is utilized in this project to search for specific quotes given a search term. If a significant score is achieved, the search will return the quote(s) belonging to that user.

Indexing, Uniques:
	Users:
	- Emails must be unqiue

	Quotes:
	- Quotes are indexed for faster retrieval 

![Image Alt Text](JestTestResults.png)
