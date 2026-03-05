import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CruiseService } from '../../../../services/cruise.service';
import { BookingService } from '../../../../services/booking.service';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-cabin.html',
  styleUrls: ['./select-cabin.css']
})
export class SelectCabin implements OnInit {

  cruise: any;
  selectedCabin: any;
  passengerCount = 1;
  passengers: any[] = [];
  bookingId: string = '';
  basePrice = 0;
  tax = 0;
  portFee = 2000;
  total = 0;

  constructor(
    private route: ActivatedRoute,
    private cruiseService: CruiseService,
    private bookingService: BookingService,
    private router: Router
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('cruiseId');

    if (id) {
      this.cruise = await this.cruiseService.getCruiseById(id);
      this.bookingService.setCruise(this.cruise);
    }
  }

  selectCabin(cabin: any) {
    this.selectedCabin = cabin;
    this.calculatePrice();
  }

  calculatePrice() {
    if (!this.selectedCabin) return;

    this.basePrice =
      this.cruise.price *
      this.selectedCabin.priceMultiplier *
      this.passengerCount;

    this.tax = this.basePrice * 0.10;
    this.total = this.basePrice + this.tax + this.portFee;

    this.bookingService.setCabin(this.selectedCabin);
    this.bookingService.setTotal(this.total);
  }
continue() {

  if (!this.selectedCabin) return;

  // Create real passenger objects
  const passengersArray = [];

  for (let i = 0; i < this.passengerCount; i++) {
    passengersArray.push({
      firstName: '',
      lastName: '',
      dob: '',
      passport: ''
    });
  }

  // Save properly
  this.bookingService.setPassengers(passengersArray);

  this.router.navigate([
    '/booking',
    this.cruise.id,
    'passengers'
  ]);
}
updatePassengers() {
  this.passengers = [];

  for (let i = 0; i < this.passengerCount; i++) {
    this.passengers.push({
      name: '',
      age: '',
      gender: ''
    });
  }
}

}