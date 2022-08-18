function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


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

//helpers

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute("data-img");
            entry.target.setAttribute("src", url);
        }
    });
});

function createCategories(categories, container) {
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
        container.appendChild(categoriesList);

    });

}


//get movies previews

async function moviesTrendingPreview() {
    const { data } = await API("trending/movie/day");

    const containerLoad = document.querySelector(".section-trending-container");
    containerLoad.innerHTML = " ";

    const movies = data.results.slice(0, 6);
    movies.forEach(movie => {

        const trendingMoviesPreview = document.querySelector("#section-trending-preview .section-trending-container");

        const movieContainerTrending = document.createElement("div");
        movieContainerTrending.classList.add("movie-container");

        const movieContainerTrendingImage = document.createElement("img");
        movieContainerTrendingImage.classList.add("section-trending-movies");
        movieContainerTrendingImage.setAttribute("data-img", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);
        movieContainerTrendingImage.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
            location.reload();
        });

        lazyLoader.observe(movieContainerTrendingImage);

        movieContainerTrending.appendChild(movieContainerTrendingImage);
        trendingMoviesPreview.appendChild(movieContainerTrending);


    });

}

//get movies page full view

async function moviesTrendingFullView() {
    const { data } = await API("trending/movie/day");

    const moviesFull = data.results;
    maxPage = data.total_pages;
    moviesFull.forEach(movie => {

        const trendingMoviesFullView = document.querySelector("#section-trending-full-view .section-trending-container");

        const movieContainerTrendingFullView = document.createElement("div");
        movieContainerTrendingFullView.classList.add("movie-container");

        const movieContainerTrendingFullViewImage = document.createElement("img");
        movieContainerTrendingFullViewImage.classList.add("section-trending-movies");
        movieContainerTrendingFullViewImage.setAttribute("data-img", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);
        movieContainerTrendingFullViewImage.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
            location.reload();
        });

        lazyLoader.observe(movieContainerTrendingFullViewImage);

        movieContainerTrendingFullView.appendChild(movieContainerTrendingFullViewImage);
        trendingMoviesFullView.appendChild(movieContainerTrendingFullView);
    });

}

//params para infinite scroll


async function getMoreMovies() {

    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 45);

    const pageIsNotMax = page < maxPage;
    if (scrollIsBottom && pageIsNotMax) {
        page++
        const { data } = await API("trending/movie/day", {
            params: {
                page,
            },
        });


        const moviesFull = data.results;
        moviesFull.forEach(movie => {

            const trendingMoviesFullView = document.querySelector("#section-trending-full-view .section-trending-container");

            const movieContainerTrendingFullView = document.createElement("div");
            movieContainerTrendingFullView.classList.add("movie-container");

            const movieContainerTrendingFullViewImage = document.createElement("img");
            movieContainerTrendingFullViewImage.classList.add("section-trending-movies");
            movieContainerTrendingFullViewImage.setAttribute("data-img", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);
            movieContainerTrendingFullViewImage.addEventListener("click", () => {
                location.hash = "#movie=" + movie.id;
                location.reload();
            });

            lazyLoader.observe(movieContainerTrendingFullViewImage);

            movieContainerTrendingFullView.appendChild(movieContainerTrendingFullViewImage);
            trendingMoviesFullView.appendChild(movieContainerTrendingFullView);
            console.log("scroll infinito");

        });
    }
}


//categories


async function moviesCategoryPreview() {
    const { data } = await API("genre/movie/list");

    const categories = data.genres;
    categoriesPreview.innerHTML = " ";

    createCategories(categories, categoriesPreview);



    categoriesEmoji()

}


async function moviesByCategory(id) {
    const { data } = await API("discover/movie", {
        params: {
            with_genres: id,
        },
    });

    const moviesFull = data.results;
    maxPage = data.total_pages;
    moviesFull.forEach(movie => {

        const categoryMoviesFullView = document.querySelector("#section-category-full-view .section-trending-container");

        const movieContainerCategoryFullView = document.createElement("div");
        movieContainerCategoryFullView.classList.add("movie-container");

        const movieContainerCategoryFullViewImage = document.createElement("img");
        movieContainerCategoryFullViewImage.classList.add("section-trending-movies");
        movieContainerCategoryFullViewImage.setAttribute("data-img", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);
        movieContainerCategoryFullViewImage.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
            location.reload();

        });

        lazyLoader.observe(movieContainerCategoryFullViewImage);

        movieContainerCategoryFullView.appendChild(movieContainerCategoryFullViewImage);
        categoryMoviesFullView.appendChild(movieContainerCategoryFullView);


    });

}

//category infinite scroll

