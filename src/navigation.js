window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchanged", navigator, false);


function homePage() {
    moviesTrendingPreview()
    moviesCategoryPreview()
}

function trendingPage() {
    console.log("trending");
}

function searchPage() {
    console.log("search");
}

function moviesPage() {
    console.log("movies");
}

function categoriesPage() {
    console.log("categories");
}



function navigator() {

    if (location.hash.startsWith("#trending")) {
        trendingPage()

    } else if (location.hash.startsWith("#search=")) {
        searchPage()

    } else if (location.hash.startsWith("#movie=")) {
        moviesPage()

    } else if (location.hash.startsWith("#category=")) {
        categoriesPage()

    } else {
        homePage()
    }

    location.hash
}