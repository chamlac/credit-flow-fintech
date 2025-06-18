
// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// User Entity Structure
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  profileCompletion: number;
  verified: boolean;
  phoneVerified: boolean;
  emailVerified: boolean;
  enabled: boolean;
  userPhoto?: Media;
  ekyc?: EKYC;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

// EKYC Entity Structure
export interface EKYC {
  id: number;
  nationalId?: string;
  companyName: string;
  businessSector: string;
  businessPurpose: string;
  address?: string;
  city?: string;
  country: string;
  postalCode?: string;
  companyRegistrationNumber?: string;
  companyEstablishedDate?: string;
  bankAccountNumber?: string;
  bankName?: string;
  monthlyRevenue?: number;
  annualRevenue?: number;
  numberOfEmployees?: number;
  requestedCreditAmount?: number;
  creditPurpose?: string;
  documents: Document[];
  status: 'DRAFT' | 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  score: number;
  maxScore: number;
  reviewComments?: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: number;
  createdAt: string;
  updatedAt: string;
}

// Document Entity Structure
export interface Document {
  id: number;
  type: 'NATIONAL_ID' | 'PASSPORT' | 'COMPANY_REGISTRATION' | 'BANK_STATEMENT' | 'FINANCIAL_STATEMENT' | 'TAX_CERTIFICATE' | 'OTHER';
  name: string;
  description?: string;
  required: boolean;
  verified: boolean;
  processingNotes?: string;
  processedAt?: string;
  processedBy?: number;
  extractedData?: string;
  dataExtracted: boolean;
  dataExtractedAt?: string;
  mediaFiles: Media[];
  createdAt: string;
  updatedAt: string;
}

// Media Entity Structure
export interface Media {
  id: number;
  mediaUrl: string;
  mediaId?: string;
  originalFileName?: string;
  mimeType?: string;
  fileSize?: number;
  mediaType: 'IMAGE' | 'PDF' | 'OTHER';
  uploadedAt: string;
}

// Notification Structure
export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  read: boolean;
  sent: boolean;
  createdAt: string;
  readAt?: string;
  sentAt?: string;
}

// Authentication DTOs
export interface LoginRequest {
  userNameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expirationTime: number;
  role: string;
  userId: number;
  fullName: string;
  verified: boolean;
  phoneVerified: boolean;
  emailVerified: boolean;
  profileCompletion: number;
  nextSteps: string[];
}

// User Registration DTOs
export interface CustomerRequestDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

// OTP DTOs
export interface OTPRequestDto {
  phone: string;
}

export interface OTPVerifyDto {
  phone: string;
  otpCode: string;
}

export interface OTPResponseDto {
  message: string;
  success: boolean;
  expiryTime: string;
}

// eKYC DTOs
export interface EKYCRequestDto {
  nationalId?: string;
  companyName: string;
  businessSector: string;
  businessPurpose: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  companyRegistrationNumber?: string;
  companyEstablishedDate?: string;
  bankAccountNumber?: string;
  bankName?: string;
  monthlyRevenue?: number;
  annualRevenue?: number;
  numberOfEmployees?: number;
  requestedCreditAmount?: number;
  creditPurpose?: string;
}

export interface EKYCResponseDto {
  id: number;
  nationalId?: string;
  companyName: string;
  businessSector: string;
  businessPurpose: string;
  address?: string;
  city?: string;
  country: string;
  postalCode?: string;
  companyRegistrationNumber?: string;
  companyEstablishedDate?: string;
  bankAccountNumber?: string;
  bankName?: string;
  monthlyRevenue?: number;
  annualRevenue?: number;
  numberOfEmployees?: number;
  requestedCreditAmount?: number;
  creditPurpose?: string;
  status: 'DRAFT' | 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  score: number;
  maxScore: number;
  scorePercentage: number;
  reviewComments?: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: number;
  createdAt: string;
  updatedAt: string;
  documents: DocumentResponseDto[];
}

// Document DTOs
export interface DocumentUploadDto {
  ekycId: number;
  documentType: 'NATIONAL_ID' | 'PASSPORT' | 'COMPANY_REGISTRATION' | 'BANK_STATEMENT' | 'FINANCIAL_STATEMENT' | 'TAX_CERTIFICATE' | 'OTHER';
  documentName: string;
  description?: string;
  required?: boolean;
}

export interface DocumentResponseDto {
  id: number;
  type: 'NATIONAL_ID' | 'PASSPORT' | 'COMPANY_REGISTRATION' | 'BANK_STATEMENT' | 'FINANCIAL_STATEMENT' | 'TAX_CERTIFICATE' | 'OTHER';
  name: string;
  description?: string;
  required: boolean;
  verified: boolean;
  processingNotes?: string;
  processedAt?: string;
  processedBy?: number;
  extractedData?: string;
  dataExtracted: boolean;
  dataExtractedAt?: string;
  createdAt: string;
  updatedAt: string;
  mediaFiles: MediaResponseDto[];
}

// Media DTOs
export interface MediaResponseDto {
  id: number;
  mediaId?: string;
  mediaUrl: string;
  originalFileName?: string;
  mimeType?: string;
  fileSize?: number;
  mediaType: 'IMAGE' | 'PDF' | 'OTHER';
  uploadedAt: string;
}

// Notification DTOs
export interface NotificationResponseDto {
  id: number;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
  readAt?: string;
}
