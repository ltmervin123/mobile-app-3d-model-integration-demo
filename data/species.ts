// src/data/species.ts
export interface Species {
  commonName: string;
  scientificName: string;
  family: string;
  order: string;
  habitat: string;
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered";
}

export const butterflyData: Species = {
  commonName: "Monarch Butterfly",
  scientificName: "Danaus plexippus",
  family: "Nymphalidae",
  order: "Lepidoptera",
  habitat: "Meadows, prairies, fields, and areas abundant in milkweed (their required host plant)",
  conservationStatus: "Endangered",
};