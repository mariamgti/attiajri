import { Profession } from './Profession';

export class ClientModel {
     codCli: number;
     nom: string;
     prenom: string;
     numDoc: number;
     email: string;
     phone: string;
     postCode: string;
     autre_prof: string;
     city: string;
     homeAddress: string;
     proffession:Profession;
}
