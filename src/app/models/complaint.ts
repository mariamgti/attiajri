import { ClientModel } from './client.model';
export interface Complaint {
    complRef: number,
    complDetails: string,
    inputDate: Date,
    state:string,
    complTreatmentDate:Date,
    bankResponse: string,
    client:ClientModel,




    

}