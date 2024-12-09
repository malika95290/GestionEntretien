//********** Imports **********/
import { pool } from "./bdd";
import { Avion } from "../types/types";

//********** Model **********//
export const avionModel = {
  getAll: async () => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query("select * from avion");
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },

  getByImmatriculation: async (immatriculation: string) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `select * from avion where immatriculation = "${immatriculation}"`
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },

  getWithFilters: async (
    params: Record<string, string | number | undefined>
  ) => {

    let connection;
    try {
      connection = await pool.getConnection();
      let query = "select * from avion where ";
      Object.keys(params).forEach((item, index) => {
        if (item === "marque") {
          query += `${item} = "${params[item]}"`;
        }
        if (item === "modele") {
          query += `${item} = "${params[item]}"`;
        }
        if (index != Object.keys(params).length - 1) {
          query += " and ";
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

  addOne: async (avion: Avion) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const rows = await pool.query(
        `insert into avion(immatriculation, marque, modele) 
						values("${avion.immatriculation}", "${avion.marque}", 
						"${avion.modele}");`
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
    }
  },

  delete: async (immatriculation: string) => {
    let connection;
    try {
      // Requête SQL pour supprimer un avion
      const query = "DELETE FROM avion WHERE immatriculation = ?";
      connection = await pool.getConnection(); // Obtenir une connexion à la base de données
      const result = await connection.query(query, [immatriculation]); // Exécuter la requête
      return result; // Retourner les résultats de la suppression
    } catch (error) {
      throw error; // Propager l'erreur
    } finally {
      if (connection) connection.release(); // Libérer la connexion
    }
  },

  update: async (params: Record<string, string | number | undefined>) => {
    let connection;
    try {
      if (params["immatriculation"] && Object.keys(params).length > 1) {
        let query = "update avion set ";

        Object.keys(params).forEach((item, index) => {
          if (item === "marque") {
            query += `${item} = "${params[item]}"`;
            if (index != Object.keys(params).length - 1) {
              query += ", ";
            }
          }
          if (item === "modele") {
            query += `${item} = "${params[item]}"`;
            if (index != Object.keys(params).length - 1) {
              query += ", ";
            }
          }
        });
        query += ` where immatriculation = "${params["immatriculation"]}"`;
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