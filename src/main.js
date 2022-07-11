// API URL and API_KEY

const APIUrl = "https://api.themoviedb.org/3/";
const API_KEY = "973a44bfebe3157e6ec593fd61a9ee99";

//get movies previews

async function moviesTrendingPreview() {
    const res = await fetch(APIUrl + "trending/movie/day?api_key=" + API_KEY);
    const data = await res.json();

    const movies = data.results;
    movies.forEach(movie => {

        const trendingMoviesPreview = document.querySelector("#section-trending-preview .section-trending-container");

        const movieContainerTrending = document.createElement("div");
        movieContainerTrending.classList.add("movie-container");

        const movieContainerTrendingImage = document.createElement("img");
        movieContainerTrendingImage.classList.add("section-trending-movies");
        movieContainerTrendingImage.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);

        movieContainerTrending.appendChild(movieContainerTrendingImage);
        trendingMoviesPreview.appendChild(movieContainerTrending);


    });

}

//categories

async function moviesCategoryPreview() {
    const res = await fetch(APIUrl + "genre/movie/list?api_key=" + API_KEY);
    const data = await res.json();

    const categories = data.genres;
    categories.forEach(category => {

        const categoriesPreview = document.querySelector("#category-preview .category-preview-list");

        const categoriesList = document.createElement("li");

        const categoriesContainer = document.createElement("div");
        categoriesContainer.classList.add("category-text");

        const categoryTitle = document.createElement("h3");
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoriesContainer.appendChild(categoryTitle);
        categoriesList.appendChild(categoriesContainer)
        categoriesPreview.appendChild(categoriesList);
    });

}

moviesTrendingPreview()
moviesCategoryPreview()