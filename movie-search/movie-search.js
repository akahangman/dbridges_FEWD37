var searched = false;
// Attach an event listener to the form submit (using jQuery)
$("#movie-search-form").submit(formSubmitted);

// Handle the form submission: go to OMDB and get results
function formSubmitted(event) {
  event.preventDefault();
  var ulElement = document.getElementById("movies");
      var counter = (ulElement.childNodes.length-2);
      console.log("I ams the value of the counter " + counter);
      if(searched==true){
        for (var i = 0; i <= counter; i++) {
            var child = document.querySelector(".movie");
            var container = child.parentNode;
            container.removeChild(child);
          }
      }
  var url = "http://omdbapi.com/?s=" + $("#query").val();
  $.get(url, resultsReceived);
}

function resultsReceived(results) {
  var formElement = document.getElementById("movie-search-form");
  formElement.reset()
  var placeHolder = document.querySelector("input");
  placeHolder.placeholder.clear;
  placeHolder.placeholder = "Movie Title";
  console.log(placeHolder.placeholder);
  var list = document.querySelector("#movies");
  for (var i = 0; i < results["Search"].length; i++) {

      var movieTitle = results["Search"][i]["Title"];
      var movieID = results["Search"][i]["imdbID"];
      var movieRelease = results["Search"][i]["Year"];
      var moviePoster = results["Search"][i]["Poster"];


      var newLi = document.createElement('li');
      newLi.className= "movie"
      list.appendChild(newLi);


      var newPoster = document.createElement("img");
      newPoster.setAttribute("src", moviePoster);
      newLi.appendChild(newPoster);


      var titleDiv = document.createElement("div");
      titleDiv.className = "movie-title";
      newLi.appendChild(titleDiv);

      var yearDiv = document.createElement("div");
      yearDiv.className = "movie-release-date";
      newLi.appendChild(yearDiv);

      var aTag = document.createElement('a');
      aTag.setAttribute('href',"http://www.imdb.com/title/"+ movieID);
      aTag.textContent = movieTitle;
      titleDiv.appendChild(aTag);

      var rYear = document.createElement('p');
      rYear.textContent = movieRelease;
      yearDiv.appendChild(rYear);

      searched=true;
      }

}
