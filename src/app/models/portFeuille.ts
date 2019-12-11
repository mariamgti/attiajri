

import { ShareAccount } from './ShareAccount';
export interface PortFeuille {
    code: number,
    libelle: string,
    quantity: number,
    blockedQty: number,
    exchangeRate: number,
    finalExchangeRate: number,
    PRMP: number,
    PRMPValue: number,
    latency: number,
    shareAccount: ShareAccount
}