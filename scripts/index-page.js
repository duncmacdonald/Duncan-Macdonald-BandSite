window.onload = () => {
  //preexisting comments in date order
  const comments = [
    {
      name: "Miles Acosta",
      comment:
        "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
      timestamp: new Date(2020, 11, 20),
    },
    {
      name: "Emilie Beach",
      comment:
        "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
      timestamp: new Date(2021, 0, 9),
    },
    {
      name: "Connor Walton",
      comment:
        "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
      timestamp: new Date(2021, 01, 17),
    },
  ];

  //Listen for a submit to create a new comment object
  const form = document.getElementById("newComment");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const aTimestamp = new Date();

    if (validateForm(e.target.user_name, e.target.message)) {
      //add the comment to the array of comments
      comments.push({
        name: e.target.user_name.value,
        comment: e.target.message.value,
        timestamp: aTimestamp,
        avatar: "./assets/images/Mohan-muruge.jpg",
      });

      //display the new comment
      displayComment(comments[comments.length - 1]);
      form.reset();
    }
  }); //end of Submit listener

  //display the existing comments on page load
  for (let i = 0; i < comments.length; i++) {
    displayComment(comments[i]);
  }
}; //end of window.onload

/*takes in two form elements,
 *adds or removes an error class as required
 *retruns true if validation conditions are met
 */
function validateForm(aName, aMessage) {
  const firstLast = aName.value;
  const message = aMessage.value;
  let output = true;
  if (!(firstLast.includes(" ") && firstLast.length > 3)) {
    aName.classList.add("error");
    alert("First and Last name are required to comment.");
    output = false;
  } else {
    aName.classList.remove("error");
  }

  if (message.length < 10) {
    aMessage.classList.add("error");
    alert("Message is too short.");
    output = false;
  } else {
    aMessage.classList.remove("error");
  }

  return output;
}

//Add a single comment to the screen
function displayComment(com) {
  //mockup has 2 digit date and month
  let month = String(com.timestamp.getMonth() + 1);
  if (month.length < 2) {
    month = 0 + month;
  }
  let date = String(com.timestamp.getDate());
  if (date.length < 2) {
    date = 0 + date;
  }
  const year = String(com.timestamp.getFullYear());

  const now = new Date();
  const delta = now.valueOf() - com.timestamp.valueOf();
  let timeMessage = "";

  //Add as many user friendly message states as desired
  //60000 milliseconds is a minute, 86400000 is 24 hours
  //the order the comments appear is not determined here and displayed message is only accurate enough to make humans happy 
  if (delta < 60000) {
    timeMessage = "moments ago";
  } else if (delta < 86400000 && now.getDate() === com.timestamp.getDate()) {
    timeMessage = "today";
  } else if (delta < (32 * 86400000)) {
    //it's the same function with a different denominator if you want to do weeks, months, years, etc...
    timeMessage = Math.floor((now.valueOf()-com.timestamp.valueOf())/86400000) + " days ago";
  } else if (delta < (365 * 86400000)) {
    //30 days is an approximate month
    timeMessage = Math.floor((now.valueOf()-com.timestamp.valueOf())/(30 * 86400000)) + " months ago";
  } else {
    //leaving the possibility for some comments with the styling from the mockup
    timeMessage = month + "/" + date + "/" + year;
  }

  const commentContainer = document.getElementById("conversation__comments");
  const card = document.createElement("div");
  card.classList.add("card");
  commentContainer.insertBefore(card, document.querySelector(".card"));

  if ("avatar" in com) {
    const user_image = document.createElement("img");
    user_image.setAttribute("alt", "user_avatar");
    user_image.setAttribute("src", com.avatar);
    user_image.classList.add("avatar");

    card.appendChild(user_image);
  } else {
    //if no avatar in object make a div that can be styled as a grey circle without a missing file icon
    const user_image = document.createElement("div");
    user_image.setAttribute("alt", "user_avatar");
    user_image.classList.add("avatar");
    card.appendChild(user_image);
  }

  //container for right side card content
  const rightOfCard = document.createElement("div");
  rightOfCard.classList.add("card__right");
  card.appendChild(rightOfCard);

  //flex container for name and time
  const topOfCard = document.createElement("div");
  rightOfCard.appendChild(topOfCard);

  //name
  const name = document.createElement("h4");
  name.innerText = com.name;
  topOfCard.appendChild(name);

  //time
  const time = document.createElement("div");
  //time.innerText = month + "/" + date + "/" + year;
  time.innerText = timeMessage;
  topOfCard.appendChild(time);

  //message
  const message = document.createElement("p");
  message.innerText = com.comment;
  rightOfCard.appendChild(message);
} //end of displayComment()
