import { z } from 'zod';

/**
 * Validation schemas for forms
 */

// Phone validation for Indian numbers
const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;

// Pincode validation for Indian pincodes
const pincodeRegex = /^\d{6}$/;

// GSTIN validation
const gstinRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;

/**
 * Quote request form validation schema
 */
export const quoteRequestSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
  
  phone: z.string()
    .trim()
    .regex(phoneRegex, { message: "Please enter a valid Indian phone number" }),
  
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  
  city: z.string()
    .trim()
    .min(2, { message: "City must be at least 2 characters" })
    .max(100, { message: "City must be less than 100 characters" })
    .optional()
    .or(z.literal('')),
  
  pincode: z.string()
    .trim()
    .regex(pincodeRegex, { message: "Pincode must be 6 digits" })
    .optional()
    .or(z.literal('')),
  
  message: z.string()
    .trim()
    .max(1000, { message: "Message must be less than 1000 characters" })
    .optional()
    .or(z.literal(''))
});

/**
 * Homeowner contact form validation schema
 */
export const homeownerContactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  
  phone: z.string()
    .trim()
    .regex(phoneRegex, { message: "Please enter a valid Indian phone number" }),
  
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  
  city: z.string()
    .trim()
    .min(2, { message: "City must be at least 2 characters" })
    .max(100, { message: "City must be less than 100 characters" }),
  
  pincode: z.string()
    .trim()
    .regex(pincodeRegex, { message: "Pincode must be 6 digits" }),
  
  solarStatus: z.enum(['none', 'solar-only', 'inverter-only', 'complete', 'unknown']),
  
  contactPreference: z.enum(['call', 'whatsapp', 'email']),
  
  message: z.string()
    .trim()
    .max(1000, { message: "Message must be less than 1000 characters" })
    .optional()
    .or(z.literal(''))
});

/**
 * Distributor contact form validation schema
 */
export const distributorContactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  
  phone: z.string()
    .trim()
    .regex(phoneRegex, { message: "Please enter a valid Indian phone number" }),
  
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  
  company: z.string()
    .trim()
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(200, { message: "Company name must be less than 200 characters" }),
  
  gstin: z.string()
    .trim()
    .regex(gstinRegex, { message: "Invalid GSTIN format" })
    .optional()
    .or(z.literal('')),
  
  regions: z.string()
    .trim()
    .max(500, { message: "Regions must be less than 500 characters" })
    .optional()
    .or(z.literal('')),
  
  volume: z.enum(['0-10', '10-50', '50-100', '100+']),
  
  message: z.string()
    .trim()
    .max(1000, { message: "Message must be less than 1000 characters" })
    .optional()
    .or(z.literal(''))
});

/**
 * Installer contact form validation schema
 */
export const installerContactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  
  phone: z.string()
    .trim()
    .regex(phoneRegex, { message: "Please enter a valid Indian phone number" }),
  
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  
  company: z.string()
    .trim()
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(200, { message: "Company name must be less than 200 characters" }),
  
  license: z.string()
    .trim()
    .max(100, { message: "License number must be less than 100 characters" })
    .optional()
    .or(z.literal('')),
  
  yearsInBusiness: z.enum(['0-2', '3-5', '6-10', '10+']),
  
  systemSize: z.enum(['1-3kw', '3-10kw', '10-100kw', '100kw+']),
  
  trainingInterest: z.enum(['online', 'onsite', 'both', 'certified']),
  
  message: z.string()
    .trim()
    .max(1000, { message: "Message must be less than 1000 characters" })
    .optional()
    .or(z.literal(''))
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type HomeownerContactInput = z.infer<typeof homeownerContactSchema>;
export type DistributorContactInput = z.infer<typeof distributorContactSchema>;
export type InstallerContactInput = z.infer<typeof installerContactSchema>;
