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
    idTechnicien: number;
    immatriculation: string;
    dateEntretien: string;
    remarque: string;
    typeEntretien: string;
}