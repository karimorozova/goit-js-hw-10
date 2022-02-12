import './css/styles.css';
import countryTemplate from './templates/country-template.hbs';
import countriesListTemplate from './templates/countries-list-template.hbs';
import { fetchCountries } from './fetchCountries';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

refs.searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY))

  function onSearchInput(e) {
   
       const countryInputName = e.target.value.trim();
   
      if(countryInputName === "") {
        clearInterface();
        return;
      }

      fetchCountries(countryInputName).then(countries => {
          
          if(countries.length >= 2 && countries.length <= 10) {
            countries.map(getCountryList);
            return;
          }

          if(countries.length > 10) {
            clearInterface();
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return;
          }

          countries.map(getCountryInfo);

        })
  }
function getCountryInfo({ name: { official }, capital, population, flags: { svg }, languages }) {

    const countryLanguages = Object.values(languages);
    refs.countryList.innerHTML ='';
    refs.countryInfo.innerHTML =  countryTemplate({official, capital, population, svg, countryLanguages});
}
function getCountryList({ name: { official }, flags: { svg } }) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.insertAdjacentHTML('beforeend', countriesListTemplate({official, svg}));

}
export default function clearInterface() {
    refs.countryList.innerHTML ='';
        refs.countryInfo.innerHTML = "";
}
