import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from "./shared/components/footer/footer";
import { MyBooking } from './features/my-booking/my-booking';
import {  KidsSailFree } from './features/offers/features/offers/kids-sail-free/kids-sail-free';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer,MyBooking,KidsSailFree ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
