const BASE_URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountries(value) {
    const request = fetch(`${BASE_URL}/name/${value}`).then(response => {
        if (!response.ok) {
            throw new Error(error({
              text: "Неправильное название страны. Попробуйте еще раз!!!"
          }))
        };
        return response.json();
    });
    return request;
};