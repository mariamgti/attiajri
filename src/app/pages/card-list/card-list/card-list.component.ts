import { Component, OnInit } from '@angular/core';
import { ClientWsService } from 'src/app/services/client-ws.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  load: boolean;
  uuid: any;
  constructor(private clientWsService: ClientWsService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.getCurrentNavigation().extras.state;
  }
  ngOnInit() {
    this.uuid = Cookie.get('uuid');
    this.authService.checkCredentials();
  }
  redirectDebitCardList() {
    this.load = true;
    setTimeout(() => {
      this.router.navigateByUrl('/listeCartesDébit');
      this.load = false;
    }, 3000);
  }
  redirectPrepaidCardList() {
    this.load = true;
    setTimeout(() => {
      this.router.navigateByUrl("/listeCartesPrépayées");
      this.load = false;
    }, 3000);
  }
}
