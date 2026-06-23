import { z } from 'zod';

export const Step1Schema = z.object({
  track: z.enum(['celpip', 'det', 'corporate']),
});

export const Step2CelpipSchema = z.object({
  targetScore: z.string().min(1, 'Target score is required'),
  examDate: z.string().min(1, 'Exam date is required'),
  currentLevel: z.enum(['below-7', '7', '8', '9-plus']),
  weakestSkill: z.array(z.string()).min(1, 'Select at least one skill to focus on'),
});

export const Step2DetSchema = z.object({
  targetScore: z.string().min(1, 'Target score is required'),
  testDate: z.string().min(1, 'Test date is required'),
  prepStatus: z.enum(['not-started', 'some-prep', 'retaking']),
});

export const Step2CorporateSchema = z.object({
  role: z.string().min(2, 'Please enter your professional role'),
  industry: z.string().min(2, 'Please enter your industry'),
  challenge: z.array(z.string()).min(1, 'Select at least one communication challenge'),
});

export const Step3Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  timezone: z.string().min(1, 'Please select your timezone'),
  message: z.string().optional(),
});

export type Track = 'celpip' | 'det' | 'corporate';
export type Step1Data = z.infer<typeof Step1Schema>;
export type Step3Data = z.infer<typeof Step3Schema>;
export type Step2CelpipData = z.infer<typeof Step2CelpipSchema>;
export type Step2DetData = z.infer<typeof Step2DetSchema>;
export type Step2CorporateData = z.infer<typeof Step2CorporateSchema>;

export type MasterFormData = {
  track: Track;
  // Step 2 Celpip
  celpipTargetScore?: string;
  celpipExamDate?: string;
  celpipCurrentLevel?: string;
  celpipWeakestSkill?: string[];
  // Step 2 Det
  detTargetScore?: string;
  detTestDate?: string;
  detPrepStatus?: string;
  // Step 2 Corporate
  corporateRole?: string;
  corporateIndustry?: string;
  corporateChallenge?: string[];
  // Step 3 Contact
  name: string;
  email: string;
  phone?: string;
  timezone: string;
  message?: string;
};
