export interface TournamentModel{
    guid: string;
    name: string;
    place: string;
    playersMin: number;
    playersMax: number;
    eloMin: number;
    eloMax: number;
    categories: string[];
    status: string;
    currentRound: number;
    womenOnly: boolean;
    endRegistration: Date;
}