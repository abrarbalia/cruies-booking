// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { CruiseService } from '../../../services/cruise.service';

// @Component({
//   selector: 'app-cruise-detail',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './cruise-detail.html',
//   styleUrls: ['./cruise-detail.css'],
   
// })
// export class CruiseDetail implements OnInit {

//   activeTab: string = 'overview';
//   cruise: any;
//   loading = true;

//   selectedCabin: any = null;
//   finalPrice: number = 0;

//   constructor(
//     private route: ActivatedRoute,
//     private cruiseService: CruiseService,
//     private router: Router
//   ) {}

//   setTab(tab: string) {
//     this.activeTab = tab;
//   }

//   async ngOnInit() {

//     const id = this.route.snapshot.paramMap.get('id');

//     if (id) {

//       // get cruise data
//       this.cruise = await this.cruiseService.getCruiseById(id);

//       // attach id manually (important for firebase docs)
//       this.cruise.id = id;

//       // auto select first cabin
//       if (this.cruise?.cabins?.length) {
//         this.selectCabin(this.cruise.cabins[0]);
//       } else {
//         this.finalPrice = this.cruise?.price || 0;
//       }
//     }

//     this.loading = false;
//   }

//   // select cabin
//   selectCabin(cabin: any) {
//     this.selectedCabin = cabin;
//     this.finalPrice = this.cruise.price * cabin.priceMultiplier;
//   }

//   // navigate to booking
//   goToBooking() {

//     if (!this.cruise?.id) {
//       console.error('Cruise ID missing');
//       return;
//     }

//     this.router.navigate(['/booking', this.cruise.id], {
//       state: {
//         cabin: this.selectedCabin,
//         price: this.finalPrice
//       }
//     });

//   }

// }


import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CruiseService } from '../../../services/cruise.service';
import { BehaviorSubject, Observable, switchMap, map, of } from 'rxjs';

@Component({
  selector: 'app-cruise-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cruise-detail.html',
  styleUrls: ['./cruise-detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CruiseDetail implements OnInit {

  activeTab: string = 'overview';

  // Reactive state
  private cruiseSubject = new BehaviorSubject<any>(null);
  cruise$: Observable<any> = this.cruiseSubject.asObservable();

  private selectedCabinSubject = new BehaviorSubject<any>(null);
  selectedCabin$ = this.selectedCabinSubject.asObservable();

  finalPrice$: Observable<number> = this.selectedCabin$.pipe(
    switchMap(cabin => this.cruise$.pipe(
      map(cruise => {
        if (!cruise) return 0;
        return cabin ? cruise.price * cabin.priceMultiplier : cruise.price;
      })
    ))
  );

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private cruiseService: CruiseService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      return;
    }

    this.cruiseService.getCruiseById(id).then(cruise => {
      cruise.id = id; // attach ID manually
      this.cruiseSubject.next(cruise);

      if (cruise?.cabins?.length) {
        this.selectCabin(cruise.cabins[0]);
      }

      this.loading = false;
    }).catch(err => {
      console.error('Failed to fetch cruise:', err);
      this.loading = false;
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  selectCabin(cabin: any) {
    this.selectedCabinSubject.next(cabin);
  }

  goToBooking() {
    const cruise = this.cruiseSubject.value;
    const cabin = this.selectedCabinSubject.value;

    if (!cruise?.id) {
      console.error('Cruise ID missing');
      return;
    }

    const price = cabin ? cruise.price * cabin.priceMultiplier : cruise.price;

    this.router.navigate(['/booking', cruise.id], {
      state: { cabin, price }
    });
  }
}