
const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".cityinput");
const card = document.querySelector(".card");

const apikey="cbecf7b12dab1e21d209e03a330b9987";

weatherform.addEventListener("submit",async event=>
{   
    event.preventDefault();

    const city = cityinput.value;

    if(city)
    {
        try
        {
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
        }
        catch(error)
        {
            console.error(error);
            displayerror(error);
        }
    }
    else
    {
        displayerror("Please Enter a City");
    }
}
);

async function getweatherdata(city) 
{
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);
    
    if(!response.ok)
    {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayweatherinfo(data)
{
    const {name: city,
           main: {temp, humidity},
           weather: [{description,id}]} = data;

    card.textContent="";
    card.style.display="flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const skydisplay = document.createElement("p");
    const imogi = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    skydisplay.textContent = description;
    imogi.textContent = getweatherimogi(id);


    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    skydisplay.classList.add("skydisplay");
    imogi.classList.add("imogi");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(skydisplay);
    card.appendChild(imogi);

}

function getweatherimogi(weatherid)
{
    switch(true)
    {
        case (weatherid>=200 && weatherid<300):
            return "⛈️";
        case (weatherid>=300 && weatherid<400):
            return "🌦️";
        case (weatherid>=500 && weatherid<600):
            return "🌧️";
        case (weatherid>=600 && weatherid<700):
            return "❄️"; 
        case (weatherid>=700 && weatherid<800):
            return "🌫️";
        case (weatherid===800):
            return "☀️";
        case (weatherid>=801 && weatherid<810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayerror(message)
{
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("error");

    card.textContent="";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}
