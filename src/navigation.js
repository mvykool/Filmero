window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchanged", navigator, false);

//see more and less buttons of trending section

moreMovies.addEventListener("click", () => {
    trendingSection.classList.remove("inactive");
    backButton.classList.add("inactive");
    seeLess.classList.remove("inactive");
    moreMovies.classList.add("inactive");
});

seeLess.addEventListener("click", () => {
    trendingSection.classList.add("inactive");
    backButton.classList.remove("inactive");
    seeLess.classList.add("inactive");
    moreMovies.classList.remove("inactive");
});

//side menu on mobile

openSideMenu.addEventListener("click", () => {
    sideMenu.classList.remove("inactive");

});

closeSideMenu.addEventListener("click", () => {
    sideMenu.classList.add("inactive");

});


trendingFromSideMenu.addEventListener("click", () => {
    location.hash = "#trending";
    window.location.reload();
});

categoryFromSideMenu.addEventListener("click", () => {
    location.hash = "#category=";
    window.location.reload();
});

homeFromSideMenu.addEventListener("click", () => {
    location.hash = homePage();
    window.location.reload();
});

//back button

backButton.addEventListener("click", () => {
    window.location.href = document.referrer;
});

//search button

searchButton.addEventListener("click", () => {
    location.hash = "#search=";
    window.location.reload();
});

//movie details

movieDetail.addEventListener("click", () => {
    location.hash = "#movie=";
    window.location.reload();
});

//functions of pages

function homePage() {
    moviesTrendingPreview();
    moviesCategoryPreview();
    moviesTrendingFullView();

    categorySection.classList.add("inactive");
    trendingSection.classList.add("inactive");
    movieDetails.classList.add("inactive");
    searchSection.classList.add("inactive");
    backButton.classList.add("inactive");
}

function trendingPage() {
    moviesTrendingFullView();
    console.log("trending");

    homeSection.classList.add("inactive");
    homeSectionTrendingPreview.classList.add("inactive");
    categorySection.classList.add("inactive");
    trendingSection.classList.remove("inactive");
    movieDetails.classList.add("inactive");
    searchSection.classList.add("inactive");
}

function searchPage() {
    console.log("search");

    homeSection.classList.add("inactive");
    homeSectionTrendingPreview.classList.add("inactive");
    categorySection.classList.add("inactive");
    trendingSection.classList.add("inactive");
    movieDetails.classList.add("inactive");
    searchSection.classList.remove("inactive");
}

function moviesPage() {
    console.log("movies");

    homeSection.classList.add("inactive");
    homeSectionTrendingPreview.classList.add("inactive");
    categorySection.classList.add("inactive");
    trendingSection.classList.add("inactive");
    movieDetails.classList.remove("inactive");
    searchSection.classList.add("inactive");
}

function categoriesPage() {
    moviesCategoryPreview();
    console.log("categories");

    homeSection.classList.add("inactive");
    homeSectionTrendingPreview.classList.add("inactive");
    categorySection.classList.remove("inactive");
    trendingSection.classList.add("inactive");
    movieDetails.classList.add("inactive");
    searchSection.classList.add("inactive");
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