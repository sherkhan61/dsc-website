/**
 * TypeScript type definitions for ЦЦБ Website
 */

// SEO Meta Types
export interface SEOProps {
  title: string;
  description: string;
  pathname?: string;
  image?: string;
  article?: boolean;
  keywords?: string[];
}

// Service Types
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  icon: string;
  category: ServiceCategory;
}

export type ServiceCategory = 
  | "code-analysis" 
  | "security-testing" 
  | "certification" 
  | "audit";

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  csrfToken?: string;
}

export interface ServiceRequestFormData extends ContactFormData {
  service: string;
  organization?: string;
  preferredDate?: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
  general?: string;
}

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errors: FormErrors;
}

// Navigation Types
export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

// Organization Schema
export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
    postalCode: string;
  };
  contactPoint: {
    "@type": string;
    telephone: string;
    email: string;
    contactType: string;
    availableLanguage: string[];
  };
  sameAs: string[];
}

// Document Types
export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  downloadUrl?: string;
  viewUrl?: string;
  date: string;
}

// Accreditation Types
export interface Accreditation {
  id: string;
  title: string;
  issuer: string;
  number: string;
  validFrom: string;
  validTo: string;
  scope: string[];
  documentUrl?: string;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo?: string;
  bio?: string;
  certifications?: string[];
}

// Client/Partner Types
export interface Partner {
  id: string;
  name: string;
  logo?: string;
  url?: string;
  category: "client" | "partner" | "government";
}

// FAQ Types
export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

// Statistics Types
export interface Statistic {
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: {
    display: string;
    body: string;
    mono: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}
