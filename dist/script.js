import { populateTable, teamInit } from "./components.js";
import { searchClass } from "./models.js";
import { search } from "./service.js";
const app = document.getElementById('app');
function initPage() {
    const headLine = document.createElement('div');
    headLine.textContent = 'NBA FANTASY 2014-2024';
    headLine.classList.add('headline');
    app.appendChild(headLine);
    const myTeam = teamInit();
    app.appendChild(myTeam);
    // אזור החיפוש
    const searchArea = document.createElement('div');
    searchArea.classList.add('search-area');
    app.appendChild(searchArea);
    const searchAreaTitle = document.createElement('p');
    searchAreaTitle.textContent = 'NBA Player Search';
    const container = document.createElement('div');
    searchArea.append(searchAreaTitle, container);
    const form = document.createElement('form');
    const table = document.createElement('table');
    container.append(form, table);
    // הפורם
    const select = document.createElement('select');
    for (let i of ['PG', 'SG', 'SF', 'PF', 'C']) {
        const option = document.createElement('option');
        option.textContent = i;
        option.value = i;
        select.appendChild(option);
    }
    const pointsRange = document.createElement('input');
    pointsRange.type = 'range';
    pointsRange.min = '0';
    pointsRange.max = '20000';
    pointsRange.name = 'points';
    const pointsLabel = document.createElement('label');
    pointsLabel.textContent = '0';
    pointsLabel.htmlFor = 'points';
    pointsRange.addEventListener('input', () => {
        pointsLabel.textContent = String(pointsRange.value);
    });
    const twoRange = document.createElement('input');
    twoRange.type = 'range';
    twoRange.min = '0';
    twoRange.max = '100';
    twoRange.name = 'twoPercent';
    const twoLabel = document.createElement('label');
    twoLabel.textContent = '0';
    twoLabel.htmlFor = 'twoPercent';
    twoRange.addEventListener('input', () => {
        twoLabel.textContent = String(twoRange.value);
    });
    const threeRange = document.createElement('input');
    threeRange.type = 'range';
    threeRange.min = '0';
    threeRange.max = '100';
    threeRange.name = 'threePercent';
    const threeLabel = document.createElement('label');
    threeLabel.textContent = '0';
    threeLabel.htmlFor = 'threePercent';
    threeRange.addEventListener('input', () => {
        threeLabel.textContent = String(threeRange.value);
    });
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.addEventListener('click', e => {
        e.preventDefault();
        const searchData = new searchClass(select.value, Number(twoRange.value), Number(threeRange.value), Number(pointsRange.value));
        search(searchData).then(d => {
            if (typeof d === 'string')
                return;
            populateTable(table, d);
        });
    });
    form.append(select, pointsRange, pointsLabel, twoRange, twoLabel, threeRange, threeLabel, submit);
    // הטבלה
    populateTable(table, []);
}
initPage();
let a = new searchClass("C", 20, 20, 100);
// search(a).then(d => console.log(d));
