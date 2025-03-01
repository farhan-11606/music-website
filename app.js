document.addEventListener("DOMContentLoaded", () => {
  const { artists, songs } = window;

  console.log({ artists, songs }, "App Data"); 

  // Create artist buttons in the menu dynamically
  const menu = document.querySelector("#menu");

  artists.forEach((artist) => {
    const button = document.createElement("button");
    button.textContent = artist.name;
    button.addEventListener("click", () => {
      displayArtistDetails(artist);
    });
    menu.appendChild(button);
  });

  // Function to display artist details and their songs
  function displayArtistDetails(artist) {
    // Update the selected artist heading
    const selectedArtist = document.querySelector("#selected-artist");
    selectedArtist.textContent = artist.name;

    // Create and display artist links
    const linksContainer = document.createElement("div");
    artist.links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.textContent = link.displayName;
      anchor.target = "_blank";
      anchor.classList.add("artist-link");
      linksContainer.appendChild(anchor);
    });

    // Clear previous artist links and append the new ones
    selectedArtist.appendChild(linksContainer);

    
    const songCardsContainer = document.querySelector("#song-cards-container");
    songCardsContainer.innerHTML = ""; 

    
    const artistSongs = songs.filter((song) => song.artistId === artist.artistId && !song.explicit);

    artistSongs.forEach((song) => {
      // Create and display the song card
      const card = createSongCard(song);
      songCardsContainer.appendChild(card);
    });
  }

  
  if (artists.length > 0) {
    displayArtistDetails(artists[0]);
  }

  // Function to create a song card
  function createSongCard(song) {
    const card = document.createElement("div");
    card.classList.add("card");

    const songImg = document.createElement("img");
    songImg.src = song.imageUrl;
    songImg.classList.add("card-image");

  // Check if the image is loading successfully
    songImg.onerror = () => {
      console.error("Image failed to load:", song.imageUrl);
      songImg.src = "default-image.jpg"; 
    };

    const songTitle = document.createElement("h3");
    songTitle.classList.add("song-title");
    songTitle.textContent = song.title; 

    const songYear = document.createElement("time");
    songYear.classList.add("song-year");
    songYear.textContent = song.year;

    const songDuration = document.createElement("span");
    songDuration.classList.add("song-duration");
    songDuration.textContent = song.duration;

    card.appendChild(songImg);
    card.appendChild(songTitle);
    card.appendChild(songYear);
    card.appendChild(songDuration);

    // Click handler for opening song URL and play
    card.querySelector(".card-image").addEventListener("click", () => {
      window.open(song.link, "_blank"); 
    });

    return card;
  }
});
