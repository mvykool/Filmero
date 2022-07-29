// API URL and API_KEY with axios

const API = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-type": "application/json;charset=utf-8",
    },
    params: {
        "api_key": "973a44bfebe3157e6ec593fd61a9ee99",
    },
});



//get movies previews

async function moviesTrendingPreview() {
    const { data } = await API("trending/movie/day");


    const movies = data.results.slice(0, 5);
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

//get movies page full view

async function moviesTrendingFullView() {
    const { data } = await API("trending/movie/day");


    const moviesFull = data.results;
    moviesFull.forEach(movie => {

        const trendingMoviesFullView = document.querySelector("#section-trending-full-view .section-trending-container");

        const movieContainerTrendingFullView = document.createElement("div");
        movieContainerTrendingFullView.classList.add("movie-container");

        const movieContainerTrendingFullViewImage = document.createElement("img");
        movieContainerTrendingFullViewImage.classList.add("section-trending-movies");
        movieContainerTrendingFullViewImage.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);

        movieContainerTrendingFullView.appendChild(movieContainerTrendingFullViewImage);
        trendingMoviesFullView.appendChild(movieContainerTrendingFullView);
    });

}


//categories


async function moviesCategoryPreview() {
    const { data } = await API("genre/movie/list");

    const categories = data.genres;
    categories.forEach(category => {

        const categoriesPreview = document.querySelector("#category-preview .category-preview-list");

        const categoriesList = document.createElement("li");

        const categoriesContainer = document.createElement("div");
        categoriesContainer.classList.add("category-text");

        const emoji = document.createElement("span");
        emoji.setAttribute("id", category.name);

        const categoryTitle = document.createElement("h3");
        categoryTitle.addEventListener("click", () => {
            location.hash = "#categorySearch=" + category.id + "-" + category.name;
            location.reload()
        });
        const categoryTitleText = document.createTextNode(category.name);

        //appending elements

        categoryTitle.appendChild(categoryTitleText);
        categoryTitle.appendChild(emoji);
        categoriesContainer.appendChild(categoryTitle);
        categoriesList.appendChild(categoriesContainer)
        categoriesPreview.appendChild(categoriesList);

    });

    categoriesEmoji()

}


async function moviesByCategory(id) {
    const { data } = await API("discover/movie", {
        params: {
            with_genres: id,
        },
    });

    const moviesFull = data.results;
    moviesFull.forEach(movie => {

        const categoryMoviesFullView = document.querySelector("#section-category-full-view .section-trending-container");

        const movieContainerCategoryFullView = document.createElement("div");
        movieContainerCategoryFullView.classList.add("movie-container");

        const movieContainerCategoryFullViewImage = document.createElement("img");
        movieContainerCategoryFullViewImage.classList.add("section-trending-movies");
        movieContainerCategoryFullViewImage.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);

        movieContainerCategoryFullView.appendChild(movieContainerCategoryFullViewImage);
        categoryMoviesFullView.appendChild(movieContainerCategoryFullView);


    });

}

async function getMovieBySearch(query) {
    const { data } = await API("search/movie", {
        params: {
            query,
        },
    });

    const moviesFull = data.results;
    moviesFull.forEach(movie => {

        const searchView = document.querySelector("#search-section-view .search-section");

        const searchContainerView = document.createElement("div");
        searchContainerView.classList.add("movie-container");

        const searchContainerViewImage = document.createElement("img");
        searchContainerViewImage.classList.add("section-trending-movies");
        searchContainerViewImage.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);

        searchContainerView.appendChild(searchContainerViewImage);
        searchView.appendChild(searchContainerView);


    });

}