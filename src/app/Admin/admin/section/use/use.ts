import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUserService } from '../../../../services/admin-user.service';

@Component({
  selector: 'app-use',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './use.html',
  styleUrls: ['./use.css']
})
export class Use implements OnInit {

  users: any[] = [];
  showForm = false;
  editMode = false;

  userForm: any = {
    id: '',
    fullName: '',
    email: '',
    role: 'user'
  };

  constructor(private adminUserService: AdminUserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await this.adminUserService.getUsers();
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  openForm() {
    this.editMode = false;
    this.showForm = true;
    this.userForm = {
      id: '',
      fullName: '',
      email: '',
      role: 'user'
    };
  }

  closeForm() {
    this.showForm = false;
  }

  editUser(user: any) {
    this.editMode = true;
    this.showForm = true;
    this.userForm = {
      id: user.id || '',
      fullName: user.fullName || '',
      email: user.email || '',
      role: user.role || 'user'
    };
  }

  async saveUser() {
    try {
      const userData = {
        fullName: this.userForm.fullName,
        email: this.userForm.email,
        role: this.userForm.role
      };

      if (this.editMode) {
        await this.adminUserService.updateUser(this.userForm.id, userData);
      } else {
        await this.adminUserService.addUser(userData);
      }

      this.closeForm();
      await this.loadUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  async deleteUser(id: string) {
    try {
      if (!confirm('Delete this user?')) return;

      await this.adminUserService.deleteUser(id);
      await this.loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}