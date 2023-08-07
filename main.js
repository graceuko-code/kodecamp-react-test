//Dark mode/Light mode switch
function darkMode() {
    let element = document.body;
    let content = document.getElementById("DarkModetext");
    element.className = "dark-mode";
    content.innerText = "Dark Mode is ON";
}
function lightMode() {
    let element = document.body;
    let content = document.getElementById("DarkModetext");
    element.className = "light-mode";
    content.innerText = "Dark Mode is OFF";
}

//coutries rest API
//global variables
const countriesList = document.getElementById("countries");
let countries;//this contain the fetched data

// Event listener
countriesList.addEventListener('change', function(event){
    displayCountryInfo(event.target.value);
})

//get the API
fetch("https://restcountries.com/v2/all")
.then(res => res.json())
.then(data => initialise(data))
.catch(err => console.log("Error", err))

//initialise the data
function initialise(countriesData){
    console.log(countriesData);
    countries = countriesData;
    let options = "";
   
    //foreach loop to set the select options
    countries.forEach(country => options += `<option value="${country.alpha3Code}">${country.name}</option>`);
  countriesList.innerHTML = options;

  //random display of countries when selected/after refreshing the page
  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length)
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);//AFG is the parameter for alpha3code, that's afganistan.
}

//Display of countries data
function displayCountryInfo(countryAlpha3Code) {
    const countryData = countries .find(country => country.alpha3Code === countryAlpha3Code);
    console.log(countryData);
    document.getElementById("capital").innerHTML = countryData.capital;
    document.getElementById("dailing-code").innerHTML = `+ ${countryData.callingCodes[0]}`;
    document.getElementById("population").innerHTML = countryData.population.toLocaleString()  ;
    document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(e => `${e.name} (${e.code}) (${e.symbol})`).join("- ");
    document.getElementById("region").innerHTML = countryData.region;
    document.getElementById("subregion").innerHTML = countryData.subregion;
    
    document.querySelector("#flag-container img").src = countryData.flag;
    document.querySelector("#flag-container img").alt = `flag of ${countryData.name}`;
}



