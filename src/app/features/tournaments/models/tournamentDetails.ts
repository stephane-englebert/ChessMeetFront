import { MemberModel } from "../../members/models/member";

export interface TournamentDetailsModel{
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
    playersDetails: MemberModel[];
}