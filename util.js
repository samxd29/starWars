function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`);
}

function apiGetByUrl(url) {
    return axios.get(url);
}

function preencherTabelaFilmes(tableId, list) {
    list.forEach((film) => {
        $(tableId).append(`<tr>
            <td>${film.title}</td>
            <td>${moment(film.release_data).format("DD/MM/YYYY")}</td>
            <td>${film.director}</td>
            <td>${film.episode_id}</td>
        </tr>`);
    });
}

function preencherTabelaPlanetas(tableId, list) {
    list.forEach((planets) => {
        $(tableId).append(`<tr>
            <td>${planets.climate}</td>
            <td>${planets.name}</td>
            <td>${planets.diameter}</td>
            <td>${planets.population}</td>
        </tr>`);
    });
}