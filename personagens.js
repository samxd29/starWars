$('#selectPersonagens').on('change', async () => {
    // limpar dados da tabela a cada change
    $("#filmsTablePersonagens tr").each(function(i, v){
        if (i>0)
            $(this).remove()
    })
    // pega url do personagem selecionado
    const url = $('#selectPersonagens').val()
    // recuperar os detalhes de um personagem
    const response = await apiGetByUrl(url)
    // navager na lista de filmes deste personagem
    for(const urlFilm of response.data.films) {
        apiGetByUrl(urlFilm).then( (response) => {
            //pega dados de um filme
            const film = response.data
            console.log(film)
            preencherTabelaFilmes('#filmsTablePersonagens', [film])
        })
    }
})

$('#personagensMenu').on('click', async () => {
    $('#divPrincipal').removeClass('table')
    $('#divPrincipal').addClass('tableHidden')
    $('#divPersonagens').removeClass('tableHidden')
    $('#divPersonagens').addClass('table')

    const response = await swapiGet('people')
    const data = response.data
    const results = data.results
    for(const personagem of results) {
        $('#selectPersonagens').append($('<option>', {
            value: personagem.url,
            text: personagem.name
        }))
    }
})