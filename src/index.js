import './css/styles.css';

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

const searchInputRef = document.querySelector('#search-box');
console.log(searchInputRef);
const DEBOUNCE_DELAY = 300;

searchInputRef.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY))

fetch('https://restcountries.com/v3.1/all').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }).then(console.log).catch(console.log);

  function onSearchInput() {
      console.log(0);
  }
