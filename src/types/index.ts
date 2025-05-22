export interface VisitorInfo {
  visitorName: string;
  hostName: string;
  purpose: string;
  duration: string;
  visitDate: string;
  ticketNumber?: string;
  hasAgreedToTerms?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FormData {
  visitorName: string;
  hostName: string;
  purpose: string;
  duration: string;
}

export interface TicketFormData {
  ticketNumber: string;
  hasAgreedToTerms: boolean;
}
