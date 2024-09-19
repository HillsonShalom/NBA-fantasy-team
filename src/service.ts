import { team, playerModel, resultModel, searchClass } from "./models";

const URL = "https://nbaserver-q21u.onrender.com/api/";

// the request
export async function search(model: searchClass): Promise<playerModel[] | string> {
    try {
        const response = await fetch(URL + 'filter', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(model)
        });

        if (!response.ok) throw new Error(`Status code ${response.status}`);

        const data = await response.json() as playerModel[];
        return data;
    } catch(e) {
        return e as string;
    }
}

export function updateLocalStorage(player: resultModel): void {
    const local = JSON.parse(localStorage.team || '{}') as team;
    switch (player.position){
        case 'PG':
                local.PG = player;
                break;
            case 'SG':
                local.SG = player;
                break;
            case 'SF':
                local.SF = player;
                break;
            case 'PF':
                local.PF = player;
                break;
            case 'C':
                local.C = player;
                break;
    }
    localStorage.team = JSON.stringify(local);
}

export async function sendTeam(): Promise<string>{
    const local = JSON.parse(localStorage.team) as team;
    let list: resultModel[] = [local.PG as resultModel, local.SG as resultModel, local.SF as resultModel, local.PF as resultModel, local.C as resultModel];
    
    try {
        const response = await fetch(URL + 'AddTeam', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(list)
        });

        if (!response.ok) throw new Error(`Status code ${response.status}`);

        return 'Success';
    } catch(e) {
        return 'Faild!'
    }
}
