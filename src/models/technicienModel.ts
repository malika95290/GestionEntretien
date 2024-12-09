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
            return rows;
        } catch (error) {
            return error;
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
            return rows;
        } catch (error) {
            return error;
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
            console.log(query)
            const rows = await pool.query(query);
            return rows;
        } catch (error) {
            console.error(error);
            return error;
        } finally {
            if (connection) connection.release();
        }
    },

    // Ajouter un technicien
    addOne: async (technicien: Technicien) => {
        let connection;
        try {
            connection = await pool.getConnection();
            const rows = await pool.query(
                `INSERT INTO technicien (nom, prenom, specialite) 
                 VALUES ("${technicien.nom}", "${technicien.prenom}", 
                 "${technicien.specialite}");`
            );
            return rows;
        } catch (error) {
            return error;
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
            return rows;
        } catch (error) {
            throw error;
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
    
            return rows;
        }
        } catch (error) {
        return error;
        } finally {
        if (connection) connection.release();
        }
    }  
};
