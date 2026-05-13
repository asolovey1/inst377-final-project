async function calculateArrival() {
    const flightNumber = document.getElementById("flightNumber").value;
    const airportCode = document.getElementById("airportCode").value;

    let flightData = null;
    let departureTime = null;
    let departureAirport = null;

    if (flightNumber) {

            const response = await fetch(
                `https://api.aviationstack.com/v1/flights?access_key=99c9cd79c198b128b7225f05e2f14469&flight_iata=${flightNumber}`
            );

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                alert("Flight not found.");
                return;
            }

            flightData = data.data[0];
            departureAirport = flightData.departure.iata;
            departureTime = new Date(flightData.departure.scheduled);
        }

        else if (airportCode) {

            const response = await fetch(
                `https://api.aviationstack.com/v1/flights?access_key=99c9cd79c198b128b7225f05e2f14469&dep_iata=${airportCode}&flight_iata=${flightNumber}`
            );

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                alert("No flights found for this airport.");
                return;
            }

            flightData = data.data[0];
            departureAirport = airportCode;
            departureTime = new Date(flightData.departure.scheduled);
        }

        else {
            alert("Please enter either a flight number or airport code.");
            return;
        }

    let nearbyFlights = 0;

    const response = await fetch(
         `https://api.aviationstack.com/v1/flights?access_key=99c9cd79c198b128b7225f05e2f14469&dep_iata=${airportCode}`
    );

    const data = await response.json();

    data.data.forEach(currentFlight => {
            const currentDeparture = new Date(
                currentFlight.departure.scheduled
            );

            const timeDifference =
                Math.abs(currentDeparture - departureTime) / (1000 * 60 * 60);

            if (timeDifference <= 3) {
                nearbyFlights++;
            }
        });

        const totalFlights = data.data.length;
        renderChart(nearbyFlights, totalFlights);

       let arrivalHoursBefore = 2;

        if (nearbyFlights > 30) {
            arrivalHoursBefore = 4;
        } else if (nearbyFlights > 15) {
            arrivalHoursBefore = 3;
        }

        const recommendedArrival = new Date(
            departureTime.getTime() - arrivalHoursBefore * 60 * 60 * 1000
        );

        displayArrivalTime(
            flightData,
            nearbyFlights,
            recommendedArrival
        );
}

function displayArrivalTime(flightData, nearbyFlights, recommendedArrival) {
    const output = document.getElementById("arrivalInfo");

    output.innerHTML = `
        <h2>Your Flight Info</h2>

        <p><strong>Airline:</strong> ${flightData.airline.name}</p>

        <p><strong>Flight Number:</strong> ${flightData.flight.iata}</p>

        <p><strong>Departure Airport:</strong> ${flightData.departure.airport}</p>

        <p><strong>Scheduled Departure:</strong> 
            ${new Date(flightData.departure.scheduled).toLocaleString()}
        </p>

        <p><strong>Flights departing around your time:</strong> 
            ${nearbyFlights}
        </p>

        <p><strong>RECOMMENDED AIRPORT ARRIVAL TIME: </strong>${recommendedArrival.toLocaleString()}</p>
    `;
}

let flightChartInstance = null;

function renderChart(nearbyFlights, totalFlights) {

    const ctx = document.getElementById("flightChart").getContext("2d");

    if (flightChartInstance) {
        flightChartInstance.destroy();
    }

    flightChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Nearby Flights Compared to Total Flights"],
            datasets: [
                {
                    label: "Nearby Flights (±3 hrs)",
                    data: [nearbyFlights],
                    backgroundColor: "pink"
                },
                {
                    label: "Total Airport Flights",
                    data: [totalFlights],
                    backgroundColor: "lavender"
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Number of Flights"
                    }
                }
            }
        }
    });
}

async function createUser() {
    await fetch('https://inst377-final-project-gamma.vercel.app/users', {
        method: "POST",
        body: JSON.stringify({
            firstName: `${document.getElementById('firstName').value}`,
            lastName: `${document.getElementById('lastName').value}`,
            flightNumber: `${document.getElementById('flightNumber').value}`,
            airportCode: `${document.getElementById('airportCode').value}`,
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then((result) => result.json())
    await loadUserData();
}

async function loadUserData() {
    await fetch('https://inst377-final-project-gamma.vercel.app/users')
        .then((result) => result.json())
        .then((resultJson) => {
            console.log(resultJson);
            const table = document.createElement('table');
            table.setAttribute('id', 'userInfo');
            // Setting up table, heading, row
            const tableRow = document.createElement('tr');

            const tableHeadingFirstName = document.createElement('th');
            tableHeadingFirstName.innerHTML = 'First Name';

            const tableHeadingLastName = document.createElement('th');
            tableHeadingLastName.innerHTML = 'Last Name';

            const tableHeadingFlightNumber = document.createElement('th');
            tableHeadingFlightNumber.innerHTML = 'Flight Number';

            const tableHeadingAirportCode = document.createElement('th');
            tableHeadingAirportCode.innerHTML = 'Airport Code';

            tableRow.appendChild(tableHeadingFirstName);
            tableRow.appendChild(tableHeadingLastName);
            tableRow.appendChild(tableHeadingFlightNumber);
            tableRow.appendChild(tableHeadingAirportCode);

            table.appendChild(tableRow);

            // Adding data to table
            resultJson.forEach((user) => {
                const userTableRow = document.createElement('tr');
                const userTableFirstName = document.createElement('td');
                const userTableLastName = document.createElement('td');
                const userTableFlightNumber = document.createElement('td');
                const userTableAirportCode = document.createElement('td');

                userTableFirstName.innerHTML = user['user_first_name'];
                userTableLastName.innerHTML = user['user_last_name'];
                userTableFlightNumber.innerHTML = user['user_flight_number'];
                userTableAirportCode.innerHTML = user['user_airport_code'];

                userTableRow.appendChild(userTableFirstName);
                userTableRow.appendChild(userTableLastName);
                userTableRow.appendChild(userTableFlightNumber);
                userTableRow.appendChild(userTableAirportCode);

                table.appendChild(userTableRow);
            });

            const preExistingTable = document.getElementById('userInfo');
            if(preExistingTable) {
                preExistingTable.remove();
            }

            document.body.appendChild(table);
    });
}

window.onload = loadUserData;