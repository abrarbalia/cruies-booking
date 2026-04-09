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

  loading = true;

  constructor(private cruiseService: CruiseService) {}

  ngOnInit(): void {
    this.loadCruises();
  }

  /** Load all cruises */
  async loadCruises() {
    this.loading = true;
    try {
      this.cruises = await this.cruiseService.getCruises();
      console.log('Cruises loaded:', this.cruises);
    } catch (error) {
      console.error('Error loading cruises:', error);
    } finally {
      this.loading = false;
    }
  }

  /** Open the Add Cruise form */
  openForm() {
    this.editMode = false;
    this.showForm = true;
    this.resetForm();
  }

  /** Close form popup */
  closeForm() {
    this.showForm = false;
  }

  /** Edit a cruise */
  editCruise(cruise: any) {
    this.editMode = true;
    this.showForm = true;
    this.cruiseForm = { ...cruise }; // spread to avoid reference issues
  }

  /** Save or update cruise */
  async saveCruise() {
    const cruiseData = {
      title: this.cruiseForm.title,
      port: this.cruiseForm.port,
      destination: this.cruiseForm.destination,
      price: Number(this.cruiseForm.price),
      date: this.cruiseForm.date,
      month: this.cruiseForm.month,
      image: this.cruiseForm.image,
      isActive: this.cruiseForm.isActive ?? true
    };

    try {
      if (this.editMode) {
        await this.cruiseService.updateCruise(this.cruiseForm.id, cruiseData);
      } else {
        await this.cruiseService.addCruise(cruiseData);
      }

      this.closeForm();
      await this.loadCruises(); // reload cruises after save
    } catch (error) {
      console.error('Error saving cruise:', error);
    }
  }

  /** Delete a cruise */
  async deleteCruise(id: string) {
    if (!confirm('Are you sure you want to delete this cruise?')) return;

    try {
      await this.cruiseService.deleteCruise(id);
      await this.loadCruises();
    } catch (error) {
      console.error('Error deleting cruise:', error);
    }
  }

  /** Toggle cruise status */
  async toggleStatus(cruise: any) {
    try {
      await this.cruiseService.toggleCruiseStatus(cruise.id, !cruise.isActive);
      await this.loadCruises(); // reload after status change
    } catch (error) {
      console.error('Error updating cruise status:', error);
    }
  }

  /** Reset the cruise form */
  private resetForm() {
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
}