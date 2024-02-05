export class TalentProfileDto {
  profileImage: string;
  secondaryPosition: string;
  educationLevel: string;
  preferredFoot: string;
  govtDocumentImage: string;

  //incase of user-profile update --optional  fields
  oldPassword: string;
  newPassword: string;
}
