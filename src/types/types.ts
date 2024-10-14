export interface Avion {
    immatriculation: string;
    marque: string;
    modele: string;
}

export interface Technicien {
    id: number;
    nom: string;
    prenom: string;
    specialite: string;
}

export interface Entretien {
    id: number; 
    idTechnicien: number;
    immatriculationAvion: string; 
    date: Date; 
    description?: string; 
    type: string; 
  }
  