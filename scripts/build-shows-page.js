window.onload = () => {

  const baseURL = 'https://project-1-api.herokuapp.com';
  const apiKey = '947d7ded-9e44-4c14-a46b-126267c78fe1';

  
  getAllShowdates();

  //get an array of showdates
  function getAllShowdates (){
    axios.get(`${baseURL}/showdates?api_key=${apiKey}`)
    .then (result => drawShows(result.data))
    .catch(error => console.log(error));
  }

  function drawShows(show){
    //turn all timestamps into proper Date objects
    show.forEach(element => element.date = new Date(Number(element.date)));

    //make a "shows" section
    const page = document.querySelector("body");
    const section = document.createElement("section");
    section.classList.add("shows");
    page.insertBefore(section, document.querySelector("footer"));

    //Add an h2 to shows
    dryDomChild(section,"h2","Shows");

    //Add a tour cards under h2
    //Tablet+ size title block
    const title_card = dryDomChild(section,"div","","shows__tablet-title-card");

    //Date
    dryDomChild(title_card,"h4","Date","tablet-title")

    //Venue
    dryDomChild(title_card, "h4", "Venue", "tablet-title");

    //Location
    dryDomChild(title_card, "h4", "Location", "tablet-title");

    //Button 
    dryDomChild(title_card, "h4", ""); //Intentionally empty becuse the buttons dont have a column title

    //For loop to add all tour details to a table
    show.forEach(event => {
      
      //Add a row
      const card = dryDomChild(section,"div","","shows__tour-stop");

      //Date
      dryDomChild(card, "h4", "Date");
      dryDomChild(card, "p", event.date.toDateString(), "bold");

      //Venue
      dryDomChild(card, "h4", "Venue");
      dryDomChild(card, "p", event.place)

      //Location
      dryDomChild(card,"h4","Location");
      dryDomChild(card, "p", event.location);

      //Button
      dryDomChild(card, "button", "Buy Tickets");
    });

    //find all tour stops so we can attach listeners
    const tourStop  = document.querySelectorAll(".shows__tour-stop");

    //for each tour stop toggle assigning an "active" class when clicked 
    tourStop.forEach((stop) => {
      stop.addEventListener("click", (e) => {
        if(stop.classList.contains("active")){
          //make this one not active
          stop.classList.remove("active");
        } 
        else {
          //remove any possible active state
          tourStop.forEach(stop => stop.classList.remove("active"));
          //make this one active
          stop.classList.add("active");
        }
        

      });
    });
   }

   //"Don't Repeat Yourself" DOM append child function. Returns the child incase you need to add grandchildren.
   function dryDomChild (parentNode, newElementType, childInnerText, childClass){
    const newChild = document.createElement(newElementType);
    if(childInnerText != undefined) newChild.innerText = childInnerText;
    if(childClass != undefined) newChild.classList.add(childClass);
    parentNode.appendChild(newChild);
    return newChild;
   }
};
