import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  // Variables to store today and tomorrow dates for default check-in/out
  today!: string;
  tomorrow!: string;

  // Search model bound to the form inputs
  search = {
    location: '',    
    checkIn: '',     
    checkOut: '',   
    guests: 1,       
  };

  // Hardcoded hotel data
  hotels = [
    {
      name: 'Luxury Resort',
      price: 120,
      image: 'https://foyr.com/learn/wp-content/uploads/2021/12/hotel-interior-design.jpg',
      location: 'Dubai',
      availableFrom: '2025-12-25',
      availableTo: '2026-10-31',   
    },
    {
      name: 'City Hotel',
      price: 90,
      image:
        'https://www.contemporist.com/wp-content/uploads/2022/02/modern-white-hotel-exterior-interior-070222-1140-01.jpg',
      location: 'London',
      availableFrom: '2026-01-01',
      availableTo: '2026-07-31',
    },
    {
      name: 'Beach View',
      price: 150,
      image:
        'https://www.kaylangassocs.com/hospitality-interior-design/interiors-design-planning/hotel-paseo-marriott-interior-design-1-exterior.jpg',
      location: 'Goa',
      availableFrom: '2026-02-01',
      availableTo: '2026-11-31',
    },
    {
      name: 'Luxury Resort',
      price: 200,
      image: 'https://foyr.com/learn/wp-content/uploads/2021/12/hotel-interior-design.jpg',
      location: 'Dubai',
      availableFrom: '2026-02-02',
      availableTo: '2026-10-31',
    },
    {
      name: 'City Hotel',
      price: 350,
      image:
        'https://www.kaylangassocs.com/hospitality-interior-design/interiors-design-planning/hotel-paseo-marriott-interior-design-1-exterior.jpg',
      location: 'London',
      availableFrom: '2026-03-01',
      availableTo: '2026-10-31',
    },
    {
      name: 'Beach View',
      price: 1500,
      image:
        'https://www.contemporist.com/wp-content/uploads/2022/02/modern-white-hotel-exterior-interior-070222-1140-01.jpg',
      location: 'Newyork',
      availableFrom: '2026-03-01',
      availableTo: '2026-10-31',
    },
  ];

  // Array to store filtered hotels (shown on the page)
  filteredHotels: any[] = [];

  // Lifecycle hook: runs when component initializes
  ngOnInit() {
    const now = new Date();

    // Set today date in YYYY-MM-DD format
    this.today = now.toISOString().split('T')[0];

    // Set tomorrow date for default check-out
    const tmr = new Date(now);
    tmr.setDate(now.getDate() + 1);
    this.tomorrow = tmr.toISOString().split('T')[0];

    // Set default check-in and check-out dates
    this.search.checkIn = this.today;
    this.search.checkOut = this.tomorrow;

    // Initially show all hotels
    this.filteredHotels = [...this.hotels];
  }

  // Function to filter hotels based on search inputs
  searchHotels() {
    this.filteredHotels = this.hotels.filter((hotel) => {
      // Convert location input to lowercase for case-insensitive search
      const locationInput = this.search.location?.toLowerCase() || '';

      // Match hotel if location or name includes the input, or input is empty
      const locationMatch =
        !locationInput ||
        hotel.location.toLowerCase().includes(locationInput) ||
        hotel.name.toLowerCase().includes(locationInput);

      // Dates are optional; only check if user selects them
      const checkIn = this.search.checkIn ? new Date(this.search.checkIn) : null;
      const checkOut = this.search.checkOut ? new Date(this.search.checkOut) : null;
      const availableFrom = new Date(hotel.availableFrom);
      const availableTo = new Date(hotel.availableTo);

      // Only apply date filters if dates are set
      const checkInMatch = !checkIn || checkIn >= availableFrom;
      const checkOutMatch = !checkOut || checkOut <= availableTo;

      // Return true if hotel passes all active filters
      return locationMatch && checkInMatch && checkOutMatch;
    });
  }

  // Function to reset search inputs and show all hotels
  clearSearch() {
    this.search = {
      location: '',           
      checkIn: this.today,    
      checkOut: this.tomorrow,
      guests: 1,              
    };

    // Reset filtered hotels to show all
    this.filteredHotels = [...this.hotels];
  }
}
