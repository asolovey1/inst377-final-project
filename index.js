console.log("INDEX.JS IS RUNNING");

const express = require('express');
const { createClient } = require("@supabase/supabase-js");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    console.log("REQUEST HIT:", req.method, req.url);
    next();
});

dotenv.config()

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.get('/', (req, res) => {
    res.sendFile('public/flightsPage-HTML.html', { root: __dirname });
})

app.get('/users', async (req, res) => {
    console.log('Attempting to get all users!')

    const { data, error} = await supabase.from('users').select();

    if (error) {
        res.statusCode = 500;
        res.send(error);
    } else {
        console.log('Received Data:', data);
        res.json(data);
    }
});

app.post('/users', async (req, res) => {
    console.log('Adding user');
    console.log(`Request: ${JSON.stringify(req.body)}`);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const flightNumber = req.body.flightNumber;
    const airportCode = req.body.airportCode;

    const { data, error} = await supabase.from('users').insert({
        user_first_name: firstName,
        user_last_name: lastName,
        user_flight_number: flightNumber,
        user_airport_code: airportCode,
    })
    .select();

    res.json(data)
})

app.listen(port, () => {
    console.log(`App is available on port: ${port}`)
})