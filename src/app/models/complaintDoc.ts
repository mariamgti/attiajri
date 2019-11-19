import { Complaint } from './complaint';



export interface ComplaintDoc {
    id_doc: number,
    fileName: string,
    fileContent: Blob,
    complaint: Complaint;


}