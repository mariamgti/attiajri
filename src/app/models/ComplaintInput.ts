import { ClientModel } from './ClientModel';
import { Complaint } from './Complaint';

export class ComplaintInput {
    complRef: number;
    complaint:Complaint
    objectCode : number;
    complDetails: string;
    inputDate: Date;
    login: string;
    phone: string;
    email:string;
    autreProf: string;
    incedentDate: Date;
    codeProf : number;
    client: ClientModel;
    numCpt:string;
    files : File []= [];
    isUpdate : boolean;
    flgSupp: number;
}