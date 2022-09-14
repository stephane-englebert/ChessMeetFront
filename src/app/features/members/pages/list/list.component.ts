import { Component, OnInit } from '@angular/core';
import { MemberModel } from '../../models/member';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  members: MemberModel[] = [];

  constructor(
    private _membersService: MembersService
  ) { }

  ngOnInit(): void {
    this._membersService.getAllMembers().subscribe(memb => this.members = memb);
  }

}
