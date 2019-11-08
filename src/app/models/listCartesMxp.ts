import { DocumentHeader } from './documentHeader';
import { CarteMxp } from './CarteMxp';

export interface ListCartesMxp {
    
    documentHeader: DocumentHeader,
    listCartesMxp: [CarteMxp]

}