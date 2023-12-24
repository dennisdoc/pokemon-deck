import { Component, OnInit } from '@angular/core';
import { IgxIconService } from 'igniteui-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'pokemon-deck';

  constructor(private iconService: IgxIconService) { }

  ngOnInit(): void {
    this.iconService.registerFamilyAlias('material-symbols', 'material-symbols-outlined');
  }

}
