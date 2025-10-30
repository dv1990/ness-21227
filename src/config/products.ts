import type { Product, Appliance } from '@/types/product';
import nessPodImage from '@/assets/ness-pod-product.png';
import nessProImage from '@/assets/ness-pro-product.png';
import nessCubeImage from '@/assets/ness-cube-product.png';
import { Wind, Coffee, Tv, Wifi, Fan, Lightbulb } from 'lucide-react';

/**
 * Product catalog configuration
 */
export const PRODUCTS: Product[] = [
  {
    id: 'ups',
    name: 'NESS UPS',
    tier: 'Grid Backup',
    image: nessPodImage,
    capacity: '5 kWh',
    backupTime: '12 hours',
    price: '₹89,999',
    idealFor: 'Backup from grid outage',
    features: ['Instant power during blackouts', 'No solar required', 'Simple plug-and-play']
  },
  {
    id: 'oneaio',
    name: 'NESS AIO',
    tier: 'All-In-One Solar Solution',
    image: nessCubeImage,
    capacity: '5-20 kWh',
    backupTime: '24-48 hours',
    price: '₹1,39,999',
    idealFor: 'Complete solar + storage solution in one elegant unit',
    features: [
      'Built-in solar inverter (no separate equipment needed)',
      'Battery storage + grid backup in single system', 
      'Reduces electricity bills by up to 80%',
      'Plug-and-play installation, future-ready design'
    ],
    description: 'An All-In-One (AIO) system combines three essential components in a single unit: solar inverter, battery storage, and grid backup. This eliminates the complexity of multiple devices, reduces installation costs, and ensures all components work seamlessly together.'
  },
  {
    id: 'brick',
    name: 'NESS AC Brick',
    tier: 'Retrofit Solution',
    image: nessProImage,
    capacity: '5-80 kWh',
    backupTime: 'Customizable',
    price: '₹1,89,999',
    idealFor: 'For existing on-grid installations',
    features: ['Works with your current system', 'AC-coupled design', 'Easy to expand']
  }
];

/**
 * Common household appliances for load calculation
 */
export const COMMON_APPLIANCES: Appliance[] = [
  { id: 'ac', name: 'Air Conditioner', icon: Wind, watts: 1500, hours: 8 },
  { id: 'fridge', name: 'Refrigerator', icon: Coffee, watts: 150, hours: 24 },
  { id: 'tv', name: 'TV', icon: Tv, watts: 100, hours: 6 },
  { id: 'wifi', name: 'Wi-Fi Router', icon: Wifi, watts: 20, hours: 24 },
  { id: 'fan', name: 'Ceiling Fans (3)', icon: Fan, watts: 225, hours: 12 },
  { id: 'lights', name: 'LED Lights (10)', icon: Lightbulb, watts: 100, hours: 8 }
];

/**
 * Home size options
 */
export const HOME_SIZES = ['1-2 BHK', '2-3 BHK', '3-4 BHK', '4+ BHK / Villa'];

/**
 * Solar status options
 */
export const SOLAR_STATUS = ['Yes', 'No', 'Planning to add'];
