import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CruiseService } from '../../../services/cruise.service';

@Component({
  selector: 'app-cruise-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cruise-detail.html',
  styleUrls: ['./cruise-detail.css']
})
export class CruiseDetailComponent implements OnInit {

  activeTab: string = 'overview';
  cruise: any;
  loading = true;

  // 🔥 NEW VARIABLES
  selectedCabin: any = null;
  finalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cruiseService: CruiseService
  ) {}

  setTab(tab: string) {
    this.activeTab = tab;
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.cruise = await this.cruiseService.getCruiseById(id);

      // 🔥 Auto select first cabin after data loads
      if (this.cruise?.cabins?.length) {
        this.selectCabin(this.cruise.cabins[0]);
      } else {
        // fallback if no cabins
        this.finalPrice = this.cruise?.price || 0;
      }
    }

    this.loading = false;
  }

  // 🔥 Cabin Selection Logic
  selectCabin(cabin: any) {
    this.selectedCabin = cabin;
    this.finalPrice = this.cruise.price * cabin.priceMultiplier;
  }

}