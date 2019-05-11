import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  @Input() user: IUser;
  constructor() { }

  ngOnInit() {
  }
  ///assets/default-avatar.png
}
