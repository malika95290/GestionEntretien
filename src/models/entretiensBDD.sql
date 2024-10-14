-- Création de la base de données
CREATE DATABASE GestionEntretiens;

-- Sélection de la base de données GestionEntretiens
USE GestionEntretiens;

-- Création deS tables Avion, Technicien et Entretien pour la base de données GestionEntretiens
CREATE TABLE avion (
    immatriculation VARCHAR(10) PRIMARY KEY,
    marque VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL
);

CREATE TABLE technicien (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    specialite VARCHAR(100) NOT NULL
);

CREATE TABLE entretien (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idTechnicien INT,
    immatriculation VARCHAR(10),
    dateEntretien DATE NOT NULL,
    remarque VARCHAR(200) NOT NULL,
    typeEntretien VARCHAR(100) NOT NULL,
    CONSTRAINT fk_immatriculation FOREIGN KEY (immatriculation) REFERENCES avion(immatriculation) ON DELETE CASCADE
    CONSTRAINT fk_idTechnicien FOREIGN KEY (idTechnicien) REFERENCES technicien(id) ON DELETE CASCADE,
);

-- Création d'un jeu de données pour les tables précédentes

INSERT INTO avion (immatriculation, marque, model) VALUES
('F-ABCD', 'Boeing', '737'),
('F-EFGH', 'Airbus', 'A320'),
('F-IJKL', 'Cessna', '172'),
('F-MNOP', 'Boeing', '747'),
('F-QRST', 'Embraer', 'E190');

INSERT INTO technicien (nom, prenom, specialite) VALUES
('Dupont', 'Jean', 'Mécanique'),
('Martin', 'Alice', 'Électronique'),
('Durand', 'Pierre', 'Mécanique'),
('Bernard', 'Sophie', 'Structure'),
('Leroy', 'Michel', 'Systèmes embarqués');

INSERT INTO entretien (idTechnicien, immatriculation, dateEntretien, remarque, typeEntretien) VALUES
(1, 'F-ABCD', '2024-01-15', 'Remplacement des freins', 'Révision générale'),
(2, 'F-EFGH', '2024-02-10', 'Mise à jour des systèmes de navigation', 'Révision technique'),
(3, 'F-IJKL', '2024-03-22', 'Changement du moteur', 'Réparation majeure'),
(4, 'F-MNOP', '2024-04-05', 'Inspection de la structure de l’avion', 'Inspection annuelle'),
(5, 'F-QRST', '2024-05-12', 'Vérification des systèmes électroniques', 'Révision technique');

