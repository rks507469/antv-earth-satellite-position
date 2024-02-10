async function fetchData() {
    try {
        const fetchModule = await import("node-fetch");
        const fetch = fetchModule.default;
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        return response.json();
    } catch (e) {
        console.log("error fetching data " + e.toString());
    }
}

// Function to call fetchData every 10 seconds and save results in an array
async function fetchDataEvery10Seconds() {
    const dataArray = []; // Array to store fetched data

    // Function to fetch data and save it in dataArray
    async function fetchDataAndSave() {
        try {
            const data = await fetchData();
            dataArray.push(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Call fetchDataAndSave immediately
    await fetchDataAndSave();

    // Schedule fetchDataAndSave to be called every 10 seconds
    const intervalId = setInterval(async () => {
        await fetchDataAndSave();
    }, 100);

    // Stop interval after 1000 seconds (100 times calling every 10 seconds)
    setTimeout(() => {
        clearInterval(intervalId);
        console.log("Finished fetching data.");
        console.log("Total data fetched:", dataArray);

    }, 1000); // 1000000 milliseconds = 1000 seconds
}

// Call the function to start fetching data every 10 seconds for 1000 seconds
fetchDataEvery10Seconds();
console.log(project)