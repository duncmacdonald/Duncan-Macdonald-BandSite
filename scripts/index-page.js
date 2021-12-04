window.onload = () => {
  const comments = [
    {
      name: "Connor Walton",
      comment:
        "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
      timestamp: new Date(2021, 01, 17),
    },
    {
      name: "Emilie Beach",
      comment:
        "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
      timestamp: new Date(2021, 0, 9),
    },
    {
      name: "Miles Acosta",
      comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
      timestamp: new Date(2020, 11, 20) //"2020-12-20"
        ,
    },
  ];

  function renderComments() {
    
    //dom get name, comment, photo
    //const aName =
    //const aComment =
    //const aPhoto =

    const commentContainer = document.getElementById('comments');
    commentContainer.querySelectorAll('div').forEach(i => i.remove());



    for(let i=0; i<comments.length; i++)
    {
        //mockup has 2 digit date and month
        let month = String(comments[i].timestamp.getMonth()+1);
        if(month.length<2){
            month = 0 + month;
        }
        let date = String(comments[i].timestamp.getDate());
        if(date.length<2){
            date = 0 + date;
        }
        const year = String(comments[i].timestamp.getFullYear());
        
        const card = document.createElement('div');
        card.setAttribute("class", "card");
        commentContainer.appendChild(card);

        const topOfCard = document.createElement('div');
        card.appendChild(topOfCard);

        const name = document.createElement('h4');
        name.innerText = comments[i].name;
        topOfCard.appendChild(name);

        const time = document.createElement('div');
        time.innerText = month + "/" + date + "/" + year;
        topOfCard.appendChild(time);

        const comment = document.createElement('p');
        comment.innerText = comments[i].comment;
        card.appendChild(comment);



        
    }
    
  }

  const form = document.getElementById("newComment");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const aTimestamp = new Date();
    //const date = aTimestamp.getDate();
    comments.push({name: e.target.user_name.value, comment: e.target.message.value, timestamp: aTimestamp});
    //console.log(e.target.message.value);
    console.log(comments);
    
    renderComments();

  });


  renderComments();
};
