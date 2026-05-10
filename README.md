# inst377-final-project
This is the final project for INST377. The website is called GateWise and helps users have a better understanding of when they should arrive at the airport based on how many other flights are flying out around their departure time.

## How to install project and all dependencies:
Use 'npm install' to install nodemon, express, dotenv, body-parser, and @supabase/supabase-js

## How to run application on a server:
The easiest way to run this application on a server is to run it through VS code on the live server. Once you have VS code open and are on the homePage-HTML.html file, you can hit the "Go Live" button and that will run the application.

Otherwise, you can run it through Node.js and type npx http-server into the terminal and run the link that it gives you.

Finally, you can run the application through Vercel, which is a publicly accessible deployed version of the application.

## How to run tests for the software:
There are no tests that were written for the software. If something is inputted incorrectly, the user will be notified by the program.

## APIs for the project:
- **AviationStack API:** Provides real-time information about the status of flights around the world. This API is used in the 'Flights' tab of the application to calculate the ideal arrival time at the airport.
- **Pexels API:** Contains various pictures, specifically of airplanes for this application. This API is used in the 'Home' tab of the application to provide the automatic slider of random pictures of planes to help the aesthetics of the application.

## Expectations around known bugs and a road-map for future development:
There are currently no known bugs of the application. One feature that could be implemented in the future are to make the calculations of ideal arrival time to be more customizable. Another feature that could be incorporated into future development is to include every single flight across the world, not just the ones that are in the AviationStack API.