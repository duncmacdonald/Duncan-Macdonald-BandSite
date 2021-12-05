window.onload = () => {
  //array of tour date objects
  const show = [
    {
      date: "Mon Sept 06 2021",
      venue: "Ronald Lane",
      location: "San Francisco, CA",
    },
    {
      date: "Tue Sept 21 2021",
      venue: "Pier 3 East",
      location: "San Francisco, CA",
    },
    {
      date: "Fri Oct 15 2021",
      venue: "View Lounge",
      location: "San Francisco, CA",
    },
    {
      date: "Sat Nov 06 2021",
      venue: "Hyatt Agency",
      location: "San Francisco, CA",
    },
    {
      date: "Fri Nov 26 2021",
      venue: "Moscow Center",
      location: "San Francisco, CA",
    },
    {
      date: "Wed Dec 15 2021",
      venue: "Press Club",
      location: "San Francisco, CA",
    },
  ];

  //make a "shows" section
  const page = document.querySelector("body");
  const section = document.createElement("section");
  section.classList.add("shows");
  page.insertBefore(section, document.querySelector("footer"));

  //Add an h2 to shows
  const section_title = document.createElement("h2");
  section_title.innerText = "Shows";
  section.appendChild(section_title);


  //Add a tour cards under h2
  //Tablet+ size title block
  const title_card = document.createElement("div");
  title_card.classList.add("shows__tablet-title-card")
  section.appendChild(title_card);

  const date_tablet_title = document.createElement("h4");
  date_tablet_title.innerText = "Date";
  date_tablet_title.classList.add("tablet-title");
  title_card.appendChild(date_tablet_title);


  //Venue
  const venue_tablet_title = document.createElement("h4");
  venue_tablet_title.classList.add("tablet-title");
  venue_tablet_title.innerText = "Venue";
  title_card.appendChild(venue_tablet_title);


  //Location
  const location_tablet_title = document.createElement("h4");
  location_tablet_title.innerText = "Location";
  location_tablet_title.classList.add("tablet-title");
  title_card.appendChild(location_tablet_title);


  //Button
  const button_tablet_title = document.createElement('h4');
  button_tablet_title.classList.add("tablet-title");
  title_card.appendChild(button_tablet_title);

  //For loop to add all tour details to a table
  for (let i = 0; i < show.length; i++) {
    
    //Add a row
    const card = document.createElement("div");
    card.classList.add('shows__tour-stop');
    section.appendChild(card);

    //Date
    const date_title = document.createElement("h4");
    date_title.innerText = "Date";
    card.appendChild(date_title);
    const show_date = document.createElement("p");
    show_date.innerText = show[i].date;
    show_date.classList.add('bold');
    card.appendChild(show_date);

    //Venue
    const venue_title = document.createElement("h4");
    venue_title.innerText = "Venue";
    card.appendChild(venue_title);
    const show_venue = document.createElement("p");
    show_venue.innerText = show[i].venue;
    card.appendChild(show_venue);

    //Location
    const location_title = document.createElement("h4");
    location_title.innerText = "Location";
    card.appendChild(location_title);
    const show_location = document.createElement("p");
    show_location.innerText = show[i].location;
    card.appendChild(show_location);

    //Button
    const tickets_button = document.createElement('button');
    tickets_button.innerText = "Buy Tickets";
    card.appendChild(tickets_button);
  }

  //find all tour stops so we can attach listeners
  const tourStop  = document.querySelectorAll(".shows__tour-stop");
  console.log(tourStop);

  //for each tour stop toggle assigning an "active" class when clicked 
  tourStop.forEach((stop) => {
    stop.addEventListener("click", (e) => {
      if(stop.classList.contains("active")){
        stop.classList.remove("active");
      } 
      else {
        stop.classList.add("active");
      }
      

    });
  });
};
