export interface ChatTestCase {
  intent: string;
  queries: string[];
}

export const testCases: ChatTestCase[] = [
  {
    intent: "radno_vrijeme",
    queries: [
      "Kad radite?",
      "Koje je radno vrijeme?",
      "Do kada ste otvoreni danas?",
      "Radno vrjeme?",        // typo
      "Kad ste otvoreni?",    // variation
      "Jel radite sutra?",    // informal
      "Radno vrijeme pls"     // mix language
    ]
  },
  {
    intent: "ulaznice",
    queries: [
      "Koliko košta ulaznica?",
      "Cijena karata?",
      "Imate li popust za studente?",
      "Kolko je karta?",     // slang
      "Uaznice",             // typo
      "Ulaz pls",            // malformed
      "Cijna ulaznce"        // severe typo
    ]
  },
  {
    intent: "adresa",
    queries: [
      "Gdje se nalazite?",
      "Koja je adresa muzeja?",
      "Lokacija?",
      "gdj ste?",           // typo
      "Adrs muzeja?",       // malformed
      "Di je muzej?"        // dialect/slang
    ]
  },
  {
    intent: "danas_izlozbe",
    queries: [
      "Što ima danas od izložbi?",
      "Što je danas na programu?",
      "Koje izložbe su danas?",
      "Danas izlozbe?",     // typo
      "kaj ima za vidjet danas?", // slang
      "Program za danas pls"      // mix language
    ]
  },
  {
    intent: "kafic",
    queries: [
      "Imate li kafić?",
      "Gdje mogu popiti kavu?",
      "Di je kafić?",       // slang
      "Kafic?",             // malformed
      "Kafa gdje?",         // inverted
      "Imate kafeteriju?"   // synonym
    ]
  },
  {
    intent: "toaleti",
    queries: [
      "Gdje je WC?",
      "Gdje su toaleti?",
      "WC pls",             // slang
      "Toalt?",             // typo
      "Imate li zahod?",    // synonym
      "WC gdje se nalazi?"  // variation
    ]
  },
  {
    intent: "pristupacnost",
    queries: [
      "Jeste li pristupačni za invalidska kolica?",
      "Imate li dizalo?",
      "Kolica invalidska?", // malformed
      "Dali mogu u kolicima?", // informal
      "Pristup za invalide?",  // variation
      "Dizlo imate?"           // typo
    ]
  },
  {
    intent: "parking",
    queries: [
      "Ima li parking?",
      "Gdje mogu parkirati?",
      "Parking?",            // shorthand
      "Prking blizu?",       // typo
      "Gdje stavit auto?",   // slang
      "Parkirlište?"         // malformed
    ]
  },
  {
    intent: "clanstvo",
    queries: [
      "Nudite li članstvo?",
      "Kako postati član?",
      "Clanstvo?",          // malformed
      "Kako se uclanit?",   // typo
      "Imate li pretplatu?",// synonym
      "Članska karta?"      // variation
    ]
  },
  {
    intent: "kontakt",
    queries: [
      "Kako vas mogu kontaktirati?",
      "Broj telefona?",
      "Imate mail?",        // informal
      "kontakt?",           // malformed
      "Email adresa?",      // synonym
      "Kako stupiti u vezu?"// variation
    ]
  }
];
