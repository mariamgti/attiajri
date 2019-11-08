import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-login-body',
  templateUrl: './page-login-body.component.html',
  styleUrls: ['./page-login-body.component.scss']
})
export class PageLoginBodyComponent implements OnInit {
  load: boolean;
  password: string = '';
  value: string;
  constructor(private router: Router) { }
  ngOnInit() {
    this.doShuffle1();
    this.doShuffle2();
  }
  item: string;

  tableauChiffres1 = [

    { item: '0' },
    { item: '1' },

    { item: '2' },

    { item: '3' },

    { item: '4' },


  ];
  tableauChiffres2 = [
    { item: '5' },

    { item: '6' },

    { item: '7' },

    { item: '8' },

    { item: '9' },


  ];
  doShuffle1() {
    this.shuffleArray(this.tableauChiffres1);
  }
  doShuffle2() {
    this.shuffleArray(this.tableauChiffres2);
  }

  onchange(value) {

    console.log('value', value);
    this.password = value.concat(this.password);
    console.log('password=', this.password, '.');
  }
  login() {

    this.load = true;

    setTimeout(() => {
      this.router.navigateByUrl('/listeCartes');
      this.load = false;
    }, 3000);
  }
  // -> Fisher–Yates shuffle algorithm
  shuffleArray = function (array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
  rem() {
    this.password = '';
  }
}

