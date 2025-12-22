document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("projectTrack");

  if (!track) return;

  const projects = [
    {
      title: "Game Engine",
      description: "Custom-built game engine focusing on core systems and rendering.",
      image: "images/game-engine.png"
    },
    {
      title: "Chess App",
      description: "Chess application implementing full game rules and logic and a gui.",
      image: "images/chess-app.png"
    },
    {
      title: "PHP Forum",
      description: "Forum system built using PHP with authentication and posts.",
      image: "images/php-forum.png"
    },
    {
      title: "Java Minesweeper",
      description: "Classic Minesweeper game built in Java with GUI.",
      image: "images/java-minesweeper.png"
    }
  ];

  // ===== Render Cards =====
  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" data-title="${project.title}" data-description="${project.description}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    `;

    track.appendChild(card);
  });

  // ===== Modal Logic =====
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

  // ===== Infinite Carousel =====
  const visibleCards = window.innerWidth < 768 ? 1 : 4;
  let index = 0;

  const originalCards = Array.from(
    document.querySelectorAll(".project-card")
  );

  originalCards.slice(0, visibleCards).forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  const allCards = document.querySelectorAll(".project-card");
  const cardWidth = allCards[0].offsetWidth + 32;

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
