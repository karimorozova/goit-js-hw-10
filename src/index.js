import './css/styles.css';
import countryTemplate from './templates/country-template.hbs';
import countriesListTemplate from './templates/countries-list-template.hbs'

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');


const debounce = require('lodash.debounce');

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

// const searchInputRef = document.querySelector('#search-box');
// const bodyRef = document.querySelector('body');
// console.log(searchInputRef);
const DEBOUNCE_DELAY = 300;
const BASE_URL = "https://restcountries.com/v3.1";

refs.searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY))


  function onSearchInput(e) {
   
      const countryInputName = e.target.value.trim();
      console.log(countryInputName);
      if(countryInputName === "") {
        refs.countryList.innerHTML ='';
        // refs.countryInfo.innerHTML = '';
        return;
      }
      console.log(0);
      fetch(`${BASE_URL}/name/${countryInputName}?fields=name,capital,population,flags,languages`).then(response => {
          if(!response.ok) {
              throw new Error(Notiflix.Notify.failure('Qui timide rogat docet negare'))
          }
          return response.json();
      }).then(data => {
          
          if(data.length >= 2 && data.length <= 10) {
            // countriesListTemplate(data.map(country))
            data.map(({ name: { official }, flags: { svg } } )=> {
                console.log(official);
                console.log(svg);
                const options = {
                    official,
                    svg,
                }
                console.log(options);
                // const countryName = name.official;
                // const countryFlag = flags.svg;
                const markup = countriesListTemplate(options);
                refs.countryList.insertAdjacentHTML('beforeend', markup);

            } )
            return;
          }
          if(data.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return;
          }
          getCountryInfo(data)
        })
        // }).catch(() => Notiflix.Notify.failure('"Oops, there is no country with that name"'))
    //   https://restcountries.com/v3.1/name/{name}
//     https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all?fields=name,capital,currencies

    //   Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
  }
function getCountryInfo(data) {
    const country = data[0];
    const { name, capital, population, flags, languages } = country;

    const countryOptions = {
        countryName: name.official,
     countryCapital: capital,
     countryFlag: flags.svg,
     countryPopulation: population,
     countryLanguages: Object.values(languages),
    }
    const markup = countryTemplate(countryOptions);
    
    
    refs.countryList.innerHTML =  markup;


}
