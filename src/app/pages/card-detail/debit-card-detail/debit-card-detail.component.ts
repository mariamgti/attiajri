import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarteMxp } from 'src/app/models/CarteMxp';
import { ListCartesMxp } from 'src/app/models/ListCartesMxp';
import { ClientWsService } from 'src/app/services/client-ws.service';
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
