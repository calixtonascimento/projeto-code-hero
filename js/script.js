import { fetchCharacter } from "./api.js";

const limit = 10;
let page = 1;

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#searchBar");
  const button = document.querySelector("#loadMoreBtn");

  input.addEventListener("input", () => {
    const inputvaluelower = input.value.toLowerCase();
    const results = document.querySelectorAll(".content_hero");
    results.forEach((resultitem) => {
      const titleResults = resultitem.querySelector(".img_name");
      if (titleResults.innerText.toLowerCase().includes(inputvaluelower)) {
        resultitem.style.display = "";
      } else {
        resultitem.style.display = "none";
      }
    });
  });

  button.addEventListener("click", () => {
    fetchCharacter(++page, limit).then(populateHeros);
  });
});

const populateHeros = (jsonParsed) => {
  const divHero = document.querySelector("#result_heros");

  jsonParsed.data.results.forEach((element) => {
    const srcImage = element.thumbnail.path + "." + element.thumbnail.extension;
    const nameHero = element.name;

    const series = element.series.items
      .slice(0, 3)
      .map((item) => item.name)
      .join("<br />");

    const events = element.events.items
      .slice(0, 3)
      .map((item) => item.name)
      .join("<br />");

    const hero = createHero(srcImage, nameHero, series, events);
    divHero.innerHTML = divHero.innerHTML + hero;
  });
};

const createHero = (srcImage, nameHero, series, events) => {
  return `<div class="content_hero">
            <div class="img_name">
              <img src="${srcImage}">
              <p>${nameHero}</p>
            </div>
            <div class="series">
              <p>${series}</p>
            </div>
            <div class="events">
              <p>${events}</p>
            </div>
          </div>`;
};

fetchCharacter(page, limit).then(populateHeros);
