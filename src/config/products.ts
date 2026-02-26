import type { Product, Appliance } from '@/types/product';
import nessPodImage from '@/assets/ness-pod-product.png';
import nessProImage from '@/assets/ness-pro-product.png';
import nessCubeImage from '@/assets/ness-cube-product.png';
import { Wind, Coffee, Tv, Wifi, Fan, Lightbulb } from 'lucide-react';

/**
 * Product catalog — 2-product architecture
 */
export const PRODUCTS: Product[] = [
  {
    id: 'aio-series',
    name: 'NESS AIO Series',
    tier: 'Integrated Energy System',
    image: nessCubeImage,
    capacity: '5–20 kWh',
    backupTime: '24–48 hours',
    price: 'From ₹1,39,999',
    idealFor: 'Homes ready for complete energy independence',
    features: [
      'Solar inverter + battery in one seamless unit',
      'Intelligent energy manager learns your rhythm',
      'Expandable from 5 kWh to 20 kWh as you grow',
      'Plug-and-play: installed in hours, not days',
      '10ms switchover — your Wi-Fi never drops'
    ],
    description: 'One elegant system. Solar inverter, battery, and intelligent energy management — working in harmony. No extra boxes, no wiring mess. Just silent, reliable power that grows with your family.'
  },
  {
    id: 'standalone-battery',
    name: 'NESS Standalone Battery',
    tier: 'Modular Battery Module',
    image: nessProImage,
    capacity: '5–80 kWh',
    backupTime: 'Customizable',
    price: 'From ₹89,999',
    idealFor: 'Homes with existing inverters needing modular storage',
    features: [
      'Pure LFP battery module — no inverter included',
      'Pairs with Victron, Solis, Studer, Deye & more',
      'Modular & stackable up to 80 kWh',
      '6000-cycle longevity — 15+ year lifespan',
      'AC-coupled retrofit: no rewiring required'
    ],
    description: "Your inverter's missing piece. Pure modular storage that pairs with any system. Start with one module, stack as your needs grow."
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
