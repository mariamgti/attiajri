
export interface PrepaidCardModel {
    numCarteP: number,
    numCpt: string,
    type_carte_p: string,
    visuel: Blob,
    dateExp: Date,
    plafond: number,
    statut: string,
    soldeDispo: number,
}
