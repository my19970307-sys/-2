
export enum TicketStatus {
  PENDING = 'Pending',
  AWAITING = 'Awaiting Reply',
  OVERDUE = 'Overdue',
  COMPLETED = 'Completed'
}

export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  status: TicketStatus;
  overdueTime?: string;
  avatar?: string;
  isRead: boolean;
}

export interface MessagePart {
  id: string;
  sender: string;
  time: string;
  content: string;
  attachments?: {
    name: string;
    url: string;
    type: 'image' | 'file';
  }[];
}

export interface CustomerInfo {
  name: string;
  email: string;
  region: string;
  tags: string[];
}

export interface TicketDetails {
  owner: string;
  status: string;
  isSecure: boolean;
  productLine: string;
  sku: string;
  orderId: string;
  site: string;
  memo: string;
}
