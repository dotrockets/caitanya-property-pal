
export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  rent: number;
  status: 'vacant' | 'occupied' | 'maintenance';
  image: string;
  description: string;
  amenities: string[];
  tenants: Tenant[];
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  leaseStart: string;
  leaseEnd: string;
  propertyId: string;
  propertyName: string;
  rentAmount: number;
  image?: string;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  propertyName: string;
  tenantId: string;
  tenantName: string;
  title: string;
  description: string;
  status: 'open' | 'in progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dateReported: string;
  dateResolved?: string;
  assignedTo?: string;
  notes?: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  method: 'credit' | 'bank' | 'cash' | 'check';
}
