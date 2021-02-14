/* Global Variables */
// removed api key as per reviewer siggestion
const apiKey = '';
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

const fetchWeather = async function (url) {
    let response = await fetch(url);
    try {
        let data = await response.json();
        return data;
    } catch (err) {
        console.log("Err:", err)
    }
}
const updateUI = async function () {
    const dateDiv = document.getElementById('date');
    const tempDiv = document.getElementById('temp');
    const contentDiv = document.getElementById('content');

    //Get data from owr own server
    let UIData = await getData("http://localhost:3000/projectData");

    //Updating the UI
    dateDiv.innerText = UIData?.date;
    tempDiv.innerText = UIData?.temp;
    contentDiv.innerText = UIData?.content;
}
const handleGenerate = async function () {
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    const url = `${apiUrl}${zip}&APPID=${apiKey}&units=metric`;

    if (zip.length === 0 || feelings.length === 0) {
        alert("All Inputs are required");
        return
    }
    let weathData = await fetchWeather(url);
    let temp = weathData?.main?.temp;
    let d = new Date();
    let date = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
    const data = {
        date: date,
        temp: temp,
        content: content,
    }
    await postData("http://localhost:3000/projectData", data);
    updateUI();
}
const getData = async function (url) {
    let response = await fetch(url)
    try {
        let data = response.json();
        console.log(data);

        return data;
    } catch (err) {
        console.log(err);
    }

}
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', handleGenerate);