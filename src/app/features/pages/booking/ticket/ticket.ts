import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import QRCode from 'qrcode';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ticket implements OnInit {

  booking: any;
  loading = true;
  qrCodeUrl: string = '';

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const docRef = doc(db, 'bookings', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.booking = docSnap.data();

        // Generate QR code from booking reference
        this.qrCodeUrl = await QRCode.toDataURL(this.booking.reference);
      }
      // Manually trigger change detection for OnPush
      this.cdr.markForCheck();
    }
    this.loading = false;
    this.cdr.markForCheck();
  }

  printTicket() {
    window.print();
  }

  downloadPDF() {
    // Simple PDF download via browser print
    window.print();
  }

  async cancelBooking() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const docRef = doc(db, 'bookings', id);

    await updateDoc(docRef, {
      status: 'Cancelled'
    });

    this.booking.status = 'Cancelled';
    this.cdr.markForCheck(); // update view after status change
  }
}