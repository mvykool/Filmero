let maxPage;
let page = 1;
let infiniteScroll;

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchanged", navigator, false);
window.addEventListener("scroll", infiniteScroll)


//button to home by clicking on logo
logo.addEventListener("click", () => {
    location.hash = "#home";
    location.reload();
});


//see more and less buttons of trending section

moreMovies.addEventListener("click", () => {
    trendingSection.classList.remove("inactive");
    backButton.classList.add("inactive");
    seeLess.classList.remove("inactive");
    moreMovies.classList.add("inactive");
});

seeLess.addEventListener("click", () => {
    trendingSection.classList.add("inactive");
    backButton.classList.add("inactive");
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
    if (document.domain !== 'localhost') {
        location.hash = '#home';
    } else {}
    history.back();
    window.location.href = document.referrer;
});

//search button

searchButton.addEventListener("click", () => {
    location.hash = "#search=" + searchInput.value.split(" ").join('');
    window.location.reload();
});

searchBar.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchButton.click();
    }
});

//movie details

movieDetail.addEventListener("click", () => {
    location.hash = "#movie=";

    document.body.scrollTo(0, 0);
    window.location.reload();

});

//functions of pages

function homePage() {
    moviesTrendingPreview();
    moviesCategoryPreview();
    moviesTrendingFullView();
    window.scrollTo(0, 0);

    homeSectionTrendingPreview.classList.remove("inactive");
    categorySection.classList.add("inactive");
    trendingSection.classList.add("inactive");
    movieDetails.classList.add("inactive");
    searchSection.classList.add("inactive");
    backButton.classList.add("inactive");
    categorySearch.classList.add("inactive");
    searchTitle.classList.add("inactive");
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
    backButton.classList.remove("inactive");
    searchTitle.classList.add("inactive");

    window.scrollTo({ top: 0, behavior: 'smooth' });
    categorySearch.classList.add("inactive");
    infiniteScroll = getMoreMovies;

}

function searchPage() {
    console.log("search");

    homeSection.classList.add("inactive");
    homeSectionTrendingPreview.classList.add("inactive");
    categorySection.classList.add("inactive");
    trendingSection.classList.remove("inactive");
    trendingTitle.classList.add("inactive");
    backButton.classList.remove("inactive");
    movieDetails.classList.add("inactive");
    searchSection.classList.add("inactive");
    categorySearch.classList.add("inactive");

    const [urlBaseOfCategory, query] = location.hash.split("=");
    searchTitle.innerHTML = query;
    movieBySearch(query);
}

function moviesPage() {
    console.log("movies");

    homeSection.classList.add("inactive");
    homeSectionTrendingPreview.classList.add("inactive");
    categorySection.classList.add("inactive");
    trendingSection.classList.add("inactive");
    movieDetails.classList.remove("inactive");
    backButton.classList.remove("inactive");
    searchSection.classList.add("inactive");
    categorySearch.classList.add("inactive");

    const [urlBaseOfCategory, movieId] = location.hash.split("=");

    movieById(movieId);

}

function categoriesPage() {
    moviesCategoryPreview();
    console.log("categories");

    homeSection.classList.add("inactive");
    homeSectionTrendingPreview.classList.add("inactive");
    categorySection.classList.remove("inactive");
    backButton.classList.remove("inactive");

    trendingSection.classList.add("inactive");
    movieDetails.classList.add("inactive");
    searchSection.classList.add("inactive");
    categorySearch.classList.add("inactive");
}

function categoriesSearchPage() {
    console.log("categories");

    homeSection.classList.add("inactive");
    homeSectionTrendingPreview.classList.add("inactive");
    categorySection.classList.add("inactive");
    backButton.classList.remove("inactive");
    trendingSection.classList.add("inactive");
    movieDetails.classList.add("inactive");
    searchSection.classList.add("inactive");
    categorySearch.classList.remove("inactive");

    const [urlBaseOfCategory, categoryData] = location.hash.split("=");
    const [categoryId, categoryName] = location.hash.split("-");
    categorySearchTitle.innerHTML = categoryName;

    moviesByCategory(categoryId);



}


function navigator() {


    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (location.hash.startsWith("#trending")) {
        trendingPage()

    } else if (location.hash.startsWith("#search=")) {
        searchPage()

    } else if (location.hash.startsWith("#movie=")) {
        moviesPage()


    } else if (location.hash.startsWith("#category=")) {
        categoriesPage()

    } else if (location.hash.startsWith("#categorySearch=")) {
        categoriesSearchPage()

    } else {
        homePage()
    }

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    }

}