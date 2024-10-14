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
        params: Record<string, string | number | undefined>
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
            return rows;
        } catch (error) {
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
            const rows = await pool.query(
                `DELETE FROM technicien WHERE id = ${id}`
            );
            return rows;
        } catch (error) {
            return error;
        } finally {
            if (connection) connection.release();
        }
    },

    // Mettre à jour un technicien
    update: async (params: Record<string, string | number | undefined>) => {
        let connection;
        try {
            if (params["id"] && Object.keys(params).length > 1) {
                let query = "UPDATE technicien SET ";

                Object.keys(params).forEach((item, index) => {
                    if (item === "nom") {
                        query += `${item} = "${params[item]}"`;
                        if (index != Object.keys(params).length - 1) {
                            query += ", ";
                        }
                    }
                    if (item === "prenom") {
                        query += `${item} = "${params[item]}"`;
                        if (index != Object.keys(params).length - 1) {
                            query += ", ";
                        }
                    }
                    if (item === "specialite") {
                        query += `${item} = "${params[item]}"`;
                        if (index != Object.keys(params).length - 1) {
                            query += ", ";
                        }
                    }
                });
                query += ` WHERE id = ${params["id"]}`;
                connection = await pool.getConnection();
                const rows = await pool.query(query);

                return rows;
            }
        } catch (error) {
            return error;
        } finally {
            if (connection) connection.release();
        }
    },
};
