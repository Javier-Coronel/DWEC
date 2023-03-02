const API_KEY = "a0df71893a3604debd1118245c6b4e8b";
const TRENDING_MOVIES_URL = "trending/movie/week";
const API_BASE_URL = `https://api.themoviedb.org/3/${TRENDING_MOVIES_URL}?api_key=${API_KEY}`;
const favoriteMovies = []
var xhr;
var movies;
const trazas = document.getElementById("trazas")
window.onload = () => {
    document.getElementById("ObtenerPelis").addEventListener("click", obtenerPeliculas);
    document.getElementById("guardarfav").addEventListener("click", guardarFav);
    document.getElementById("obtenerfav").addEventListener("click", obtenerFav);
    document.getElementById("limpiar").addEventListener("click", limpiar);
}
function obtenerPeliculas() {
    añadirTraza("Obtener peliculas.")
    xhr = new XMLHttpRequest;
    xhr.onreadystatechange = () => comprobar(true);
    xhr.open('GET', API_BASE_URL);
    xhr.send()

}
function comprobar(a) {
    if (xhr.status === 200 && xhr.readyState === 4) {
        if (a) movies = JSON.parse(xhr.responseText).results;
        else movies = JSON.parse(xhr.response);
        console.log(movies)
        mostrarPelis(movies)
    }
}
function mostrarPelis(array) {
    añadirTraza("Mostrar peliculas.")
    let divPeliculas = document.getElementById("peliculas")
    divPeliculas.innerHTML = ""
    array.forEach(movie => {
        let peli = document.createElement("card")
        let poster = document.createElement("img")
        poster.setAttribute("src", `https://image.tmdb.org/t/p/w500/${movie.poster_path}`)
        peli.appendChild(poster)
        let titulo = document.createElement("h1")
        titulo.innerText = movie.original_title;
        peli.appendChild(titulo)
        let heart = document.createElement("img")
        heart.setAttribute("src", "heart_border.png")
        heart.onclick = () => {
            if (heart.getAttribute("src") === "heart_border.png") {
                favoriteMovies.push(movie);
                heart.setAttribute("src", "heart_filled.png")
                console.log(movie);
            } else {
                console.log(favoriteMovies.splice(favoriteMovies.indexOf(movie), 1))
                heart.setAttribute("src", "heart_border.png")
            }
            console.log(id)
        }
        peli.appendChild(heart)
        let overview = document.createElement("p")
        overview.innerText = movie.overview;
        peli.appendChild(overview)
        let id = document.createElement("p")
        id.innerText = movie.id;
        peli.appendChild(id)
        let originalLanguage = document.createElement("p")
        originalLanguage.innerText = movie.original_language;
        peli.appendChild(originalLanguage)
        let release_date = document.createElement("p")
        release_date.innerText = movie.release_date;
        peli.appendChild(release_date)
        let vote_average = document.createElement("p")
        vote_average.innerText = movie.vote_average;
        peli.appendChild(vote_average)


        peli.appendChild(document.createElement("hr"))
        divPeliculas.appendChild(peli)
    });
}
function guardarFav() {
    añadirTraza("Guardar peliculas favoritas.");
    let array = []
    favoriteMovies.forEach((a) => {
        array.push({
            id: a.id,
            original_title: a.original_title,
            overview: a.overview,
            original_language: a.original_language,
            release_date: a.release_date,
            vote_average: a.vote_average,
            poster_path: a.poster_path
        })
    })
    fetch("save_movies.php", {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(favoriteMovies)
    }).then(results => { if (results.ok) console.log(results.status) })
}
function obtenerFav() {
    añadirTraza("Recuperar peliculas favoritas.");
    xhr = new XMLHttpRequest;
    xhr.onreadystatechange = () => comprobar(false)
    xhr.open('GET', "get_favs.php");
    xhr.send()
}
function limpiar() {
    añadirTraza("Limpiar peliculas.")
    let divPeliculas = document.getElementById("peliculas")
    divPeliculas.innerHTML = ""
}
function añadirTraza(traza) {
    if (trazas.innerHTML === "") {
        trazas.innerHTML = "<hr>"
    }
    trazas.innerHTML = trazas.innerHTML + `<p>${traza}</p>`
}