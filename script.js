const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const artistName = document.getElementById('artist-name');
const artistImage = document.getElementById('artist-img');

function requestApi(searchTerm) {
    const url = `http://localhost:5500/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => displayResults(result))
        .catch((error) => {
            console.error('Error fetching data:', error);
            // Lidar com o erro de alguma maneira, ex: exibindo uma mensagem ao usuário
        });
}

function displayResults(result) {
    // Limpar resultados anteriores
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.add('hidden');

    // Verificar se há resultados
    if (result.length > 0) {
        // Mostrar resultados
        resultArtist.classList.remove('hidden');

        // Limpar resultados anteriores
        artistName.innerText = '';
        artistImage.src = '';

        // Mostrar novos resultados
        result.forEach(element => {
            const newArtistName = document.createElement('div');
            newArtistName.innerText = element.name;
            resultArtist.appendChild(newArtistName);

            const newArtistImage = document.createElement('img');
            newArtistImage.src = element.urlImg;
            resultArtist.appendChild(newArtistImage);
        });
    } else {
        // Se não houver resultados, ocultar a seção de resultados de artistas
        resultArtist.classList.add('hidden');
    }
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        // Se o campo de pesquisa estiver vazio, ocultar a seção de resultados de artistas
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    // Realizar a pesquisa e exibir os resultados
    requestApi(searchTerm);
});
