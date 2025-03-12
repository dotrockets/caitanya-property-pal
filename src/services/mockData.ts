
import { Property, Tenant, MaintenanceRequest, Payment } from '@/types';

export const properties: Property[] = [
  {
    id: '1',
    name: 'Maple Avenue Apartment',
    address: '123 Maple Ave',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    rent: 1800,
    status: 'occupied',
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Beautiful 2-bedroom apartment with modern amenities and a great view of the city.',
    amenities: ['Washer/Dryer', 'Dishwasher', 'Balcony', 'Parking'],
    tenants: []
  },
  {
    id: '2',
    name: 'Pine Street Condo',
    address: '456 Pine St',
    city: 'Portland',
    state: 'OR',
    zip: '97205',
    type: 'Condo',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    rent: 2500,
    status: 'occupied',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Spacious 3-bedroom condo in the heart of the city with access to community amenities.',
    amenities: ['Gym', 'Pool', 'Concierge', 'Garage Parking'],
    tenants: []
  },
  {
    id: '3',
    name: 'Oak Boulevard House',
    address: '789 Oak Blvd',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    rent: 3900,
    status: 'vacant',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Gorgeous 4-bedroom house with a large backyard and modern kitchen.',
    amenities: ['Backyard', 'Garage', 'Fireplace', 'Updated Kitchen'],
    tenants: []
  },
  {
    id: '4',
    name: 'Cedar Court Townhouse',
    address: '101 Cedar Ct',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    type: 'Townhouse',
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1750,
    rent: 2200,
    status: 'maintenance',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Modern townhouse with garage and small patio area.',
    amenities: ['Patio', 'Attached Garage', 'Smart Home Features', 'Hardwood Floors'],
    tenants: []
  },
];

export const tenants: Tenant[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(206) 555-1234',
    leaseStart: '2023-01-01',
    leaseEnd: '2023-12-31',
    propertyId: '1',
    propertyName: 'Maple Avenue Apartment',
    rentAmount: 1800,
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '(503) 555-5678',
    leaseStart: '2023-03-15',
    leaseEnd: '2024-03-14',
    propertyId: '2',
    propertyName: 'Pine Street Condo',
    rentAmount: 2500,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(512) 555-9012',
    leaseStart: '2023-02-01',
    leaseEnd: '2024-01-31',
    propertyId: '4',
    propertyName: 'Cedar Court Townhouse',
    rentAmount: 2200,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  }
];

// Connect tenants to properties
properties.forEach(property => {
  property.tenants = tenants.filter(tenant => tenant.propertyId === property.id);
});

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    propertyId: '1',
    propertyName: 'Maple Avenue Apartment',
    tenantId: '1',
    tenantName: 'John Smith',
    title: 'Leaking Bathroom Faucet',
    description: 'The bathroom sink faucet has been leaking steadily for the past two days.',
    status: 'in progress',
    priority: 'medium',
    dateReported: '2023-05-15',
    assignedTo: 'Mike the Plumber',
    notes: 'Ordered replacement part, scheduled for repair on Friday.'
  },
  {
    id: '2',
    propertyId: '2',
    propertyName: 'Pine Street Condo',
    tenantId: '2',
    tenantName: 'Emma Johnson',
    title: 'Heating Not Working',
    description: 'The heating system is not turning on even when the thermostat is set to high.',
    status: 'open',
    priority: 'high',
    dateReported: '2023-05-20',
    notes: 'Contacting HVAC service provider for urgent repair.'
  },
  {
    id: '3',
    propertyId: '4',
    propertyName: 'Cedar Court Townhouse',
    tenantId: '3',
    tenantName: 'Michael Chen',
    title: 'Broken Window Latch',
    description: 'The latch on the master bedroom window is broken and will not secure properly.',
    status: 'completed',
    priority: 'low',
    dateReported: '2023-05-10',
    dateResolved: '2023-05-12',
    assignedTo: 'Handyman Services',
    notes: 'Replaced window latch and checked all other windows for proper function.'
  }
];

export const payments: Payment[] = [
  {
    id: '1',
    tenantId: '1',
    tenantName: 'John Smith',
    propertyId: '1',
    propertyName: 'Maple Avenue Apartment',
    amount: 1800,
    date: '2023-05-01',
    status: 'paid',
    method: 'bank'
  },
  {
    id: '2',
    tenantId: '2',
    tenantName: 'Emma Johnson',
    propertyId: '2',
    propertyName: 'Pine Street Condo',
    amount: 2500,
    date: '2023-05-01',
    status: 'paid',
    method: 'credit'
  },
  {
    id: '3',
    tenantId: '3',
    tenantName: 'Michael Chen',
    propertyId: '4',
    propertyName: 'Cedar Court Townhouse',
    amount: 2200,
    date: '2023-05-03',
    status: 'paid',
    method: 'bank'
  },
  {
    id: '4',
    tenantId: '1',
    tenantName: 'John Smith',
    propertyId: '1',
    propertyName: 'Maple Avenue Apartment',
    amount: 1800,
    date: '2023-06-01',
    status: 'pending',
    method: 'bank'
  },
  {
    id: '5',
    tenantId: '2',
    tenantName: 'Emma Johnson',
    propertyId: '2',
    propertyName: 'Pine Street Condo',
    amount: 2500,
    date: '2023-06-01',
    status: 'overdue',
    method: 'credit'
  }
];
