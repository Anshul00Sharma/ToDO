// select search input
search = document.getElementById("searchTxt");

//  adding event listner
// creating realtime search feature
search.addEventListener("input", function (e) {
  let inputVal = search.value;
  console.log("input event fired", inputVal);
  let noteCard = document.getElementsByClassName("note-card");
  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("h2")[0].innerText;
    if (cardTxt != "") {
      if (cardTxt.toLowerCase().includes(inputVal)) {
        element.style.display = "compact";
      } else {
        element.style.display = "none";
      }
    }
  });
});
