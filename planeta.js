$('#selectPlanetas').on('change', async () => {
    // limpar dados da tabela a cada change
    $("#preencherTabelaPlanetas tr").each(function(i, v){
        if (i>0)
            $(this).remove()
    })
    // pega url do planeta selecionado
    const url = $('#selectPlanetas').val()
    // recuperar os detalhes de um planeta
    const response = await apiGetByUrl(url)
    // navager na lista de planetas 
    for(const urlPlanets of response.data.results) {
        apiGetByUrl(urlPlanets).then( (response) => {
            //pega dados de um filme
            const Planets = response.data
            console.log(Planets);
            preencherTabelaPlanetas('#planetaTable', [Planets])
        })
    }
})

$('#planetsMenu').on('click', async () => {
    $('#divPrincipal').removeClass('table')
    $('#divPrincipal').addClass('tableHidden')
    $('#divPlanets').removeClass('tableHidden')
    $('#divPlanets').addClass('table')

    const response = await swapiGet('planets')
    const data = response.data
    const results = data.results
    for(const planetas of results) {
        $('#selectPlanetas').append($('<option>', {
            value: planetas.url,
            text: planetas.name
        }))
    }
})