export interface Highlight {
  _id: string;
  icon: string;
  label: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  contactInfo: {
    phone: string;
    assistanceText: string;
  };
  highlights: Highlight[];
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export interface Reason {
  _id: string;
  title: string;
  imageSrc: string;
  description: string;
  icon: string;
  imageUrl?: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  className?: string;
}

export interface Testimonial {
  _id: string;
  quote: string;
  rating: number;
  name: string;
  title: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export interface Contact {
  phone: string;
  email: string;
  whatsapp: string;
  hours: string;
  address: string;
}

export interface Footer {
  companyDescription: string;
  privacyPolicyLink: string;
  termsAndConditionsLink: string;
  location: string;
}

export interface CMSData {
  hero: Hero | null;
  services: Service[];
  reasons: Reason[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faq: FAQ[];
  contact: Contact | null;
  footer: Footer | null;
}
