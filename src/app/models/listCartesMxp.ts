

import { DocumentHeader } from './DocumentHeader';
import { CarteMxp } from './CarteMxp';
export interface ListCartesMxp {
    documentHeader: DocumentHeader,
    listCartesMxp: [CarteMxp]
}