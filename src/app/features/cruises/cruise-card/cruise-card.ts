import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cruise-card',
  standalone: true,
  templateUrl: './cruise-card.html',
  styleUrls: ['./cruise-card.css']
})
export class CruiseCardComponent {

  @Input() title!: string;
  @Input() image!: string;
  @Input() date!: string;
  @Input() route!: string;
  @Input() ports!: string;
  @Input() offer1!: string;
  @Input() offer2!: string;
  @Input() price!: string;
  @Input() viewing!: number;

}