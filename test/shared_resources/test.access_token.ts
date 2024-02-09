import { SignUpDto } from 'auth/dto';
import * as pactum from 'pactum';

let accessToken: string;
export function setAccessToken(token: string) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export async function createAccessToken() {
  const dto: SignUpDto = {
    firstName: 'Zziwa',
    lastName: 'Raymond',
    nationality: 'Ugandan',
    email: 'raymondzian@gmail.com',
    tel1: '0775563805',
    tel2: '0775149572',
    nok_firstName: 'mukiibi',
    nok_lastName: 'reagan',
    nok_relationship: 'brother',
    nok_tel1: '0202',
    nok_tel2: '0101',
    nok_email: 'test@gmail.com',
    profileImage: 'testimage',
    primaryPosition: 'Forward',
    secondaryPosition: 'Midfielder',
    educationLevel: 'College',
    category: 'U-17',
    password: 'Testpassword12',
    preferredFoot: 'right',
    dob: new Date('2001-07-02T12:00:00.000Z'),
    registeredAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };
  const response = await pactum
    .spec()
    .post('/auth/talentsignup')
    .withBody(dto)
    .expectStatus(201);
  setAccessToken(response.body.access_token);
}
