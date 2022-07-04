<-----------------------------------Project Information--------------------------------->

This project based on simple signUp, signIn and logOut flow in which we store the new user
information in mongodb database and store Jwt tokens inside client's cookies in order to maintain sessions and for fast response of api, we are using Redis inside this application.

<-----------------------------------To Run The Project In Local System------------------>

Commands

1. npm init (To install required packages)
2. npm run dev (To run the server in development environment)
3. npm run prod (To run the server in production environment)

<-----------------------------------Project Flow---------------------------------------->

(API Call)---->server.js---->routes---->controllers---->routes (Response come back to route from controllers)---->(API Response)

<-----------------------------------Additional Information------------------------------>

1. Weather API is a open api
2. News API is a secure api
3. Paste production credentials inside config file.