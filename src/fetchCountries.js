import clearInterface from "./index";

const BASE_URL = "https://restcountries.com/v3.1";


export const fetchCountries = (countryInputName) => {
    
    const url = `${BASE_URL}/name/${countryInputName}?fields=name,capital,population,flags,languages`;
   return fetch(url).then(response => {
          return response.json();
      }).catch(() => {
        clearInterface();
        Notiflix.Notify.failure('"Oops, there is no country with that name"')
    })
}