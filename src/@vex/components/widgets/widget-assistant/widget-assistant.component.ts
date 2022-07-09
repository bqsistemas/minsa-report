import { Component, OnInit, Input } from '@angular/core';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import { User } from '@core/models/user/user';
import { AuthService } from '@core/services/auth/auth.service';
import { Rol } from '@core/models/rol/rol';

@Component({
  selector: 'vex-widget-assistant',
  templateUrl: './widget-assistant.component.html',
  styleUrls: ['./widget-assistant.component.scss']
})
export class WidgetAssistantComponent implements OnInit {

  user: User;
  @Input() rolSede: Rol;
  @Input() message: String;
  // ------------------------
  icCheckCircle = icCheckCircle;

  constructor(
    private _authService: AuthService,
  ) {
    this.user = this._authService.getUser();
  }

  ngOnInit() {
  }

}
