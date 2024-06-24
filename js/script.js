const searchInput = document.querySelector(".search-input");
const findBtn = document.querySelector(".find-btn");
const forecastToday = document.querySelector(".forecast-today");
const nextDaysForecast = document.querySelector(".next-2days");
const api = {
    baseUrl: "https://api.weatherapi.com",
    endPoint: "v1/forecast.json",
    apiKey: "3674ec13ebef4ae8ab640257242206",
    day: 3
};
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthes = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const cities = [
    "Cairo",
    "Giza",
    "Sharqia",
    "Alexandria",
    "Ismailia",
    "Port Said",
    "Suez",
    "Red Sea",
    "Matruh",
    "Gharbia",
    "Mansoura",
    "Kafr El Sheikh",
    "Sinai",
    "Valley",
    "Minya",
    "Asyut",
    "Sohag",
    "Qena",
    "Luxor",
    "Aswan",
    "Beheira",
    "Fayoum",
    "Beni Suef"
];

findBtn.addEventListener("click", ()=> {
    const city = searchInput.value;
    if (city) {
        getSearchWeather(city);
    }
    searchInput.value = "";
});

// function to display listed cities
const listedCities = () => {
    let result = ""
    for(let i = 0 ; i < cities.length; i++) {
        // console.log(cities[i]);
        result += `<option value="${cities[i]}">`;
        document.getElementById("category").innerHTML = result;
    }
}
listedCities();

// function to get weather todays
const getSearchWeather = async (city) => {
    let response = await fetch(`${api.baseUrl}/${api.endPoint}?key=${api.apiKey}&q=${city}&days=${api.day}`);
    console.log(response);
    if (response.ok && response.status !== 400) {
        let data = await response.json();
        console.log(data);
        console.log(data.current);
        console.log(data.forecast.forecastday);
        console.log(data.location);
        displayCurrentWeather(data.location, data.current);
        displayNextDaysWeather(data.forecast.forecastday);
    }
}
getSearchWeather("Cairo");

// function to display the current weather
const displayCurrentWeather = (location, current) => {
    let date = new Date(current.last_updated);
    console.log(date);
    let currentWeather = `
        <div class="forecast-header d-flex justify-content-between p-3">
            <span class="day">${days[date.getDay()]}</span>
            <span class="date">${date.getDate() + " " + monthes[date.getMonth()]}</span>
        </div>
        <div class="forecast-content pb-3 ps-3">
            <div class="location">${location.name}</div>
            <div class="degree text-white">
                <div class="number">
                    ${current.temp_c}
                    <sup>o</sup>C
                </div>
                <div class="forecast-condition-icon">
                    <img src="https:${current.condition.icon}" alt="" width="90" />
                </div>
            </div>
            <div class="forecast-condition-text mb-3">${current.condition.text}</div>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-umbrella" viewBox="0 0 16 16">
                    <path d="M8 0a.5.5 0 0 1 .5.5v.514C12.625 1.238 16 4.22 16 8c0 0 0 .5-.5.5-.149 0-.352-.145-.352-.145l-.004-.004-.025-.023a3.5 3.5 0 0 0-.555-.394A3.17 3.17 0 0 0 13 7.5c-.638 0-1.178.213-1.564.434a3.5 3.5 0 0 0-.555.394l-.025.023-.003.003s-.204.146-.353.146-.352-.145-.352-.145l-.004-.004-.025-.023a3.5 3.5 0 0 0-.555-.394 3.3 3.3 0 0 0-1.064-.39V13.5H8h.5v.039l-.005.083a3 3 0 0 1-.298 1.102 2.26 2.26 0 0 1-.763.88C7.06 15.851 6.587 16 6 16s-1.061-.148-1.434-.396a2.26 2.26 0 0 1-.763-.88 3 3 0 0 1-.302-1.185v-.025l-.001-.009v-.003s0-.002.5-.002h-.5V13a.5.5 0 0 1 1 0v.506l.003.044a2 2 0 0 0 .195.726c.095.191.23.367.423.495.19.127.466.229.879.229s.689-.102.879-.229c.193-.128.328-.304.424-.495a2 2 0 0 0 .197-.77V7.544a3.3 3.3 0 0 0-1.064.39 3.5 3.5 0 0 0-.58.417l-.004.004S5.65 8.5 5.5 8.5s-.352-.145-.352-.145l-.004-.004a3.5 3.5 0 0 0-.58-.417A3.17 3.17 0 0 0 3 7.5c-.638 0-1.177.213-1.564.434a3.5 3.5 0 0 0-.58.417l-.004.004S.65 8.5.5 8.5C0 8.5 0 8 0 8c0-3.78 3.375-6.762 7.5-6.986V.5A.5.5 0 0 1 8 0M6.577 2.123c-2.833.5-4.99 2.458-5.474 4.854A4.1 4.1 0 0 1 3 6.5c.806 0 1.48.25 1.962.511a9.7 9.7 0 0 1 .344-2.358c.242-.868.64-1.765 1.271-2.53m-.615 4.93A4.16 4.16 0 0 1 8 6.5a4.16 4.16 0 0 1 2.038.553 8.7 8.7 0 0 0-.307-2.13C9.434 3.858 8.898 2.83 8 2.117c-.898.712-1.434 1.74-1.731 2.804a8.7 8.7 0 0 0-.307 2.131zm3.46-4.93c.631.765 1.03 1.662 1.272 2.53.233.833.328 1.66.344 2.358A4.14 4.14 0 0 1 13 6.5c.77 0 1.42.23 1.897.477-.484-2.396-2.641-4.355-5.474-4.854z"/>
                </svg>
                20%
            </span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                </svg>
                north
            </span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                    <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
                </svg>
                15km/h
            </span>
        </div>
    `;
    forecastToday.innerHTML = currentWeather;
}

// function to display the weather for next two days
const displayNextDaysWeather = (forecastDay) => {
    let forecast = "";
    for (let i = 1; i < forecastDay.length; i++) {
        let data = new Date(forecastDay[i].date);
        console.log(forecastDay[i]);
        forecast += `
            <div class="forecast col-lg-6">
                <div class="next-forecast mt-3">
                    <div class="forecast-header text-center p-3">
                        <span class="day">${days[data.getDay()]}</span>
                        <span class="date">${data.getDate() + " " + monthes[data.getMonth()]}</span>
                    </div>
                    <div class="pb-3 ps-3 d-flex text-center justify-content-center flex-column align-items-center">
                        <div class="degree text-white">
                            <div class="number p-5 ">
                                ${forecastDay[i].day.maxtemp_c}
                                <sup>o</sup>c
                                <br>
                                <small class="lead">
                                    ${forecastDay[i].day.mintemp_c}
                                    <sup>o</sup> c
                                </small>
                            </div>
                            <div class="forecast-condition-icon">
                                <img src="https:${forecastDay[i].day.condition.icon}" alt="" width="90">
                            </div>
                        </div>
                        <div class="forecast-condition-text py-5">${forecastDay[i].day.condition.text}</div>
                    </div>
                </div>
            </div>
        `;
        nextDaysForecast.innerHTML = forecast;
    }
}
