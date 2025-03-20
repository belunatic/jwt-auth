# Purpose
Create a pre-made JWT login for a MERN app

## FrontEnd
- Include a login and register form, and a logout button
- When Logging in, a token will be saved in your localStorage (this token will be send back to backend to verify it)
- Using React Context API to check if a user token is still valid
- Logging out will delete the toekn in the localStorage

## BackEnd
- See the ``.envexample`` to setup your enviromental variables
- Route include login, register, and getMe.
- getMe Router is a protected route that uses a middleware in ``middleware/AuthMiddleware.js`` to verify the user token and send the user data back to the frontend.

## How to get started
- start with ``npm i`` on both frontend and backend
- set up your environmental variable using the ``.envexample`` file as a sample; For backend place the ``.env`` file in this route ``server/config/.env``.
- Run the client and server folders to see the output
- This is the start, happy building

## Room for improvement
This solution needs improvements, especially when it come to security, localStorage is not the besst place to store login token in a shared enviroment.
