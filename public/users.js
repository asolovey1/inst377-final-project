async function createUser() {
    await fetch('/users', {
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
    await fetch('/users')
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