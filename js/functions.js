/**
 * Just the like the fetch function but specialised in json
 * @param {String} link
 * @returns {Promise} return a promise containing the parsed json response from the server
 */
export async function fetchJson(link) {
  const response = await fetch(link);

  if (response.ok === true) {
    return response.json();
  }
  throw new Error("Impossible de charger les données");
}

/**
 *a function that managing the hamburger menu
 * @param {HTMLElement} hamburgerButton
 * @param {HTMLElement} navMenu
 */
export function mobileMenu(hamburgerButton, navMenu) {
  hamburgerButton.classList.toggle("active");
  hamburgerButton.firstElementChild.classList.toggle("fa-bars");
  hamburgerButton.firstElementChild.classList.toggle("fa-solid");

  hamburgerButton.firstElementChild.classList.toggle("fas");
  hamburgerButton.firstElementChild.classList.toggle("fa-window-close");
  navMenu.classList.toggle("active");
}

/**
 * A function that facilitates cloning a template
 * @param {String} id
 * @returns {DocumentFragment}
 */
export function cloneTemplate(id) {
  return document.getElementById(id).content.cloneNode(true);
}

/**
 * A function that handles scroll animation for particular elements
 * @param {String} elementClass The class of the elements to animate
 * @param {String} revealClass The class that contains style of animation
 * @returns {IntersectionObserver} I don't why but i just return that
 */
export function scrollAnimate(elementClass, revealClass) {
  const elements = document.querySelectorAll(`.${elementClass}`);
  const observer = new IntersectionObserver((entries) => {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add(revealClass);
      } else {
        entry.target.classList.remove(revealClass);
      }
    }
  });
  elements.forEach((e) => {
    observer.observe(e);
  });

  return observer;
}
