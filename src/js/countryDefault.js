import markupCard from '../templates/countryCard.hbs';
import markupNameCountry from '../templates/countryName.hbs';
import refs from './refs.js';
import fetchCountries from './fetchCountry.js';
import _ from 'lodash';
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

refs.input.addEventListener('input', _.debounce(onSearchCountry, 500));

function onSearchCountry(e) {
    e.preventDefault();

    clearMarkupCountry();
    const inputValue = e.target.value;
    const requestName = fetchCountries(inputValue).then(result => {
        if (result.length === 1) {
            const markup = markupCard(...result);
            refs.box.innerHTML = markup
        } else if (result.length <= 10 && result.length > 1) {
            const markupName = markupNameCountry(result);
            refs.box.insertAdjacentHTML("beforeend", markupName)
        } else {
            error({
                text: "Слишком много вариантов стран!!!!",
                addClass: "error-tab"
          })
        } 
    }).catch(error => clearMarkupCountry(error));
    return requestName;
}

function clearMarkupCountry() {
    refs.box.innerHTML = ''
}