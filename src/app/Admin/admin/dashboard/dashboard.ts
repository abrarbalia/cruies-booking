
import { Component, OnInit } from '@angular/core';
import { StatsCardsComponent } from './stats-cards/stats-cards';
import { RecentBookingsComponent } from './recent-bookings/recent-bookings';
import { CruiseStatusComponent } from './cruise-status/cruise-status';
import { ActiveOffersComponent } from './active-offers/active-offers';
import { CheckinSummaryComponent } from './checkin-summary/checkin-summary';
import { AdminDashboardService } from '../service/admin-dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StatsCardsComponent,
    RecentBookingsComponent,
    CruiseStatusComponent,
   
    CheckinSummaryComponent
  ],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {

  totalCruises: number = 0;
  totalUsers: number = 0;
  totalBookings: number = 0;
  totalRevenue: number = 0;

  constructor(private dashboardService: AdminDashboardService) {}

  async ngOnInit() {
    try {

      this.totalCruises = await this.dashboardService.getCruiseCount();

      this.totalUsers = await this.dashboardService.getTotalUsers();

      this.totalBookings = await this.dashboardService.getTotalBookings();

      this.totalRevenue = await this.dashboardService.getTotalRevenue();

    } catch (error) {
      console.error('Dashboard load error:', error);
    }
  }

}
