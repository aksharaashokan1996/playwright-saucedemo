export const products = {
  backpack: { name: 'Sauce Labs Backpack', id: 'sauce-labs-backpack' },
  bikeLight: { name: 'Sauce Labs Bike Light', id: 'sauce-labs-bike-light' },
} as const;

export type Product = (typeof products)[keyof typeof products];

export const customer = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '12345',
} as const;
