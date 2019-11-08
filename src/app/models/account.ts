
export interface Account {
  /** Code banque */
  bankCode: String;

  /** Code agence */
  branchCode: String;

  /** Code devise iso */
  isoCurrencyCode: String;

  /** Code devise amplitude (numérique) */
  amplitudeCurrencyCode: String;

  /** Numéro */
  number: String;

  /** Suffixe */
  suffix: String;

  /** Libellé */
  title: String;

  /** Clé */
  key: String;

  /** Code client */
  customerCode: String;

  /** Solde actuel en devise du compte */
  currentBalance: Number;

  /** Montant disponible en devise du compte */
  availableAmount: Number;
}

