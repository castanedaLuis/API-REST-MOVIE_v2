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

//OBSERVADOR

const lazyLoading = new IntersectionObserver( (entries) =>{
  entries.forEach((entry) =>{
    if(entry.isIntersecting){
      //console.log(entry);
      const url = entry.target.getAttribute('data-img')
      entry.target.setAttribute('src',url)
    }
  })
});



async function getMovieTendenciasPreview(){
    const respuesta = await fetch(`${URL}/trending/movie/day?api_key=${API_KEY}`)
    const data = await respuesta.json()
    const movies = data.results
    //console.log(movies);
    createMovies(movies, trendingMoviesPreviewList, true);
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

    createMovies(moviesTheCategory, genericSection, true);
    // const arrayNodos = []
    // genericSection.innerHTML = ''
    // moviesTheCategory.forEach(movie =>{
    //     const movieContainer = document.createElement('div')
    //     movieContainer.classList.add('movie-container')

    //     const movieImg = document.createElement('img')
    //     movieImg.classList.add('movie-img')
    //     movieImg.setAttribute('alt', movie.title)
    //     movieImg.src= `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

    //     movieContainer.appendChild(movieImg)
    //     arrayNodos.push(movieContainer)
    // })
    // genericSection.append(...arrayNodos)
}


async function getMoviesBySearch(query){
    const respuesta = await fetch(`${URL}/search/movie?query=${query}&api_key=${API_KEY}`)
    const data = await respuesta.json()
    const moviesSearch = data.results
    //console.log('moviesSearch',moviesSearch);

    createMovies(moviesSearch, genericSection, true);
    // const arrayNodos = []
    // genericSection.innerHTML = ''
    // moviesSearch.forEach(movie =>{
    //     const movieContainer = document.createElement('div')
    //     movieContainer.classList.add('movie-container')

    //     const movieImg = document.createElement('img')
    //     movieImg.classList.add('movie-img')
    //     movieImg.setAttribute('alt', movie.title)
    //     movieImg.src= `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

    //     movieContainer.appendChild(movieImg)
    //     arrayNodos.push(movieContainer)
    // })
    // genericSection.append(...arrayNodos)
}

let page = 1;

window.addEventListener('scroll',getGeneritedPageMovieTendencias)

async function getGeneritedPageMovieTendencias (){

  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  const scrollIsFinal = (scrollTop + clientHeight) >= (scrollHeight - 15)

  if(scrollIsFinal){
      page++
      const respuesta = await fetch(`${URL}/trending/movie/day?page=${page}&api_key=${API_KEY}`)
      const data = await respuesta.json()
      const movies = data.results
      createMovies(movies, genericSection, {lazyLoad: true, clean:false});
  }

   //PAGINATION

  // genericSection.removeChild(btnLoadMores)
  // const btnLoadMores = document.createElement('button')
  // btnLoadMores.textContent ='Cargar más'
  // btnLoadMores.addEventListener('click',getGeneritedPageMovieTendencias)
  // genericSection.appendChild(btnLoadMores)
}


async function getMovieTendencias(){
    const respuesta = await fetch(`${URL}/trending/movie/day?api_key=${API_KEY}`)
    const data = await respuesta.json()
    const movies = data.results

    createMovies(movies, genericSection, {lazyLoad: true, clean:true});

    // const btnLoadMores = document.createElement('button')
    // btnLoadMores.textContent ='Cargar más'
    // btnLoadMores.addEventListener('click',getGeneritedPageMovieTendencias)
    // genericSection.appendChild(btnLoadMores)


    // const arrayNodos = []
    // genericSection.innerHTML = ''
    // movies.forEach(movie =>{
    //     const movieContainer = document.createElement('div')
    //     movieContainer.classList.add('movie-container')

    //     const movieImg = document.createElement('img')
    //     movieImg.classList.add('movie-img')
    //     movieImg.setAttribute('alt', movie.title)
    //     movieImg.src= `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

    //     movieContainer.appendChild(movieImg)
    //     arrayNodos.push(movieContainer)
    // })
    // genericSection.append(...arrayNodos)
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
    headerSection.appendChild(arrowBtn)
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

function createMovies(movies, container, {lazyLoad = false, clean = true} = {}) {
    if(clean){
      container.innerHTML = ''
    }
  
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
        lazyLoad ? 'data-img' : 'src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      );
      // movieImg.setAttribute('loading','lazy')

      movieImg.addEventListener('error', () => {
        movieImg.setAttribute(
          'src',
          `https://via.placeholder.com/300x450/5c218a/ffffff?text=${movie.title}`,
        );
      })
  
        if(lazyLoad){
          lazyLoading.observe(movieImg)
        }

      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
    });
  }

async function getSimilaresMovieId(id){
    
    ///movie/${id}/similar or /movie/${id}/recommendations
    const resonse = await fetch(`${URL}/movie/${id}/similar?api_key=${API_KEY}`)
    const data = await resonse.json()
    const similares = data.results

    createMovies(similares,relatedMoviesContainer, true)
}




export { getMovieCategoriesPreview, 
    getMovieTendenciasPreview, 
    getMovieByCategory,
    getMoviesBySearch, 
    getMovieTendencias,
    getMovieById,
    getGeneritedPageMovieTendencias}


// getMovieTendenciasPreview()
// getMovieCategoriesPreview()