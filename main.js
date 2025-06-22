const navContainer = document.querySelector('.nav__container');
const navButtonsList = document.querySelectorAll('.nav__button');
const activitiesContainer = document.querySelector('.activities__list');
let timeframeBtnValueActive = document.querySelector('.active').dataset.btn;

let reportData;

import { slugify, getTimeLabel } from './scripts/utils.js';

fetch('./data.json')
  .then((res) => {
    if (!res.ok) {
      throw new Error('Oops something wrong.');
    }
    return res.json();
  })
  .then((data) => {
    activitiesRender(data);
    reportData = data;
  })
  .catch((error) => console.error(error));

navContainer.addEventListener('click', timeframeUpdate);

function timeframeUpdate(e) {
  if (!e.target.classList.contains('active')) {
    navButtonsList.forEach((btn) => btn.classList.remove('active'));
    e.target.classList.add('active');

    timeframeBtnValueActive = e.target.dataset.btn;

    activitiesRender(reportData);
  }
}

function activitiesRender(data) {
  if (!Array.isArray(data)) return;

  activitiesContainer.innerHTML = data.map(cardTemplate).join('');
}

function cardTemplate({ title, timeframes }) {
  const timeframe = timeframes[timeframeBtnValueActive];
  const titleSlug = slugify(title);
  const timeLabel = getTimeLabel(timeframeBtnValueActive);

  return `
        <li class="activity-card color-card-${titleSlug}">
          <img class="color-layer__img" src="./images/icon-${titleSlug}.svg" alt="icon-${titleSlug}">
          <div class="activity-card__container">
            <div class="activity-card__header" bis_skin_checked="1">
              <span class="activity__type">${title}</span>
              <img src="./images/icon-ellipsis.svg" alt="icon-dots">
            </div>
            <div class="activity-card__stats visible" bis_skin_checked="1">
              <span class="total-current">${timeframe.current}hrs</span><span class="total-last">${timeLabel} - ${timeframe.previous}hrs</span>
            </div>
          </div>
        </li>
        `;
}
