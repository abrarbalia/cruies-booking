import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfferService } from '../../../../services/offer.service';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './offers.html',
  styleUrls: ['./offers.css']
})
export class Offers implements OnInit {

  offers: any[] = [];

  showForm = false;
  editMode = false;

  offerForm: any = {
    id: '',
    title: '',
    description: '',
    couponCode: '',
    discountType: 'flat',
    discountValue: '',
    expiryDate: '',
    image: '',
    isActive: true
  };

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  async loadOffers() {
    try {
      this.offers = await this.offerService.getOffers();
    } catch (error) {
      console.error('Error loading offers:', error);
    }
  }

  openForm() {
    this.editMode = false;
    this.showForm = true;

    this.offerForm = {
      id: '',
      title: '',
      description: '',
      couponCode: '',
      discountType: 'flat',
      discountValue: '',
      expiryDate: '',
      image: '',
      isActive: true
    };
  }

  closeForm() {
    this.showForm = false;
  }

  editOffer(offer: any) {
    this.editMode = true;
    this.showForm = true;

    this.offerForm = {
      id: offer.id || '',
      title: offer.title || '',
      description: offer.description || '',
      couponCode: offer.couponCode || '',
      discountType: offer.discountType || 'flat',
      discountValue: offer.discountValue || '',
      expiryDate: offer.expiryDate || '',
      image: offer.image || '',
      isActive: offer.isActive ?? true
    };
  }

  async saveOffer() {
    try {
      const offerData = {
        title: this.offerForm.title || '',
        description: this.offerForm.description || '',
        couponCode: this.offerForm.couponCode || '',
        discountType: this.offerForm.discountType || 'flat',
        discountValue: Number(this.offerForm.discountValue) || 0,
        expiryDate: this.offerForm.expiryDate || '',
        image: this.offerForm.image || '',
        isActive: this.offerForm.isActive ?? true
      };

      if (this.editMode) {
        await this.offerService.updateOffer(this.offerForm.id, offerData);
      } else {
        await this.offerService.addOffer(offerData);
      }

      this.closeForm();
      await this.loadOffers();

    } catch (error) {
      console.error('Error saving offer:', error);
    }
  }

  async deleteOffer(id: string) {
    try {
      if (!confirm('Delete this offer?')) return;

      await this.offerService.deleteOffer(id);
      await this.loadOffers();

    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  }

  async toggleStatus(offer: any) {
    try {
      await this.offerService.toggleOfferStatus(
        offer.id,
        offer.isActive ?? true
      );

      await this.loadOffers();

    } catch (error) {
      console.error('Error updating offer status:', error);
    }
  }
}