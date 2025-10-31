/**
 * Product type definitions
 */

export interface Product {
  id: string;
  name: string;
  tier: string;
  image: string;
  capacity: string;
  backupTime: string;
  price: string;
  idealFor: string;
  features: string[];
  description?: string;
}

import { LucideIcon } from 'lucide-react';

export interface Appliance {
  id: string;
  name: string;
  icon: LucideIcon; // Lucide icon component type
  watts: number;
  hours: number;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  city: string;
  pincode: string;
  message: string;
  selectedProduct: Product;
  homeSize: string;
  hasSolar: string;
  selectedAppliances: string[];
  totalWatts: number;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  city?: string;
  pincode?: string;
  message: string;
  company?: string;
  gstin?: string;
  regions?: string;
  volume?: string;
  license?: string;
  yearsInBusiness?: string;
  systemSize?: string;
  trainingInterest?: string;
  solarStatus?: string;
  contactPreference?: string;
}
