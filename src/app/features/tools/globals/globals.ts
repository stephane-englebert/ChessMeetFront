import { Injectable } from "@angular/core";

@Injectable()

export class GlobalConst{
    // Principal Host
    HTTP_HOST: string = 'http://localhost:5009/';

    // Web API Endpoints
    API_REGISTRATIONS_ADD: string = this.HTTP_HOST + 'api/Registrations';
    API_REGISTRATIONS_DELETE: string = this.HTTP_HOST + 'api/Registrations';
    API_TOURNAMENT_INDEX: string = this.HTTP_HOST + 'api/Tournaments';
    API_TOURNAMENT_DETAILS: string = this.HTTP_HOST + 'api/Tournaments/';
    API_TOURNAMENTS_ADD: string = this.HTTP_HOST + 'api/Tournaments';
    API_TOURNAMENTS_DELETE: string = this.HTTP_HOST + 'api/Tournaments';
    API_MEMBERS_LIST: string = this.HTTP_HOST + 'api/Members';
    API_MEMBERS_ADD: string = this.HTTP_HOST + 'api/Members';
}