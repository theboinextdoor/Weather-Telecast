const tempfield = document.querySelector(".temp")
const cityfiled = document.querySelector(".city");
const humidityField = document.querySelector(".humidity")
const windfield = document.querySelector(".wind");
const inputfield= document.querySelector(".search input")
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather .weathericon")
const videobg = document.querySelector(".video")


let city = ""

const apiKey = "4dc49c82ce6f1bbeceb2a964e7f3cb21";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`

const fetchData = async(city)=>{
    const response = await fetch(apiUrl + city +  `&appid=${apiKey}`)
    if(response.status === 404){  //if response gives any error
        document.querySelector(".error").style.display= "block"
        document.querySelector(".weather").style.display = "none";
    }else{
        document.querySelector(".error").style.display= "none"

        let data = await response.json();


        // de-structuring the data
        const {
            main :{humidity, temp,},
            wind : {speed},
        }= data

        // document.querySelector(".city").innerText = data.name
        if(data.weather[0].main === "Clouds"){
            weatherIcon.src = "./img/cloud.png"
        }else if(data.weather[0].main === "Clear"){
            weatherIcon.src = "./img/sunny.png";
        }else if(data.weather[0].main === "Rain"){
            weatherIcon.src = "./img/rain2.png";
        }else if(data.weather[0].main === "Mist"){
            weatherIcon.src = "./img/mist.png";
        }else if(data.weather[0].main === "Drizzle"){
            weatherIcon.src = "./img/drizzle.png";
        }


        document.querySelector(".weather").style.display = "block"

        cityName = data.name;

        updateDOM(temp , humidity, speed, cityName)

    }


}


function updateDOM(temperature , humidity, speed,cityname ){
    tempfield.innerText = Math.round(temperature)+"°c";
    humidityField.innerHTML = humidity+"%";
    windfield.innerText = speed+" Km/h";
    cityfiled.innerHTML = cityname;
}

searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    fetchData(inputfield.value);
});



