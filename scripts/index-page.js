window.onload = () => {
  const baseURL = "https://project-1-api.herokuapp.com";
  const apiKey = "947d7ded-9e44-4c14-a46b-126267c78fe1";

  //Async draw the comments once retrieved from the server
  getAllComments();

  //get an array of comment objects from the server
  function getAllComments() {
    axios
      .get(`${baseURL}/comments?api_key=${apiKey}`)
      .then((result) => {
        const serverComments = result.data;

        //For some reason the default comments are stored in reverse timestamp order and the POST method adds the newest comments to the end of the array
        //This locally corrects that mistake. All server comments are sorted into a logical order so new comments can be added to the end of the array.
        serverComments.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });

        serverComments.forEach((element) => {
          // comments.push(element);
          displayComment(element);
        });
      })
      .catch((error) => console.log(error));
  }

  //Submit a comment to server
  function submitComment(name, comment) {
    const commentObj = {name: name, comment: comment,};
    const header = { "Content-Type": "application/json" };

    axios
      .post(`${baseURL}/comments?api_key=${apiKey}`, commentObj, header)
      .then((result) => {
        let tempObject = result.data;
        //add an avatar to match sprint-2 design
        tempObject.avatar = "./assets/images/Mohan-muruge.jpg";

        //display the new comment
        displayComment(tempObject)       
      });
  }

  //Like a comment
  function likeCommentByID(id) {
    axios
      .put(`${baseURL}/comments/${id}/like?api_key=${apiKey}`)
      .then((result) => {
        const commentLikes = document.querySelector(`#c${id} .like-count`);
        commentLikes.innerText = result.data.likes; //update the like counter within the specified comment id
      })
      .catch((error) => console.log(error));
  }

  //Delete a comment
  function deleteCommentByID(id) {
    axios
      .delete(`${baseURL}/comments/${id}?api_key=${apiKey}`)
      .then((result) => {
        const cardToDelete = document.querySelector(`#c${id}`);
        cardToDelete.remove();
      })
      .catch((error) => console.log(error));
  }

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
    let timestamp = new Date(com.timestamp);
    let month = String(timestamp.getMonth() + 1);
    if (month.length < 2) {
      month = 0 + month;
    }
    let date = String(timestamp.getDate());
    if (date.length < 2) {
      date = 0 + date;
    }
    const year = String(timestamp.getFullYear());

    const now = new Date();
    const delta = now.valueOf() - timestamp.valueOf();
    let timeMessage = "";

    //Add as many user friendly message states as desired
    //60000 milliseconds is a minute, 86400000 is 24 hours
    //the order the comments appear is not determined here and displayed message is only accurate enough to make humans happy
    if (delta < 60000) {
      timeMessage = "moments ago";
    } else if (delta < 86400000 && now.getDate() === timestamp.getDate()) {
      timeMessage = "today";
    } else if (delta < 32 * 86400000) {
      //it's the same function with a different denominator if you want to do weeks, months, years, etc...
      timeMessage =
        Math.floor((now.valueOf() - timestamp.valueOf()) / 86400000) +
        " days ago";
    } else if (delta < 365 * 86400000) {
      //30 days is an approximate month
      timeMessage =
        Math.floor((now.valueOf() - timestamp.valueOf()) / (30 * 86400000)) +
        " months ago";
    } else {
      //leaving the possibility for some comments with the styling from the mockup
      timeMessage = month + "/" + date + "/" + year;
    }

    const commentContainer = document.getElementById("conversation__comments");
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = "c" + com.id; //used by like/delete by id methods, css selectors require a leading letter
    commentContainer.insertBefore(card, document.querySelector(".card"));

    
    if ("avatar" in com) {
      //if comment object has an avatar image, display it
      const user_image = dryDomChild(card, "img", "", "avatar");
      user_image.setAttribute("alt", "user_avatar");
      user_image.setAttribute("src", com.avatar);

    } else {
      //if no avatar in object make a div that can be styled as a grey circle without a missing file icon
      const user_image = dryDomChild(card, "div", "", "avatar");
      user_image.setAttribute("alt", "user_avatar");
    }

    //container for right side card content
    const rightOfCard = dryDomChild(card, "div", "", "card__right");

    //flex container for name and time
    const topOfCard = dryDomChild(rightOfCard, "div");

    //name
    dryDomChild(topOfCard, "h4", com.name);

    //time
    dryDomChild(topOfCard, "div", timeMessage);

    //message
    dryDomChild(rightOfCard, "p", com.comment);

    //container for like & delete buttons
    let bottomOfCard = dryDomChild(rightOfCard,"div");

    //like button
    let like = dryDomChild(bottomOfCard,"img","","little-button"
    );
    like.setAttribute("src", "./assets/icons/icon-like.svg");
    like.setAttribute("alt", "like");

    //number of likes
    dryDomChild(bottomOfCard, "p", com.likes, "like-count");

    //delete button
    let del = dryDomChild(bottomOfCard, "img", "", "little-button");
    del.setAttribute("src", "./assets/icons/icon-delete.svg");
    del.setAttribute("alt", "delete");

    //Limit user to 1 like per comment per page visit by removing listener after being clicked
    const likeFunction = () => {
      likeCommentByID(com.id);
      like.removeEventListener("click", likeFunction);
    }

    //Like buton listener
    like.addEventListener("click", likeFunction);

    //Delete button listener
    del.addEventListener("click", () => {
      deleteCommentByID(com.id);
    });
  } //end of displayComment

  //"Don't Repeat Yourself" DOM append child function. Returns the child incase you need to add grandchildren.
  function dryDomChild(parentNode, newElementType, childInnerText, childClass) {
    const newChild = document.createElement(newElementType);
    if (childInnerText != undefined) newChild.innerText = childInnerText;
    if (childClass != undefined) newChild.classList.add(childClass);
    parentNode.appendChild(newChild);
    return newChild;
  }

   //Listen for a submit to create a new comment object
   const form = document.getElementById("newComment");
   form.addEventListener("submit", (e) => {
     e.preventDefault();
     const aTimestamp = new Date();
 
     if (validateForm(e.target.user_name, e.target.message)) {
       //If a comment has been validated submit it to the server and then draw it 
       submitComment(e.target.user_name.value, e.target.message.value);

       form.reset();
     }
   }); //end of Submit listener
   
}; //end of window.onload