import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrepaidCardModel } from '../../../models/prepaid.card.model';
import { ClientWsService } from '../../../services/client-ws.service';

@Component({
  selector: 'app-prepaid-card-detail',
  templateUrl: './prepaid-card-detail.component.html',
  styleUrls: ['./prepaid-card-detail.component.scss']
})
export class PrepaidCardDetailComponent implements OnInit {
  load: boolean;
  @Input() public carte: PrepaidCardModel;
  constructor(private route: ActivatedRoute, private router: Router, private clientWsService: ClientWsService, ) { }

  ngOnInit() { }

  redirectToConfirmation() {
    this.load = true;
    setTimeout(() => {
      this.router.navigateByUrl('/confirm-activation-carte-prepaye', { state: this.carte });
      this.load = false;
    }, 3000);
  }
  onActivate(numCarteP) {
    this.clientWsService.activerCarteP(numCarteP);
  }
  onDesactivate(numCarteP) {
    console.log('heree' + numCarteP)
    this.clientWsService.desactiverCarteP(numCarteP);
  }
}
