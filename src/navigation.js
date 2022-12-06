import {getMovieCategoriesPreview,
         getMovieTendenciasPreview, 
         getMovieByCategory, 
         getMoviesBySearch,
         getMovieTendencias,
         getMovieById} from './main.js'

searchFormBtn.addEventListener('click',()=>{
    const valueInput = searchFormInput.value;
    location.hash=`#search=${valueInput}`
})

trendingBtn.addEventListener('click',()=>{
    location.hash='#trends'
})

arrowBtn.addEventListener('click',()=>{
    location.hash = window.history.back();
})

//Cargar la funcion navigator para verificar la URL
window.addEventListener('DOMContentLoaded', navigator, false)
//Capturar el evento hashchange para verificar que pagina mostrar
window.addEventListener('hashchange', navigator, false)

function navigator(){
    //console.log(location)

    if(location.hash.startsWith('#trends'))
    {
        trendsPage()
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        moviedetailsPage()
    }else if(location.hash.startsWith('#category=')){
        categoriesPage()
    }else{
        home()
    }
    smoothscroll()
}
function home(){
    console.log('home');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getMovieTendenciasPreview()
    getMovieCategoriesPreview()

}
function trendsPage(){
    console.log('trends');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML='Tendencias'
    getMovieTendencias()
}
function categoriesPage(){
    console.log('category');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=')
    const [categoryId, categoryName] = categoryData.split('-')

    headerCategoryTitle.innerHTML= categoryName


    getMovieByCategory(categoryId);
}
function moviedetailsPage(){
    console.log('movie');

    headerSection.classList.add('header-container--long')
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_,movieId] = location.hash.split('=')

    getMovieById(movieId)
}
function searchPage(){
    console.log('search');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=')
    getMoviesBySearch(query)

}


//Scroll to top 

function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};