import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StatsCardsComponent } from './stats-cards/stats-cards';
import { RecentBookingsComponent } from './recent-bookings/recent-bookings';
import { CruiseStatusComponent } from './cruise-status/cruise-status';
import { CheckinSummaryComponent } from './checkin-summary/checkin-summary';
import { AdminDashboardService } from '../service/admin-dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StatsCardsComponent,
    RecentBookingsComponent,
    CruiseStatusComponent,
    CheckinSummaryComponent,
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.Default // Use Default for async child refresh
})
export class DashboardComponent implements OnInit {

  totalCruises = 0;
  totalUsers = 0;
  totalBookings = 0;
  totalRevenue = 0;

  loading = true;

  constructor(
    private dashboardService: AdminDashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const [cruiseCount, userCount, bookingCount, revenue] = await Promise.all([
        this.dashboardService.getCruiseCount(),
        this.dashboardService.getTotalUsers(),
        this.dashboardService.getTotalBookings(),
        this.dashboardService.getTotalRevenue()
      ]);

      this.totalCruises = cruiseCount;
      this.totalUsers = userCount;
      this.totalBookings = bookingCount;
      this.totalRevenue = revenue;

    } catch (error) {
      console.error('Dashboard load error:', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges(); // Force view update after async
    }
  }
}