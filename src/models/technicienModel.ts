//********** Imports **********//
import { pool } from '../models/bdd';
import { Technicien } from '../types/types'; 

//********** Model **********//
export const technicienModel = {
    // Récupérer tous les techniciens
    getAll: async () => {
        let connection;
        try {
            connection = await pool.getConnection();
            const rows = await pool.query("SELECT * FROM technicien");

            if (rows.length === 0) {
                throw new Error(`AUCUN TECHNICIEN TROUVE`);
              }
            return rows;
        } catch (error) {
            throw new Error(`AUCUN TECHNICIEN TROUVE`);
        } finally {
            if (connection) connection.release();
        }
    },

    // Récupérer un technicien par ID
    getById: async (id: number) => {
        let connection;
        try {
            connection = await pool.getConnection();
            const rows = await pool.query(
                `SELECT * FROM technicien WHERE id = ${id}`
            );

            // Vérification si des résultats ont été trouvés
            if (rows.length === 0) {
                // Si aucun avion n'a été trouvé, lancer une erreur avec un message spécifique
                throw new Error(`AUCUN AVION TROUVE - AVEC L'IMMATRICULATION : ${id}`);
            }
            return rows;
        } catch (error) {
            throw new Error(`Aucun technicien trouvé ayant l'id : ${id}`);
        } finally {
            if (connection) connection.release();
        }
    },

    // Récupérer des techniciens avec filtres
    getWithFilters: async (
        params: Record<string, string | undefined>
    ) => {
        let connection;
        try {
            connection = await pool.getConnection();
            let query = "SELECT * FROM technicien WHERE ";
            Object.keys(params).forEach((item, index) => {
                if (item === "nom") {
                    query += `${item} = "${params[item]}"`;
                }
                if (item === "prenom") {
                    query += `${item} = "${params[item]}"`;
                }
                if (item === "specialite") {
                    query += `${item} = "${params[item]}"`;
                }
                if (index != Object.keys(params).length - 1) {
                    query += " AND ";
                }
            });
            const rows = await pool.query(query);
            if (rows.length === 0) {
                throw new Error(`AUCUN TECHNICIEN TROUVE - AVEC LES FILTRES DONNES ${JSON.stringify(params)}`);
              }
            return rows;
        } catch (error) {
            throw new Error(`AUCUN TECHNICIEN TROUVE - AVEC LES FILTRES DONNES ${JSON.stringify(params)}`);
        } finally {
            if (connection) connection.release();
        }
    },

    // Ajouter un technicien
    addOne: async (technicien: { nom: any; prenom: any; specialite: any; }) => {
        let connection;
        try {
            if (!technicien.nom || !technicien.prenom || !technicien.specialite) {
                throw new Error(
                    "AUCUN TECHNICIEN AJOUTE ? Peut-être manque-t-il des données ?"
                );
            }
            connection = await pool.getConnection();
            const rows = await connection.query(
                `INSERT INTO technicien (nom, prenom, specialite) 
                 VALUES (?, ?, ?);`,
                [technicien.nom, technicien.prenom, technicien.specialite] // Utilisation des paramètres pour éviter les injections SQL
            );
            if (!rows.affectedRows) {
                throw new Error("AUCUN TECHNICIEN AJOUTE ? Peut-être manque-t-il des données ?");
            }
            return rows;
        } catch (error) {
            throw new Error("AUCUN TECHNICIEN AJOUTE ? Peut-être manque-t-il des données ?");
        } finally {
            if (connection) connection.release();
        }
    },
    

    // Supprimer un technicien par ID
    delete: async (id: number) => {
        let connection;
        try {
            connection = await pool.getConnection();
            const rows = await connection.query(
                `DELETE FROM technicien WHERE id = ?`, [id]
            );

            if (rows.affectedRows === 0) {
                throw new Error(`AUCUN TECHNICIEN SUPPRIME - Peut-être que l'id n'existe pas en BDD.`);
            }
            return rows;
        } catch (error) {
            throw new Error(`AUCUN TECHNICIEN SUPPRIME - Peut-être que l'id n'existe pas en BDD.`);
        } finally {
            if (connection) connection.release();
        }
    },  
      
    // Méthode pour mettre à jour un technicien
    update: async (params: Record<string, string | number | undefined>) => {
        let connection;
        try {
        // Vérification que l'id est bien présent dans les paramètres
        if (params["id"] && Object.keys(params).length > 1) {
            let query = "UPDATE technicien SET ";
    
            // Ajout des colonnes à mettre à jour
            Object.keys(params).forEach((item, index) => {
            if (item === "nom" || item === "prenom" || item === "specialite") {
                query += `${item} = "${params[item]}"`;
                if (index != Object.keys(params).length - 1) {
                query += ", ";
                }
            }
            });
    
            // Condition sur l'id du technicien à mettre à jour
            query += ` WHERE id = ${params["id"]}`;
    
            // Exécution de la requête SQL
            connection = await pool.getConnection();
            const rows = await connection.query(query);
            if (rows.affectedRows === 0) {
                throw new Error(`AUCUN TECHNICIEN MODIFIE - Peut-être que l'id n'existe pas en BDD. Le technicien n’a pas été mis à jour`);
            }
            return rows;
        }
        } catch (error) {
            throw new Error(`AUCUN TECHNICIEN MODIFIE - Peut-être que l'id n'existe pas en BDD. Le technicien n’a pas été mis à jour`);
        } finally {
        if (connection) connection.release();
        }
    }  
};
