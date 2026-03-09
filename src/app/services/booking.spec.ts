import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get cruise', () => {
    const cruise = { id: '1', title: 'Test Cruise' };
    service.setCruise(cruise);
    expect(service.getCruise()).toEqual(cruise);
  });

  it('should set and get cabin', () => {
    const cabin = { type: 'Suite', priceMultiplier: 2 };
    service.setCabin(cabin);
    expect(service.getCabin()).toEqual(cabin);
  });

  it('should set and get passengers', () => {
    const passengers = [{ name: 'John' }, { name: 'Jane' }];
    service.setPassengers(passengers);
    expect(service.getPassengers()).toEqual(passengers);
  });

  it('should set and get total', () => {
    service.setTotal(5000);
    expect(service.getTotal()).toBe(5000);
  });

  it('should clear booking', () => {
    service.setCruise({ id: '1' });
    service.setCabin({ type: 'A' });
    service.setPassengers([{ name: 'X' }]);
    service.setTotal(1000);

    service.clearBooking();

    expect(service.getCruise()).toBeNull();
    expect(service.getCabin()).toBeNull();
    expect(service.getPassengers()).toEqual([]);
    expect(service.getTotal()).toBe(0);
  });
});