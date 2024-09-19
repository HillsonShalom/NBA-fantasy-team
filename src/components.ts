import { playerModel, resultModel, team } from "./models";
import { sendTeam, updateLocalStorage } from "./service";

// הכרזה על משתנים שיוקצו לכל שחקן כדי למנוע כפלויות
let PG: HTMLDivElement, SG: HTMLDivElement, SF: HTMLDivElement, PF: HTMLDivElement, C: HTMLDivElement
PG = document.createElement('div'); 
SG = document.createElement('div'); 
SF = document.createElement('div'); 
PF = document.createElement('div'); 
C = document.createElement('div');

export function teamInit(): HTMLDivElement {
    const myTeam = document.createElement('div');
    myTeam.classList.add('team-area');
    const teamAreaTitle = document.createElement('p');
    teamAreaTitle.textContent = 'My Fantasy Team'
    myTeam.appendChild(teamAreaTitle);
    const flexCards = document.createElement('div');
    flexCards.classList.add('flex-cards');
    
    flexCards.append(PG, SG, SF, PF, C);
    myTeam.appendChild(flexCards);
    return myTeam;
}

export function populateTable(table: HTMLTableElement, data: resultModel[]): void {
    table.innerHTML = '';

    // כותרות
    const tableHeader = document.createElement('tr');

    const thPlayer = document.createElement('th');     thPlayer.textContent = 'Player';
    const thPosition = document.createElement('th');   thPosition.textContent = 'Position';
    const thPoints = document.createElement('th');     thPoints.textContent = 'Points';
    const thFg = document.createElement('th');         thFg.textContent = 'FG%';
    const th3p = document.createElement('th');         th3p.textContent = '3P%';
    const thAction = document.createElement('th');     thAction.textContent = 'Action';

    tableHeader.append(thPlayer, thPosition, thPoints, thFg, th3p, thAction);
    table.appendChild(tableHeader);

    // מידע
    for (let player of data){
        const row = document.createElement('tr');
        table.appendChild(row);

        const tdPlayer = document.createElement('td');     tdPlayer.textContent = player.playerName;
        const tdPosition = document.createElement('td');   tdPosition.textContent = player.position;
        const tdPoints = document.createElement('td');     tdPoints.textContent = player.points.toString();
        const tdFg = document.createElement('td');         tdFg.textContent = player.twoPercent.toString();
        const td3p = document.createElement('td');         td3p.textContent = player.threePercent.toString();
        const tdAction = document.createElement('td');
        const btn = document.createElement('button');      btn.textContent = `Add ${player.playerName.split(' ')[0]} to Current Team`;
        row.append(tdPlayer, tdPosition, tdPoints, tdFg, td3p, tdAction);
        tdAction.appendChild(btn);

        btn.addEventListener('click', () => {
            switch (player.position) {
                case 'PG':
                    populateCard(PG, player);
                    break;
                case 'SG':
                    populateCard(SG, player);
                    break;
                case 'SF':
                    populateCard(SF, player);
                    break;
                case 'PF':
                    populateCard(PF, player);
                    break;
                case 'C':
                    populateCard(C, player);
                    break;
                default:
                    return;
            }
            
            updateLocalStorage(player);
            if (document.querySelectorAll('.card').length === 5){
                const send = document.createElement('button');
                send.textContent = 'Save and Send'
                send.classList.add('send');
                document.body.appendChild(send);
                send.addEventListener('click', () => {
                    sendTeam().then(r => alert(r));
                });

                const clear = document.createElement('button');
                clear.textContent = 'Clear'
                clear.classList.add('clear');
                document.body.appendChild(clear);
                clear.addEventListener('click', () => {
                    const cards = document.querySelectorAll('.card');
                    cards.forEach(c => {
                        c.innerHTML = '';
                        c.classList.remove('card');
                    });
                    localStorage.clear();
                    document.body.removeChild(send);
                    document.body.removeChild(clear);
                });
            }
        });
    }
}

export function populateCard(card: HTMLDivElement, player: resultModel): void {
    card.innerHTML = '';

    card.classList.add('card');

    const position = document.createElement('p');
    const name = document.createElement('p');
    const three = document.createElement('p');
    const two = document.createElement('p');
    const points = document.createElement('p');
    position.textContent = switchPosition(player.position);
    name.textContent = player.playerName;
    three.textContent = `Three Precents: ${player.threePercent}%`;
    two.textContent = `Two Precents: ${player.twoPercent}%`;
    points.textContent = `Points: ${player.points}`;
    
    card.append(position, name, three, two, points);
}

function switchPosition(key: string): string {
    switch (key) {
        case 'PG':
            return 'Point Guard'
        case 'SG':
            return 'Shooting Guard'
        case 'SF':
            return 'Small Forward'
        case 'PF':
            return 'Power Forward'
        case 'C':
            return 'Center'
        default:
            return '';
    }
}