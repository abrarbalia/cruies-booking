import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CruiseSearchBarComponent } from '../../../shared/components/cruise-search-bar/cruise-search-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CruiseSearchBarComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('experienceWrapper') experienceWrapper!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    if (this.heroVideo) {
      const video = this.heroVideo.nativeElement;
      video.muted = true;

      setTimeout(() => {
        video.play().catch(() => {});
      }, 100);
    }
  }

  scrollExperience(direction: number) {
    if (this.experienceWrapper) {
      const container = this.experienceWrapper.nativeElement;

      container.scrollBy({
        left: direction * 350,
        behavior: 'smooth'
      });
    }
  }

}