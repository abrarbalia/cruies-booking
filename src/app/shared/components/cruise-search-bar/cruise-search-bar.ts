import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CruiseService } from '../../../services/cruise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cruise-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cruise-search-bar.html',
  styleUrls: ['./cruise-search-bar.css']
})
export class CruiseSearchBarComponent implements OnInit {

  destinations: string[] = [];
  ports: string[] = [];
  months: string[] = [];
  nights: number[] = [];

  selectedDestination = '';
  selectedPort = '';
  selectedMonth = '';
  selectedNights: number | null = null;

  loading = true;

  constructor(
    private cruiseService: CruiseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const data: any = await this.cruiseService.getSearchFilters();
      this.destinations = data.destinations || [];
      this.ports = data.ports || [];
      this.months = data.months || [];
      this.nights = data.nights || [];
    } catch (error) {
      console.error('Failed to load search filters:', error);
    } finally {
      this.loading = false;
      this.cdr.markForCheck(); // Force update for OnPush or async load
    }
  }

  search() {
    const queryParams: any = {};
    if (this.selectedDestination) queryParams.destination = this.selectedDestination;
    if (this.selectedPort) queryParams.port = this.selectedPort;
    if (this.selectedMonth) queryParams.month = this.selectedMonth;
    if (this.selectedNights !== null) queryParams.nights = this.selectedNights;

    this.router.navigate(['/cruises'], { queryParams });
  }
}