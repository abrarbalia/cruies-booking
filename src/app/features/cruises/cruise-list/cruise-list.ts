import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCruises();
    this.route.queryParams.subscribe(() => {
      this.loadCruises();
    });
  }

loadCruises() {
  this.loading = true;
  const params = this.route.snapshot.queryParams;
  const hasFilters = Object.keys(params).length > 0;

  let promise;

  if (hasFilters) {
    promise = this.cruiseService.searchCruises(params);
  } else {
    promise = this.cruiseService.getActiveCruises();
  }

  promise
    .then(data => {
      this.cruises = data;
      console.log('Cruises fetched:', data);
    })
    .catch(err => console.error('Error fetching cruises:', err))
    .finally(() => {
      this.loading = false;
      this.cd.detectChanges();
    });
}
}