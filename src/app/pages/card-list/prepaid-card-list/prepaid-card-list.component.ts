import { Component, OnInit } from '@angular/core';
import { ClientWsService } from 'src/app/services/client-ws.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-prepaid-card-list',
  templateUrl: './prepaid-card-list.component.html',
  styleUrls: ['./prepaid-card-list.component.scss']
})
export class PrepaidCardListComponent implements OnInit {
  load: boolean;
  shownGroup: any;
  clients: any;
  cards: any;
  cardType: string;
  cardNumber: number;
  availableBalance: string;
  constructor(private clientWsService: ClientWsService, private authService: AuthService) { }
  ngOnInit() {
    this.clientWsService.findClientByCodeClient(1).subscribe((data: {}) => {
      this.clients = data;
    });
    this.clientWsService.findCartePrepayeeBycodCli(1).subscribe((data: {}) => {
      this.cards = data;
  
    });
    window.dispatchEvent(new CustomEvent('init-select'));
  }
  toggleGroup(group) {
    this.load = true;
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
    this.load = false;
  }
  isGroupShown(group) {
    return this.shownGroup === group;
  };
}
