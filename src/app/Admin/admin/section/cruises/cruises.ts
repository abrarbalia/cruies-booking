import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CruiseService } from '../../../../services/cruise.service';

@Component({
  selector: 'app-cruises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cruises.html',
  styleUrls: ['./cruises.css']
})
export class Cruises implements OnInit {

  cruises: any[] = [];

  showForm = false;
  editMode = false;

  cruiseForm: any = {
    id: '',
    title: '',
    port: '',
    destination: '',
    price: '',
    date: '',
    month: '',
    image: '',
    isActive: true
  };

  constructor(private cruiseService: CruiseService) {}

  ngOnInit(): void {
    this.loadCruises();
  }

  async loadCruises() {
    try {
      this.cruises = await this.cruiseService.getCruises();
      console.log('Cruises loaded:', this.cruises);
    } catch (error) {
      console.error('Error loading cruises:', error);
    }
  }

  openForm() {
    this.editMode = false;
    this.showForm = true;

    this.cruiseForm = {
      id: '',
      title: '',
      port: '',
      destination: '',
      price: '',
      date: '',
      month: '',
      image: '',
      isActive: true
    };
  }

  closeForm() {
    this.showForm = false;
  }

  editCruise(cruise: any) {
    this.editMode = true;
    this.showForm = true;

    this.cruiseForm = {
      id: cruise.id || '',
      title: cruise.title || '',
      port: cruise.port || '',
      destination: cruise.destination || '',
      price: cruise.price || '',
      date: cruise.date || '',
      month: cruise.month || '',
      image: cruise.image || '',
      isActive: cruise.isActive ?? true
    };
  }

  async saveCruise() {
    try {
      const cruiseData = {
        title: this.cruiseForm.title || '',
        port: this.cruiseForm.port || '',
        destination: this.cruiseForm.destination || '',
        price: Number(this.cruiseForm.price) || 0,
        date: this.cruiseForm.date || '',
        month: this.cruiseForm.month || '',
        image: this.cruiseForm.image || '',
        isActive: this.cruiseForm.isActive ?? true
      };

      if (this.editMode) {
        await this.cruiseService.updateCruise(this.cruiseForm.id, cruiseData);
      } else {
        await this.cruiseService.addCruise(cruiseData);
      }

      this.closeForm();
      await this.loadCruises();

    } catch (error) {
      console.error('Error saving cruise:', error);
    }
  }

  async deleteCruise(id: string) {
    try {
      if (!confirm('Delete this cruise?')) return;

      await this.cruiseService.deleteCruise(id);
      await this.loadCruises();

    } catch (error) {
      console.error('Error deleting cruise:', error);
    }
  }

  async toggleStatus(cruise: any) {
    try {
      console.log('Toggle clicked:', cruise.id, cruise.isActive);

      await this.cruiseService.toggleCruiseStatus(
        cruise.id,
        cruise.isActive ?? true
      );

      await this.loadCruises();

    } catch (error) {
      console.error('Error updating cruise status:', error);
    }
  }
}