# inst377-final-project
This is the final project for INST377. The website is called GateWise and helps users have a better understanding of when they should arrive at the airport based on how many other flights are flying out around their departure time. The target browsers of this project are iOS and Android. The project was created on a Windows laptop.

## How to install project and all dependencies:
Use 'npm install' to install nodemon, express, dotenv, cors, and @supabase/supabase-js.

## How to run application on a server:
The easiest way to run this application on a server is to run it through VS code on the live server. Once you have VS code open and are on the homePage-HTML.html file, you can hit the "Go Live" button and that will run the application.

Otherwise, you can run it through Node.js and type npx http-server into the terminal and run the link that it gives you.

You can also run the program through your terminal by navigating to the final project folder in GitHub and opening its integrated terminal. Once you do that, you can type 'npm start' into the terminal and the program should run.

Finally, you can see all of the UI that has been used in the app through Vercel, which is a publicly accessible deployed version of the application. To do this, go to: https://solovey-inst377-final-project.vercel.app/users?_vercel_share=vYIHrdsUFA8MR7WefWUQkqc49z62vfGM

## How to run tests for the software:
There are no tests that were written for the software. If something is inputted incorrectly, the user will be notified by the program.

## APIs for the project:
- **AviationStack API:** Provides real-time information about the status of flights around the world. This API is used in the 'Flights' tab of the application to calculate the ideal arrival time at the airport.
- **Pexels API:** Contains various pictures, specifically of airplanes for this application. This API is used in the 'Home' tab of the application to provide the automatic slider of random pictures of planes to help the aesthetics of the application.
- **GET and POST to 'users':** Gets information from the data table created in supabase and posts new entries to the table in supabase. Also, updates the information in the Vercel deployment with the new user data inputted in the app.

## Expectations around known bugs and a road-map for future development:
There are currently no major known bugs of the application. The only concern to be mindful of is that the AviationStack API requires that you make an account with them to be able to access their API. Through your account, you can only have a certain amount of requests with your personalized key that you are given, so you may run out of requests. One feature that could be implemented in the future are to make the calculations of ideal arrival time to be more customizable. Another feature that could be incorporated into future development is to include every single flight across the world, not just the ones that are in the AviationStack API.