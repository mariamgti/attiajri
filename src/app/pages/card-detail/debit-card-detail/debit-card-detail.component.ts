import { Component, OnInit, Input } from '@angular/core';
import { DebitCardModel } from '../../../models/debit.card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientWsService } from 'src/app/services/client-ws.service';
import { ListCartesMxp } from 'src/app/models/listCartesMxp';
import { CarteMxp } from 'src/app/models/CarteMxp';
import { CartesMxpWS } from 'src/app/services/cartes-Mxp-ws';
import { Data } from 'src/app/services/Data.service';

@Component({
  selector: 'app-debit-card-detail',
  templateUrl: './debit-card-detail.component.html',
  styleUrls: ['./debit-card-detail.component.scss']
})
export class DebitCardDetailComponent implements OnInit {
  @Input() public carte: CarteMxp;
  listCartesMxp: ListCartesMxp;
  cartesMxp: CarteMxp[];
  infoCartesMxp: ListCartesMxp;
  load: boolean;
  currentUrl: string = "/listeCartesDébit"
  constructor(private route: ActivatedRoute, private router: Router, private clientWsService: ClientWsService, private data: Data, ) { }
  ngOnInit() {

  }
  redirectToConfirmation() {
    this.load = true;
    setTimeout(() => {
      this.data.storage = this.currentUrl,
        this.router.navigateByUrl('/confirm-activation-carte-debit', { state: this.carte });
      this.load = false;
    }, 3000);
  }
}
