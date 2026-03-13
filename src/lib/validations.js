import { z } from 'zod';

export const otpSchema = z.object({
  otp: z.string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^[0-9]+$/, 'OTP must contain only digits')
});

export const phoneSchema = z.object({
  phoneNumber: z.string()
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits')
    .regex(/^[0-9]+$/, 'Phone number must contain only digits')
});

export const documentUploadSchema = z.object({
  businessName: z.string()
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name must be less than 100 characters'),
  ownerName: z.string()
    .min(2, 'Owner name must be at least 2 characters')
    .max(100, 'Owner name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Owner name must contain only letters and spaces'),
  storeCategory: z.string()
    .min(1, 'Please select a store category'),
  monthlyTurnover: z.number()
    .min(0, 'Turnover cannot be negative')
    .max(1000000, 'Turnover cannot exceed 10L'),
  pincode: z.string()
    .length(6, 'Pincode must be exactly 6 digits')
    .regex(/^[0-9]+$/, 'Pincode must contain only digits')
});

export const kycDocumentSchema = z.object({
  panFile: z.instanceof(File, { message: 'PAN card is required' })
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      'Only JPG, PNG, or PDF files are allowed'
    ),
  gstFile: z.instanceof(File).optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      'Only JPG, PNG, or PDF files are allowed'
    )
});

export const agreementSchema = z.object({
  agreed: z.boolean().refine((val) => val === true, 'You must agree to the terms and conditions'),
  hasSignature: z.boolean().refine((val) => val === true, 'Digital signature is required')
});

export const lenderSelectionSchema = z.object({
  selectedLenders: z.array(z.string())
    .min(1, 'Please select at least one lender')
});
