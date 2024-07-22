import { cloneTemplate } from "./functions.js";
/**
 * @typedef Branch
 * @property {HTMLElement} root the Dom element in which we'll charge courses
 */
export class Branch {
  #lessons = [];
  /**
   *
   * @param {Array} lessons The array of lessons, each elements must contains title, description, branch, and link attribute
   * @param {String} root id of the Dom element in which we'll charge courses
   */
  constructor(lessons, root) {
    this.#lessons = lessons;
    this.root = document.getElementById(root);
  }

  /**
   * Function that load elements in the Dome but have a logical filter in case that we want just some lessons not other
   * @param {String | null} filter the title of a course
   */
  load(filter = null) {
    this.root.innerHTML = "";

    if (filter) {
      const filtered = this.#lessons.filter((v) =>
        v.title.toLowerCase().includes(filter.toLowerCase())
      );
      this.appendToDom(filtered);
      this.root.dispatchEvent(new CustomEvent("courses-load"));
    } else {
      this.appendToDom(this.#lessons);
      this.root.dispatchEvent(new CustomEvent("courses-load"));
    }
  }

  /**
   * Function that append  the given lessons array to the Dom
   * @param {object[]} lessons lessons that we will append to the Dom
   */
  appendToDom(lessons) {
    for (let lesson of lessons) {
      const container = cloneTemplate("cours").firstElementChild;
      const courseTtitle = container.querySelector(".course-title");
      const courseType = container.querySelector(".course-type");
      const courseClass = container.querySelector(".course-class");
      const courseBranch = container.querySelector(".course-branch");
      const courseLink = container.querySelector(".courses-link");
      courseLink.setAttribute("href", lesson.link);
      courseBranch.innerHTML = lesson.branch;
      courseClass.innerHTML = `Humanités ${lesson.classe}e`;
      courseType.innerHTML = lesson.type;
      courseTtitle.innerHTML = lesson.title;

      if (lesson.type.toLowerCase() === "article") {
        container.classList.add("orange-article");
      }

      this.root.append(container);
    }
  }
}
