async function searchMovie() {
    let query = document.getElementById("searchInput").value.trim();

    if (query === "") {
        document.getElementById("results").innerHTML = "<h3>Enter a movie name</h3>";
        return;
    }

    let apiKey = "8e150b59";
    let url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h3>Loading...</h3>";

    try {
        let response = await fetch(url);
        let data = await response.json();

        console.log(data); // Debug

        if (data.Response === "False") {
            resultsDiv.innerHTML = "<h3>No movies found 😢</h3>";
            return;
        }

        displayMovies(data.Search);

    } catch (error) {
        console.log(error);
        resultsDiv.innerHTML = "<h3>Error fetching data</h3>";
    }
}

function displayMovies(movies) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    movies.forEach(movie => {
        let div = document.createElement("div");
        div.classList.add("movie");

        div.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}">
            <h4>${movie.Title}</h4>
            <p>${movie.Year}</p>
        `;

        resultsDiv.appendChild(div);
    });
}

// 🔥 ENTER key support
document.getElementById("searchInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchMovie();
    }
});