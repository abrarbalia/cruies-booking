import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cruise-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cruise-detail.html',
  styleUrls: ['./cruise-detail.css']
})
export class CruiseDetailComponent {

  cruise = {
    title: "Hawaiian Island Escape",
    ship: "MS Pacific Breeze",
    nights: 7,
    date: "Jul 10, 2026",
    port: "Honolulu, Hawaii",
    rating: 4.8,
    price: "$1,199",
    image: "assets/cruise-hero.jpg",
    description: "Discover the enchanting Hawaiian islands with lush forests and crystal waters.",
    cabins: [
      {
        name: "Interior",
        features: "TV • Mini Fridge • Safe",
        price: "$1,199",
        image: "https://media.istockphoto.com/id/490104678/photo/vietnamese-cruise-ship-bedroom-with-large-window.webp?a=1&b=1&s=612x612&w=0&k=20&c=lMLTP-nzud7bX6knx0FAjgIfgRdtQ3eLnXUvQR9LzUE="
      },
      {
        name: "Ocean View",
        features: "Window • TV • Mini Fridge",
        price: "$1,599",
        image: "https://media.istockphoto.com/id/1196824698/photo/bed-on-cruise-ship.webp?a=1&b=1&s=612x612&w=0&k=20&c=GHYz2fIXo6cZDvD6L-YE5ToU9gvd1spmL1BJWsidWmo="
      },
      {
        name: "Balcony",
        features: "Balcony • TV • Lounge",
        price: "$2,099",
        image: "https://images.unsplash.com/photo-1510132310763-2df322eed83f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNydWlzZXxlbnwwfHwwfHx8MA%3D%3Dg"
      }
    ]
  };

}