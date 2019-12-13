
  
/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 
   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
//Note: students can opt to use this array & iterate over it to display followers or they can access the url via axios
/*
const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];
*/

//adding html class to the global scope for easy access
const mainCard = document.querySelector(".cards");

//axios call to the server to retrieve my info
axios
  .get("https://api.github.com/users/VictorSDelpiu")
  .then(res => {
    console.log(res);
    
    mainCard.appendChild(GitHubCard(res.data));
  })
  .catch(err => console.log(err));

//axios call to retrieve my followers info
axios
  .get("https://api.github.com/users/VictorSDelpiu/followers")
  .then(res => {
    console.log(res);
    res.data.forEach(user => {
      const followerCard = new GitHubCard(user);
      mainCard.appendChild(followerCard);
    });
  })
  .catch(err => console.log(err));

//github card constructor function & using the format provided create elements needed to display cards
function GitHubCard(userData) {
  //card wrapper div
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card");

  //card image
  const cardImg = document.createElement("img");
  cardImg.src = userData.avatar_url;

  //card information wrapper div
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  //user's legal name
  const cardName = document.createElement("h3");
  cardName.classList.add("name");
  cardName.textContent = userData.name;

  //user's GH username
  const cardUsername = document.createElement("p");
  cardUsername.classList.add("username");
  cardUsername.textContent = userData.login;

  //user's location
  const cardLocation = document.createElement("p");
  cardLocation.textContent = `Location: ${userData.location}`;

  //user's link to profile
  const cardProfile = document.createElement("p");
  cardProfile.textContent = "Profile:";
  //anchor tag nested inside the <p />
  const profileLink = document.createElement("a");
  profileLink.href = userData.html_url;
  profileLink.textContent = userData.html_url;
  cardProfile.appendChild(profileLink);

  //user's followers
  const cardFollowers = document.createElement("p");
  cardFollowers.textContent = `Followers: ${userData.followers}`;

  //user's following
  const cardFollowing = document.createElement("p");
  cardFollowing.textContent = `Location: ${userData.following}`;

  //user's bio
  const cardBio = document.createElement("p");
  cardBio.textContent = userData.bio;

  //append all the elements to main wrapper div & info div to create the structure of the card
  //main wrapper div appendChild - this is the main div that houses img & info
  cardWrapper.appendChild(cardImg);
  cardWrapper.appendChild(cardInfo);

  //infoDiv appendChild - this div houses all the other divs
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardUsername);
  cardInfo.appendChild(cardLocation);
  cardInfo.appendChild(cardProfile);
  cardInfo.appendChild(cardFollowers);
  cardInfo.appendChild(cardFollowing);
  cardInfo.appendChild(cardBio);

  //in the end return main card wrapper
  return cardWrapper;
}
