window.onload = () => {
  //preexisting comments in date order
  const comments = [
    {
      name: "Miles Acosta",
      comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
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

  function displayComment(com){
    
    //mockup has 2 digit date and month
    let month = String(com.timestamp.getMonth()+1);
    if(month.length<2){
      month = 0 + month;
    }
    let date = String(com.timestamp.getDate());
    if(date.length<2){
      date = 0 + date;
    }
    const year = String(com.timestamp.getFullYear());
    

    const commentContainer = document.getElementById('conversation__comments');
    const card = document.createElement('div');
    card.setAttribute("class", "card");
    commentContainer.insertBefore(card, document.querySelector('.card'));

    if("avatar" in com) {
      const user_image = document.createElement('img');
      user_image.setAttribute("alt", "user_avatar");
      user_image.setAttribute("class", "avatar");
      user_image.setAttribute("src", com.avatar);
      card.appendChild(user_image);
    } else{ //if no image in object make a div that can be a grey circle without a missing file icon
      const user_image = document.createElement('div');
      user_image.setAttribute("alt", "user_avatar");
      user_image.setAttribute("class", "avatar");
      card.appendChild(user_image);
    }

    //container for right side card content
    const rightOfCard = document.createElement('div');
    rightOfCard.setAttribute("class", "card__right");
    card.appendChild(rightOfCard);

    //flex container for name and time
    const topOfCard = document.createElement('div');
    rightOfCard.appendChild(topOfCard);

    //name
    const name = document.createElement('h4');
    name.innerText = com.name;
    topOfCard.appendChild(name);

    //time
    const time = document.createElement('div');
    time.innerText = month + "/" + date + "/" + year;
    topOfCard.appendChild(time);

    const message = document.createElement('p');
    message.innerText = com.comment;
    rightOfCard.appendChild(message);
  } 


  const form = document.getElementById("newComment");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const aTimestamp = new Date();
    comments.push({name: e.target.user_name.value, comment: e.target.message.value, timestamp: aTimestamp, avatar: "./assets/images/Mohan-muruge.jpg"});
    
    displayComment(comments[comments.length - 1]);
    form.reset();
    
  });


  for(let i=0; i<comments.length; i++)
  {
    displayComment(comments[i]);  
  }
};
