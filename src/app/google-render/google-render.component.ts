import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-render',
  templateUrl: './google-render.component.html',
  styleUrls: ['./google-render.component.css']
})
export class GoogleRenderComponent implements OnInit {

  public welcomeMessage = 'This is a test for google';

  constructor() { }

  ngOnInit() {
  }

}
