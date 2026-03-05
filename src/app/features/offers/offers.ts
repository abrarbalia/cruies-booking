import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './offers.html',
  styleUrls: ['./offers.css']
})
export class Offers implements OnInit {

  offers: any[] = [];

  constructor(private offerService: OfferService) {}

  async ngOnInit() {
    this.offers = await this.offerService.getOffers();
    console.log("Offers:", this.offers);
  }

  copyCoupon(code: string) {
    navigator.clipboard.writeText(code);
    alert(`Coupon ${code} copied!`);
  }
  scrollLeft(container: HTMLElement) {
  container.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
}

scrollRight(container: HTMLElement) {
  container.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
}
}
