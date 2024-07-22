import { Branch } from "./courses.js";
import { mobileMenu, fetchJson, scrollAnimate } from "./functions.js";

//Handle scroll animations, two types of animations
scrollAnimate("hidden-text", "show");
scrollAnimate("hidden2", "show-animate-2");

//Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar-nav");
hamburger.addEventListener("click", mobileMenu.bind(null, hamburger, navMenu));

/* Math Branch script*/

if (document.body.dataset.type === "branch") {
  const branchName = document.body.dataset.branchname;
  const branch = new Branch(
    await fetchJson(`../js/${branchName}.json`),
    "courses-container"
  );
  branch.root.addEventListener(
    "courses-load",
    scrollAnimate.bind(null, "hidden-text", "show")
  );

  branch.load();

  const input = document.querySelector(".search-input");

  input.addEventListener("keydown", (e) => {
    if (e.target.value === "") {
      branch.load();
      return;
    }
    branch.load(e.target.value);
  });
  /* reload button */

  const reload = document.querySelector(".reload");

  reload.addEventListener("click", () => {
    branch.load();
  });
}

//Accordion

const accordionTitle = document.querySelectorAll(".accordion-title");

accordionTitle.forEach((accordion) =>
  accordion.addEventListener("click", (e) => {
    const hiddenAccordion =
      e.currentTarget.parentElement.querySelector(".accordion-content");

    const icon =
      e.currentTarget.querySelector(".fa-plus") ||
      e.currentTarget.querySelector(".fa-minus");
    icon.classList.toggle("fa-plus");
    icon.classList.toggle("fa-minus");
    hiddenAccordion.classList.toggle("accordion-hide");
  })
);
