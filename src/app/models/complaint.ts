import { ClientModel } from './client.model';
import { ComplaintObject } from './complaintObject';
import { DocumentHeader } from './documentHeader';
export interface Complaint {
    complRef: number,
    complDetails: string,
    inputDate: Date,
    state: string,
    complTreatmentDate: Date,
    bankResponse: string,
    login: string,
    phone: string,
    homeAddress: string,
    city: string,
    podst_code: string,
    autre_prof: string,
    flg_supp: string,
    incedent_date: Date,
    client: ClientModel,
    complaintObject: ComplaintObject,
    documentHeader: DocumentHeader,

}