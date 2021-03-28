const personagensContador = document.getElementById("personagens");

const luasContador = document.getElementById("luas");

const planetasContador = document.getElementById("planetas");

const navesContador = document.getElementById("naves");

preenchaContador();
preencherTabela();

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(desenhaGrafico);

async function desenhaGrafico() {
  const response = await swapiGet("vehicles/");
  const vehiclesArray = response.data.results;

  const dataArray = [];
  dataArray.push(["Veículos", "Passageiros"]);
  vehiclesArray.forEach((vehicle) => {
    dataArray.push([vehicle.name, Number(vehicle.passengers)]);
  });

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Maiores Veículos",
    legend: "none"
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}

function preenchaContador() {
  Promise.all([
    swapiGet("people/"),
    swapiGet("vehicles/"),
    swapiGet("planets/"),
    swapiGet("starships/")
  ]).then(function (results) {
    console.log(results);
    personagensContador.innerHTML = results[0].data.count;
    luasContador.innerHTML = results[1].data.count;
    planetasContador.innerHTML = results[2].data.count;
    navesContador.innerHTML = results[3].data.count;
  });
}

async function preencherTabela() {
  const response = await swapiGet("films/");
  const tableData = response.data.results;
  console.log(tableData);
  tableData.forEach((film) => {
    $("#filmsTable").append(`<tr>
      <td>${film.title}</td>
      <td>${moment(film.release_data).format("DD/MM/YYYY")}</td>
      <td>${film.director}</td>
      <td>${film.episode_id}</td>
    </tr>`);
  });
}

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}