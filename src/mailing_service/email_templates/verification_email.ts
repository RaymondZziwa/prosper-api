export async function emailVerificationTemplate(
  firstName: string,
  lastName: string,
  verificationKey: string,
) {
  return `
    Dear ${firstName} ${lastName},
      
    To complete your email address verification process, please enter the following verification code: ${verificationKey}.

    This code will expire in 15 minutes. If you didn't request this verification, please ignore this email.
    
    Once again, welcome aboard! We can't wait to see your skills in action on our platform.
    
    Best regards,
    Prosper Football Agency
    `;
}
