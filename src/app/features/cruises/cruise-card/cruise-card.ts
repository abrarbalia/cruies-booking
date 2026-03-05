import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cruise-card',
  standalone: true,
  templateUrl: './cruise-card.html',
  styleUrls: ['./cruise-card.css']
})

export class CruiseCard {
  @Input() id!: string;

  constructor(private router: Router) { }

  viewCruise() {
    this.router.navigate(['/cruises-detail', this.id]);
  }
  @Input() title!: string;
  @Input() image!: string;
  @Input() date!: string;
  @Input() route!: string;
  @Input() ports!: string;
  @Input() offer1!: string;
  @Input() offer2!: string;
  @Input() price!: string;
  @Input() viewing!: number;
  goToBooking() {
  this.router.navigate(['/booking', this.id]);
}
}