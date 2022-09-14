import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConst } from '../../tools/globals/globals';
import { MemberModel } from '../models/member';
import { MemberAddModel } from '../models/member-add';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  members: MemberModel[] = [];

  constructor(
    private _http: HttpClient,
    private GBconst: GlobalConst
  ) { }

  getAllMembers(): Observable<MemberModel[]>{
    return this._http.get<MemberModel[]>(this.GBconst.API_MEMBERS_LIST);
  }

  addMember(value:any){
    console.log(value);
    return this._http.post<void>(this.GBconst.API_MEMBERS_ADD,value);
  }
}
