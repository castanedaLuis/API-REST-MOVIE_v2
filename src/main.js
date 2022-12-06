import { API_KEY } from "./secrets.js";

//TODO alternativa al fetch --> creamos una instancia de axios
// const api = axios.create({
//     baseURL: 'https://api.themoviedb.org/3/',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     params: {
//       'api_key': API_KEY,
//     },
//   });

// const { data } = await api('trending/movie/day');
// const movies = data.results;
// console.log(movies)

const URL = 'https://api.themoviedb.org/3'


async function getMovieTendenciasPreview(){
    const respuesta = await fetch(`${URL}/trending/movie/day?api_key=${API_KEY}`)
    const data = await respuesta.json()
    const movies = data.results
    //console.log(movies);

    const arrayNodos = []
    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
    trendingPreviewMoviesContainer.innerHTML = ''
    movies.forEach(movie =>{
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        movieContainer.addEventListener('click',() =>{
            location.hash = `#movie=${movie.id}`
        })

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.src= `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

        movieContainer.appendChild(movieImg)
        arrayNodos.push(movieContainer)
    })
    trendingPreviewMoviesContainer.append(...arrayNodos)
}

async function getMovieCategoriesPreview(){
    const respuesta = await fetch(`${URL}/genre/movie/list?api_key=${API_KEY}`)
    const data = await respuesta.json()
    const categories = data.genres
    //console.log(categories);

    const arrayNodos = []
    const previewCategoriesConteiner = document.querySelector('#categoriesPreview .categoriesPreview-list')
    previewCategoriesConteiner.innerHTML = ""

    categories.forEach(category =>{
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title')
        categoryTitle.setAttribute('id', 'id'+category.id)
        categoryTitle.addEventListener('click', ()=>{
            location.hash =`#category=${category.id}-${category.name}`
        })

        const categoryTitleText = document.createTextNode(category.name)
        
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        arrayNodos.push(categoryContainer)
    })
    previewCategoriesConteiner.append(...arrayNodos)
}

async function getMovieByCategory(id){
    const respuesta = await fetch(`${URL}/discover/movie?with_genres=${id}&api_key=${API_KEY}`)
    const data = await respuesta.json()
    const moviesTheCategory = data.results
    //console.log('idCategory',moviesTheCategory);

    const arrayNodos = []
    genericSection.innerHTML = ''
    moviesTheCategory.forEach(movie =>{
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.src= `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

        movieContainer.appendChild(movieImg)
        arrayNodos.push(movieContainer)
    })
    genericSection.append(...arrayNodos)
}


async function getMoviesBySearch(query){
    const respuesta = await fetch(`${URL}/search/movie?query=${query}&api_key=${API_KEY}`)
    const data = await respuesta.json()
    const moviesSearch = data.results
    //console.log('moviesSearch',moviesSearch);

    const arrayNodos = []
    genericSection.innerHTML = ''
    moviesSearch.forEach(movie =>{
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.src= `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

        movieContainer.appendChild(movieImg)
        arrayNodos.push(movieContainer)
    })
    genericSection.append(...arrayNodos)
}


async function getMovieTendencias(){
    const respuesta = await fetch(`${URL}/trending/movie/day?api_key=${API_KEY}`)
    const data = await respuesta.json()
    const movies = data.results
    console.log(movies);

    const arrayNodos = []
    genericSection.innerHTML = ''
    movies.forEach(movie =>{
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.src= `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

        movieContainer.appendChild(movieImg)
        arrayNodos.push(movieContainer)
    })
    genericSection.append(...arrayNodos)
}

function createCategories(categories, container) {
    container.innerHTML = "";
  
    categories.forEach(category => {  
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');
  
      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      categoryTitle.setAttribute('id', 'id' + category.id);
      categoryTitle.addEventListener('click', () => {
        location.hash = `#category=${category.id}-${category.name}`;
      });
      const categoryTitleText = document.createTextNode(category.name);
  
      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
      container.appendChild(categoryContainer);
    });
  }

async function getMovieById(id){
    const respuesta = await fetch(`${URL}/movie/${id}?api_key=${API_KEY}`)
    const movie = await respuesta.json()

    headerSection.innerHTML = ''
    const imgMovieHeader = document.createElement('img')
    imgMovieHeader.src='https://image.tmdb.org/t/p/w500' + movie.poster_path;
    imgMovieHeader.classList.add('img-movie')
    headerSection.appendChild(imgMovieHeader)


    imgMovieHeader.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;

    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average

    createCategories(movie.genres,movieDetailCategoriesList)
    getSimilaresMovieId(movie.id)

}

function createMovies(movies, container) {
    container.innerHTML = '';
  
    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
      movieContainer.addEventListener('click', () => {
        location.hash = '#movie=' + movie.id;
      });
  
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute(
        'src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      );
  
      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
    });
  }

async function getSimilaresMovieId(id){
    
    ///movie/${id}/similar or /movie/${id}/recommendations
    const resonse = await fetch(`${URL}/movie/${id}/similar?api_key=${API_KEY}`)
    const data = await resonse.json()
    const similares = data.results

    createMovies(similares,relatedMoviesContainer)
}




export { getMovieCategoriesPreview, getMovieTendenciasPreview, getMovieByCategory,getMoviesBySearch, getMovieTendencias,getMovieById}


// getMovieTendenciasPreview()
// getMovieCategoriesPreview()