function getMoreMoviesByCategory(id) {

    return async function() {

        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 45);

        const pageIsNotMax = page < maxPage;
        if (scrollIsBottom && pageIsNotMax) {
            page++
            const { data } = await API("discover/movie", {
                params: {
                    with_genres: id,
                    page,
                },
            });


            const moviesFull = data.results;
            moviesFull.forEach(movie => {


                const categoryMoviesFullView = document.querySelector("#section-category-full-view .section-trending-container");

                const movieContainerCategoryFullView = document.createElement("div");
                movieContainerCategoryFullView.classList.add("movie-container");

                const movieContainerCategoryFullViewImage = document.createElement("img");
                movieContainerCategoryFullViewImage.classList.add("section-trending-movies");
                movieContainerCategoryFullViewImage.setAttribute("data-img", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);
                movieContainerCategoryFullViewImage.addEventListener("click", () => {
                    location.hash = "#movie=" + movie.id;
                    location.reload();

                });

                lazyLoader.observe(movieContainerCategoryFullViewImage);

                movieContainerCategoryFullView.appendChild(movieContainerCategoryFullViewImage);
                categoryMoviesFullView.appendChild(movieContainerCategoryFullView);

            });
        }
    }
}


//search

async function movieBySearch(query) {
    const { data } = await API("search/movie", {
        params: {
            query,
        }
    });


    const moviesFull = data.results;
    maxPage = data.total_pages;
    moviesFull.forEach(movie => {

        const searchMoviesFullView = document.querySelector("#section-trending-full-view .section-trending-container");

        const searchContainerView = document.createElement("div");
        searchContainerView.classList.add("movie-container");

        const searchContainerViewImage = document.createElement("img");
        searchContainerViewImage.classList.add("section-trending-movies");
        searchContainerViewImage.setAttribute("data-img", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);
        searchContainerViewImage.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
            location.reload();

        });

        searchContainerViewImage.addEventListener('error', () => {
            searchContainerViewImage.setAttribute(
                "src",
                "https://placesplit.sfo3.digitaloceanspaces.com/holavalle/production/fr-default-large_default.jpg"
            );
        })

        lazyLoader.observe(searchContainerViewImage);

        searchContainerView.appendChild(searchContainerViewImage);
        searchMoviesFullView.appendChild(searchContainerView);
    });

}

//search infinite scroll

function getMoreMoviesBySearch(query) {

    return async function() {

        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 45);

        const pageIsNotMax = page < maxPage;
        if (scrollIsBottom && pageIsNotMax) {
            page++
            const { data } = await API("search/movie", {
                params: {
                    query,
                    page,
                }
            });


            const moviesFull = data.results;
            moviesFull.forEach(movie => {

                const trendingMoviesFullView = document.querySelector("#section-trending-full-view .section-trending-container");

                const movieContainerTrendingFullView = document.createElement("div");
                movieContainerTrendingFullView.classList.add("movie-container");

                const movieContainerTrendingFullViewImage = document.createElement("img");
                movieContainerTrendingFullViewImage.classList.add("section-trending-movies");
                movieContainerTrendingFullViewImage.setAttribute("data-img", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);
                movieContainerTrendingFullViewImage.addEventListener("click", () => {
                    location.hash = "#movie=" + movie.id;
                    location.reload();
                });

                lazyLoader.observe(movieContainerTrendingFullViewImage);

                movieContainerTrendingFullView.appendChild(movieContainerTrendingFullViewImage);
                trendingMoviesFullView.appendChild(movieContainerTrendingFullView);
                console.log("scroll infinito");

            });
        }
    }
}


//details


async function movieById(id) {
    const { data: movie } = await API("movie/" + id);

    const movieImgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

    bgImageDetails.setAttribute("src", movieImgUrl);

    detailTitle.textContent = movie.title;
    overview.textContent = movie.overview;
    stars.textContent = parseInt(movie.vote_average);

    createCategories(movie.genres, categoryListDetails);

    similarMovie(id);
}

async function similarMovie(id) {
    const { data } = await API("movie/" + id + "/similar");
    const similarMoviesData = data.results;
    similarMoviesData.forEach(movie => {

        const similarMovieView = document.querySelector(".similar-movies");

        const similarMovieContainer = document.createElement("div");
        similarMovieContainer.classList.add("movie-container");

        const similarMovieImage = document.createElement("img");
        similarMovieImage.classList.add("section-trending-movies");
        similarMovieImage.setAttribute("data-img", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);
        similarMovieImage.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
            location.reload();
        });

        lazyLoader.observe(similarMovieImage);

        similarMovieContainer.appendChild(similarMovieImage);
        similarMovieView.appendChild(similarMovieContainer);
    });
}