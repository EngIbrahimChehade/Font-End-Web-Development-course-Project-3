/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=imperial&";
const apiKey = "APPID=f5a72853985a1b0c3d1d398a15ab2605";
//example of city codes: 811, 273, 	528, 705 and 2591
//https://openweathermap.org/api/history-data-state
let zipCode = "";
let feelings = "";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

// Async GET
const retrieveData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  const allData = await request.json();
  console.log(allData);
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};



//Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked
const addBtnEvent = async () => {   
    //use to get the goToTopLink element by id
    const btnElement = document.getElementById('generate');
    //add the click event listener
    btnElement.addEventListener('click', async () => {
        //Get the Zipcode
        zipCode = "&city_id="+document.getElementById('zip').value;
        //Get the feeling
        feelings = document.getElementById('feelings').value;
        // GET request to the OpenWeatherMap API
        let res = await retrieveData(baseURL+apiKey+zipCode);
        //Post the data mix of API and user responses, to POST endpoint on server side.
        let newWeather = {
            temperature : Math.round(res.main.temp) + ' degrees',
            //this api does not retreive data so i use the time zode instead of it
            date : res.timezone,    
            userResponse : feelings
        };
        postData('/addWeather', newWeather);

        //Get Weather from the server
        let allData = retrieveData('/getWeather');
         // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temperature)+ 'degrees';
        document.getElementById('content').innerHTML = allData.userResponse;
        document.getElementById('date').innerHTML =allData.date;
    });
}


function start(){
    addBtnEvent();
}

start()