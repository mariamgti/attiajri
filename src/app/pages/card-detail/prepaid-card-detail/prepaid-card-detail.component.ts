import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PrepaidCardModel } from '../../../models/PrepaidCardModel';
import { ClientWsService } from '../../../services/client-ws.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  
    this.clientWsService.desactiverCarteP(numCarteP);
  }
}
