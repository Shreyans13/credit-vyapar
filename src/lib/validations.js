import { z } from "zod";

// Step 2: Login & OTP
export const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long")
    .regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone number format"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

// Step 3: Personal Details
export const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name too long")
    .regex(/^[a-zA-Z\s]+$/, "First name should only contain letters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name too long")
    .regex(/^[a-zA-Z\s]+$/, "Last name should only contain letters"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Please select a gender"),
  age: z
    .string()
    .refine((val) => {
      const num = parseInt(val);
      return num >= 18 && num <= 120;
    }, "Age must be between 18 and 120"),
  employmentType: z.string().min(1, "Please select employment type"),
  monthlyIncome: z
    .string()
    .refine((val) => parseFloat(val) > 0, "Monthly income must be greater than 0"),
  employerName: z
    .string()
    .min(2, "Employer name must be at least 2 characters")
    .max(100, "Employer name too long"),
  homeOwnership: z.string().min(1, "Please select home ownership status"),
  industry: z
    .string()
    .min(2, "Industry must be at least 2 characters")
    .max(100, "Industry name too long"),
});

// Step 4: Verification Summary - only needs consent checkbox
export const verificationConsentSchema = z.object({
  consentChecked: z.boolean().refine((val) => val === true, {
    message: "You must consent to the credit bureau check",
  }),
});

// Step 5 & 6: Loan Offers/Offer Details - no validation needed, just selection

// Step 7: KYC Verification - no validation, just proceed

// Step 8: Repayment Setup - no validation needed

// Step 9: Loan Agreement
export const loanAgreementSchema = z.object({
  agreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

// Step 10: Final Verification
export const finalOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

// Helper function to format Zod errors
export const formatZodErrors = (error) => {
  const formattedErrors = {};
  error.errors.forEach((err) => {
    const field = err.path[0];
    formattedErrors[field] = err.message;
  });
  return formattedErrors;
};
