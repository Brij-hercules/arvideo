
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  categories: string[];
  badges: string[];
  imageUrl: string;
  startPrice?: number;
}

export interface UserRequest {
  id?: string;
  categoryId: string;
  carModel: string;
  year: string;
  description: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  status?: 'pending' | 'quoted' | 'completed';
  timestamp?: Date;
  userPhone: string;
}

export interface Garage {
  id: string;
  name: string;
  address: string;
  district: string;
  phone: string;
  registrationNumber: string;
  services: string;
  serviceTags?: string[]; // Derived categories for easier filtering
  openingHours?: string;
  vehicleTypes?: string[];
  rating?: string;
  reviewCount?: number;
}

export enum AppView {
  HOME = 'HOME',
  REQUEST_WIZARD = 'REQUEST_WIZARD',
  PROVIDER_LIST = 'PROVIDER_LIST',
  AI_ADVISOR = 'AI_ADVISOR',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  PRO_JOIN = 'PRO_JOIN',
  LOGIN = 'LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  YELLOW_PAGES = 'YELLOW_PAGES'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
