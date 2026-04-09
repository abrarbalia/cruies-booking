import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from '../../services/offer.service';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers.html',
  styleUrls: ['./offers.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Offers implements OnInit {

  offers: any[] = [];

  constructor(
    private offerService: OfferService,
    private bookingService: BookingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      this.offers = await this.offerService.getOffers();
      this.cdr.markForCheck(); // refresh view for OnPush
      console.log("Offers:", this.offers);
    } catch (error) {
      console.error("Error loading offers:", error);
    }
  }

  copyCoupon(code: string) {
    if (!code) return;
    navigator.clipboard.writeText(code);
    alert(`Coupon ${code} copied!`);
  }

  applyOffer(offer: any) {
    this.bookingService.setOffer(offer);
    this.router.navigate(['/']);
  }

  scrollLeft(container: HTMLElement) {
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(container: HTMLElement) {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }
}