class CustomStream {
  constructor() {
    this.controller = undefined; // No need to create a controller directly
    this.stream = new ReadableStream({
      start: controller => {
        // This callback function receives the controller as an argument
        this.controller = controller;
      },
      pull: () => {}
    });
  }

  pushData(data) {
    this.controller.enqueue(data);
  }

  endStream() {
    this.controller.close();
  }

}

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

// Example usage
const coordinateStream = new CustomStream();

async function fetchDataAndSave() {
  try {
      const data = await fetchData();
      coordinateStream.pushData(data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Simulate data coming in every second
setInterval(() => {

  fetchDataAndSave().then(() => {
    // If fetchDataAndSave is successful, push the latest data into the stream
    
  });
}, 1000);

// Render coordinates from the stream
const renderLoop = async () => {
  const reader = coordinateStream.stream.getReader();

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      console.log('Stream has ended.');
      break;
    }

    // Render the coordinates on the screen (replace this with your rendering logic)
    console.log('Rendering coordinates:', value);

    // Simulate a delay (replace this with your rendering logic)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

// Start the render loop
renderLoop();