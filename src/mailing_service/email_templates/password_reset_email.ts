export async function passwordResetEmailTemplate(
  firstName: string,
  lastName: string,
  encryptionKey: string,
) {
  return `
      Dear ${firstName} ${lastName},

        As requested, here is your one-time encryption key to reset your password for Prosper Football Agency:

        One-Time Encryption Key: ${encryptionKey}

        Please note that this key is valid for a single use only and will expire shortly. 
        To reset your password, enter the above encryption key when prompted.

        If you did not request a password reset, please ignore this email or contact our support team immediately.

        Thank you for choosing Prosper Football Agency.

        Best regards,
        Prosper Football Agency
      `;
}
