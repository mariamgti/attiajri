import { ClientModel } from './ClientModel';
import { ComplaintObject } from './ComplaintObject';
import { DocumentHeader } from './DocumentHeader';
import { AccountModel } from './AccountModel';
export class Complaint {
    complRef: number;
    complDetails: string;
    inputDate: Date;
    state: string;
    complTreatmentDate: Date;
    bankResponse: string;
    login: string;
    phone: string;
    homeAddress: string;
    city: string;
    postCode: string;
    autre_prof: string;
    flgSupp: number;
    incedentDate: Date;
    client: ClientModel;
    complaintObject: ComplaintObject;
    documentHeader: DocumentHeader;
    account: AccountModel;
}