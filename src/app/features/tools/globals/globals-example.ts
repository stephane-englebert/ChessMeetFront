import { Injectable } from "@angular/core";

@Injectable()

export class GlobalConst{
    // Principal Host
    HTTP_HOST: string = 'http://...';

    // Web API Endpoints
    API_REGISTRATIONS_ADD: string = this.HTTP_HOST + 'api/';
    API_REGISTRATIONS_DELETE: string = this.HTTP_HOST + 'api/';
    API_TOURNAMENT_INDEX: string = this.HTTP_HOST + 'api/';
    API_TOURNAMENT_DETAILS: string = this.HTTP_HOST + 'api/';
    API_TOURNAMENTS_ADD: string = this.HTTP_HOST + 'api/';
    API_TOURNAMENTS_DELETE: string = this.HTTP_HOST + 'api/';
    API_MEMBERS_LIST: string = this.HTTP_HOST + 'api/';
    API_MEMBERS_ADD: string = this.HTTP_HOST + 'api/';
}