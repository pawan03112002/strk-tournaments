// Manual Payment Configuration

// Payment Methods
export const paymentMethods = {
  UPI: 'upi',
  BANK_TRANSFER: 'bank_transfer'
}

// UPI Payment Details
export const upiConfig = {
  upiId: import.meta.env.VITE_UPI_ID || 'yourname@paytm',
  qrCodeUrl: import.meta.env.VITE_UPI_QR_CODE_URL || '/upi-qr-code.png',
  displayName: 'STRK Tournaments'
}

// Bank Transfer Details
export const bankConfig = {
  accountName: import.meta.env.VITE_BANK_ACCOUNT_NAME || 'Your Name',
  accountNumber: import.meta.env.VITE_BANK_ACCOUNT_NUMBER || '1234567890',
  ifscCode: import.meta.env.VITE_BANK_IFSC || 'SBIN0001234',
  bankName: import.meta.env.VITE_BANK_NAME || 'State Bank of India',
  branch: import.meta.env.VITE_BANK_BRANCH || 'Main Branch'
}

// Payment amounts
export const paymentAmounts = {
  ENTRY_FEE: 500,  // ₹500 entry fee
  CURRENCY: 'INR'
}

// Payment status
export const paymentStatus = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
}
