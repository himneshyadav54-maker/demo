/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EnquiryData {
  name: string;
  phone: string;
  guests: number | string;
  date: string;
  type: string;
  notes?: string;
}

/**
 * Normalizes a phone number for WhatsApp wa.me links
 * e.g., "+91 72477 88888" -> "917247788888"
 */
export function sanitizePhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

/**
 * Builds a direct wa.me link with encoded pre-filled text
 */
export function buildWhatsAppUrl(phoneNumber: string, messageText: string): string {
  const cleanNumber = sanitizePhoneForWhatsApp(phoneNumber);
  const encodedText = encodeURIComponent(messageText.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Formats a clean, courteous WhatsApp message for package enquiry
 */
export function formatPackageEnquiryMessage(packageName: string, resortName: string = "Shree Balaji Jungle Resorts"): string {
  return `Hello ${resortName}! I would like to enquire about details and availability for the "${packageName}" package. Please share the details.`;
}

/**
 * Formats a structured WhatsApp message from the Enquiry Form
 */
export function formatEnquiryMessage(data: EnquiryData, resortName: string = "Shree Balaji Jungle Resorts"): string {
  const lines = [
    `*Booking Enquiry for ${resortName}*`,
    `--------------------------------`,
    `• *Guest Name:* ${data.name.trim()}`,
    `• *Contact Phone:* ${data.phone.trim()}`,
    `• *Enquiry Type:* ${data.type}`,
    `• *Number of Guests:* ${data.guests}`,
    `• *Preferred Date:* ${data.date}`,
  ];

  if (data.notes && data.notes.trim()) {
    lines.push(`• *Special Notes:* ${data.notes.trim()}`);
  }

  lines.push(`--------------------------------`);
  lines.push(`Kindly let me know the availability, package pricing, and how to proceed. Thank you!`);

  return lines.join('\n');
}

/**
 * Form validation helper for the booking enquiry form
 */
export function validateEnquiryForm(data: Partial<EnquiryData>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Please enter your name';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'Please enter your contact number';
  } else {
    const digitsOnly = data.phone.replace(/[^\d]/g, '');
    if (digitsOnly.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
  }

  if (!data.guests) {
    errors.guests = 'Please specify number of guests';
  } else {
    const num = Number(data.guests);
    if (isNaN(num) || num < 1) {
      errors.guests = 'Number of guests must be at least 1';
    }
  }

  if (!data.date || !data.date.trim()) {
    errors.date = 'Please select a preferred date';
  }

  if (!data.type || !data.type.trim()) {
    errors.type = 'Please select an experience type';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
