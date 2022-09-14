export interface LoggedUserModel{
    token: string;
    loggedMember: {
        id: number,
        role: string,
        pseudo: string,
        email: string,
        birthdate: Date,
        gender: string,
        elo: number
    }
}