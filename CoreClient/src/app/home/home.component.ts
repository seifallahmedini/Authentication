import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
    $(document).ready(function () {
      $.getScript('../../assets/js/home.js', function (w) { }); 
    }); 
    
  }

}
