document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("projectTrack");

  if (!track) {
    console.error("projectTrack not found");
    return;
  }

  // ===== PROJECT DATA =====
  const projects = [
    {
      title: "Game Engine",
      description:
        "A 3D game engine written in C# using OpenTK and OpenGL, focusing on rendering, input handling, and core engine architecture.",
      image: "images/game-engine.png"
    },
    {
      title: "Chess App",
      description:
        "A C# chess application implementing full chess rules with a playable interface for standard games.",
      image: "images/chess-app.jpg"
    },
    {
      title: "PHP Forum",
      description:
        "A PHP-based forum web application where users can create accounts, post discussion topics, and reply to threads.",
      image: "images/php-forum.jpg"
    },
    {
      title: "Java Minesweeper",
      description:
        "A Java implementation of the classic Minesweeper game featuring grid-based logic and mine detection.",
      image: "images/java-minesweeper.jpg"
    }
  ];

  // ===== RENDER PROJECT CARDS =====
  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <img 
        src="${project.image}" 
        alt="${project.title}"
        data-title="${project.title}"
        data-description="${project.description}"
      >
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    `;

    track.appendChild(card);
  });

  // ===== MODAL LOGIC =====
  const modal = document.getElementById("projectModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalClose = document.querySelector(".modal-close");

  track.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
      modalImg.src = e.target.src;
      modalTitle.textContent = e.target.dataset.title;
      modalDesc.textContent = e.target.dataset.description;
      modal.classList.remove("hidden");
    }
  });

  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // ===== INFINITE CAROUSEL =====
  const visibleCards = window.innerWidth < 768 ? 1 : 4;
  let index = 0;

  const originalCards = Array.from(
    document.querySelectorAll(".project-card")
  );

  originalCards.slice(0, visibleCards).forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  const allCards = document.querySelectorAll(".project-card");
  const cardGap = 32; // must match CSS gap
  const cardWidth = allCards[0].offsetWidth + cardGap;

  setInterval(() => {
    index++;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    if (index === originalCards.length) {
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = "translateX(0)";
      }, 600);
    }
  }, 3500);
});
