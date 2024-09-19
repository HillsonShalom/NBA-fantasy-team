export interface searchModel {
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
}

export interface resultModel extends searchModel {
    playerName: string;
}

export interface playerModel extends resultModel {
    _id: string;
    age: number;
    games: number;
    team: string;
    season: number[];
    __v: number;
}

export class searchClass implements searchModel {
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
    constructor(position: string, twoPercent: number, threePercent: number, points: number){
        this.position = position;
        this.twoPercent = twoPercent;
        this.threePercent = threePercent;
        this.points = points;
    }
}
