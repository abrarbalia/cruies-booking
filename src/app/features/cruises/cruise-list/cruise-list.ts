import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CruiseCard } from '../cruise-card/cruise-card';
import { CruiseService } from '../../../services/cruise.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cruise-list',
  standalone: true,
  imports: [CommonModule, CruiseCard],
  templateUrl: './cruise-list.html',
  styleUrls: ['./cruise-list.css']
})
export class CruiseList implements OnInit {

  cruises: any[] = [];
  loading = true;

  constructor(
    private cruiseService: CruiseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.loading = true;

      const hasFilters = Object.keys(params).length > 0;

      if (hasFilters) {
        this.cruiseService.searchCruises(params)
          .then(data => {
            this.cruises = data;
            this.loading = false;
          });
      } else {
        this.cruiseService.getCruises()
          .then(data => {
            this.cruises = data;
            this.loading = false;
          });
      }

    });

  }

}