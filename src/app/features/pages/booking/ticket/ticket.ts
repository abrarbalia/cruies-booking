import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

import QRCode from 'qrcode';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.css']
})
export class Ticket implements OnInit {

  booking: any;
  loading = true;
  qrCodeUrl: string = '';

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const docRef = doc(db, 'bookings', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.booking = docSnap.data();

        // Generate QR from booking reference
        this.qrCodeUrl = await QRCode.toDataURL(
          this.booking.reference
        );
      }
    }

    this.loading = false;
  }

  printTicket() {
    window.print();
  }

  downloadPDF() {
    window.print(); // simple version (browser save as PDF)
  }
  async cancelBooking() {

  const id = this.route.snapshot.paramMap.get('id');
  if (!id) return;

  const docRef = doc(db, 'bookings', id);

  await updateDoc(docRef, {
    status: 'Cancelled'
  });

  this.booking.status = 'Cancelled';
}
}