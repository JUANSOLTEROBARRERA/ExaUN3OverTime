import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  public myDate;
  constructor() { }

  ngOnInit() {
  }
  showdate(){
    console.log(this.myDate);
  }

}
