// Add .project-modal-open on projects container when model is opened

var Shuffle = window.Shuffle;
var projectsContainer = document.querySelector(".contenu");
var projectsWrapper = document.querySelector("#bonjour");
//project-modal-open

var shuffleInstance = new Shuffle(projectsContainer, {
  itemSelector: ".projet",
});

var glide;

const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");
function isModalOpen() {
  return !Boolean(modal.attributes["aria-hidden"].value === "true");
}

MicroModal.init();

var slideIndex = 1;

function plusDivs(n) {
  if (n === 1) {
    glide.go(">");
  } else {
    glide.go("<");
  }
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var i;
  var x = document.querySelectorAll(".slider .imgs > *");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    // x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}

function pauseAllVideos() {
  modal.querySelectorAll("iframe").forEach((video) => {
    const player = new Vimeo.Player(video);
    player.pause();
  });
}

function closeModal() {
  if (isModalOpen()) {
    projectsWrapper.classList.remove("project-modal-open");
    pauseAllVideos();
    MicroModal.close("modal");
  }
}

function openModal() {
  projectsWrapper.classList.add("project-modal-open");
  MicroModal.show("modal");
}

function loadProject(projectElm, ignoreHistory) {
  const metadata = projectElm.querySelector(".metadata");
  const text = metadata.querySelector(".text").cloneNode(true);
  const imgs = metadata.querySelector(".glide").cloneNode(true);
  const projectTitle = projectElm.getAttribute("data-title");
  const slides = imgs.querySelectorAll(".glide__slides li");
  slides.forEach((li) => {
    const slideImgs = li.querySelectorAll("img");
    if (slideImgs.length === 1 && !li.hasAttribute("data-nobg")) {
      const blurredImage = slideImgs[0].cloneNode();
      blurredImage.classList.replace("slide2", "blurred-bg");
      li.insertAdjacentElement("beforeend", blurredImage);
    }
  });
  const wrappingDiv = document.createElement("div");
  wrappingDiv.classList.add("slider-navigation");
  const bullets = document.createElement("div");
  bullets.classList.add("glide__bullets");
  bullets.setAttribute("data-glide-el", "controls[nav]");
  wrappingDiv.insertAdjacentHTML(
    "beforeend",
    '<div class="fleche" id="previous" onclick="plusDivs(-1)"><img class="flechepng" src="images/fleche-gauche.png"/></div>'
  );
  for (let i = 0; i < slides.length; i++) {
    bullets.insertAdjacentHTML(
      "beforeend",
      '<button class="glide__bullet" data-glide-dir="=' + i + '"></button>'
    );
  }
  wrappingDiv.insertAdjacentElement("beforeend", bullets);
  wrappingDiv.insertAdjacentHTML(
    "beforeend",
    '<div class="fleche" id="next" onclick="plusDivs(1)"> <img class="flechepng" src="images/fleche-droite.png"/></div>'
  );
  imgs.insertAdjacentElement("beforeend", wrappingDiv);
  if (!ignoreHistory) {
    history.pushState(
      {},
      projectElm.querySelector(".titre h2").innerHTML,
      "#" + projectTitle
    );
  }
  const slider = document.createElement("div");
  slider.classList.add("slider");
  slider.insertAdjacentElement("beforeend", imgs);
  slider.insertAdjacentHTML(
    "beforeend",
    '<div class="fermer" onclick="history.back()">&#10005;</div>'
  );
  modalContent.innerHTML = "";
  modalContent.insertAdjacentElement("beforeend", slider);
  modalContent.insertAdjacentElement("beforeend", text);
  openModal();
  showDivs(slideIndex);
  glide = new Glide("#modal-content .glide", {
    dragThreshold: 20,
    gap: 0,
    type: "carousel",
  }).mount();

  glide.on("move.after", pauseAllVideos);

  modalContent.querySelectorAll("iframe").forEach((video) => {
    let click = false;
    let parent = video.parentNode;
    parent.addEventListener("mousedown", () => {
      click = true;
    });
    parent.addEventListener("mouseup", () => {
      click = false;
    });
    parent.addEventListener("mousemove", () => {
      if (click) {
        video.style.pointerEvents = "none";
      } else {
        video.style.pointerEvents = "auto";
      }
    });
  });
}

onpopstate = function (e) {
  const currentProject = location.hash;
  console.log(currentProject);
  if (currentProject === "") {
    closeModal();
  } else {
    loadProject(
      document.querySelector(
        `.projet[data-title="${currentProject.slice(1)}"]`
      ),
      true
    );
  }
};

$(".projet").each(function (index, element) {
  $(this).on("click", function (e) {
    const elm = e.currentTarget;
    e.preventDefault();
    loadProject(elm);
  });
});

function closemodalIfNeeded() {
  if (isModalOpen()) {
    history.back();
  }
}

$(".mTitle, #logo").on("click", function (e) {
  e.preventDefault();
  // closeModal();
  closemodalIfNeeded();
  slideIndex = 1;
});

$("#logo").on("click", function (e) {
  shuffleInstance.filter();
  closeMenu();
  closemodalIfNeeded();
  removeSelected();
});

$(".menu_UIUX").on("click", function (e) {
  e.preventDefault();
  closeMenu();
  closemodalIfNeeded();
  shuffleInstance.filter("uiux");
});

$(".menu_Ed").on("click", function (e) {
  e.preventDefault();
  closeMenu();
  closemodalIfNeeded();
  shuffleInstance.filter("edition");
});

$(".menu_All").on("click", function (e) {
  e.preventDefault();
  closeMenu();
  closemodalIfNeeded();
  shuffleInstance.filter();
});

$(".menu_Vid").on("click", function (e) {
  e.preventDefault();
  closeMenu();
  closemodalIfNeeded();
  shuffleInstance.filter("video");
});

$(".menu_Med").on("click", function (e) {
  e.preventDefault();
  closeMenu();
  closemodalIfNeeded();
  shuffleInstance.filter("mediation");
});

$(".menu_Typo").on("click", function (e) {
  e.preventDefault();
  closeMenu();
  closemodalIfNeeded();
  shuffleInstance.filter("typographie");
});

$(".menu_Illu").on("click", function (e) {
  e.preventDefault();
  closeMenu();
  closemodalIfNeeded();
  shuffleInstance.filter("illu");
});

$(".menu_Photo").on("click", function (e) {
  e.preventDefault();
  closeMenu();
  closemodalIfNeeded();
  shuffleInstance.filter("photographie");
});

$(".menu_Expe").on("click", function (e) {
  e.preventDefault();
  closeMenu();
  closemodalIfNeeded();
  shuffleInstance.filter("experimentation");
});

$(".menu_Contact").on("click", function (e) {
  e.preventDefault();
  closeMenu();
  closemodalIfNeeded();
  shuffleInstance.filter("contactpage");
});

$(".bouton-logo").on("click", function (e) {
  $("#home").addClass("hidden");
  $(".-square").hide();
});

function closeMenu() {
  $(".menuSelector").prop("checked", false);
}

let titles = document.querySelectorAll(".mTitle");

for (let i = 0; i < titles.length; i++) {
  let title = titles[i];
  title.addEventListener("click", () => {
    titles.forEach((aTitle) => {
      aTitle.classList.remove("selected");
    });
    title.classList.add("selected");
  });
}

function removeSelected() {
  document.querySelectorAll(".selected").forEach(function (elm) {
    elm.classList.remove("selected");
  });
}
