import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizePhoneForWhatsApp,
  buildWhatsAppUrl,
  formatPackageEnquiryMessage,
  formatEnquiryMessage,
  validateEnquiryForm,
} from './booking';

test('sanitizePhoneForWhatsApp removes spaces, plus, and non-digit characters', () => {
  assert.equal(sanitizePhoneForWhatsApp('+91 72477 88888'), '917247788888');
  assert.equal(sanitizePhoneForWhatsApp('72477-88888'), '7247788888');
});

test('buildWhatsAppUrl constructs proper wa.me link with encoded text', () => {
  const url = buildWhatsAppUrl('+91 72477 88888', 'Hello World!');
  assert.equal(url, 'https://wa.me/917247788888?text=Hello%20World!');
});

test('formatPackageEnquiryMessage produces friendly message with package name', () => {
  const msg = formatPackageEnquiryMessage('Day Outing', 'Shree Balaji Jungle Resorts');
  assert.match(msg, /Day Outing/);
  assert.match(msg, /Shree Balaji Jungle Resorts/);
});

test('formatEnquiryMessage structures all user fields correctly', () => {
  const msg = formatEnquiryMessage({
    name: 'Rahul Sharma',
    phone: '9876543210',
    guests: 8,
    date: '2026-11-20',
    type: 'Day Outing',
    notes: 'Vegetarian lunch preferred',
  });

  assert.match(msg, /Rahul Sharma/);
  assert.match(msg, /9876543210/);
  assert.match(msg, /Day Outing/);
  assert.match(msg, /8/);
  assert.match(msg, /2026-11-20/);
  assert.match(msg, /Vegetarian lunch preferred/);
});

test('validateEnquiryForm catches invalid fields', () => {
  const invalid = validateEnquiryForm({
    name: '',
    phone: '123',
    guests: 0,
    date: '',
    type: '',
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.guests);
  assert.ok(invalid.errors.date);
  assert.ok(invalid.errors.type);
});

test('validateEnquiryForm passes valid data', () => {
  const valid = validateEnquiryForm({
    name: 'Priya Verma',
    phone: '+91 98765 43210',
    guests: 4,
    date: '2026-12-05',
    type: 'Overnight Stay',
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
