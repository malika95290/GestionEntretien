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
      let query = "SELECT * FROM avion";
      
      // Ajout des filtres seulement s'il y a des paramètres
      const filterKeys = Object.keys(params).filter(key => params[key] !== undefined);
      if (filterKeys.length > 0) {
        query += " WHERE ";
        filterKeys.forEach((key, index) => {
          query += `${key} = ?`; // Utilisation de "?" pour éviter l'injection SQL
          if (index < filterKeys.length - 1) {
            query += " AND ";
          }
        });
      }
  
      const values = filterKeys.map(key => params[key]); // Valeurs correspondantes aux "?"
      
      const [rows] = await connection.query(query, values); // Exécution avec les valeurs
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
        `insert into avion(immatriculation, marque, modele, heuresDeVol) 
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
      connection = await pool.getConnection();
      const rows = await pool.query(
        `delete from avion where immatriculation = "${immatriculation}"`
      );
      return rows;
    } catch (error) {
      return error;
    } finally {
      if (connection) connection.release();
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
          if (item === "heuresDeVol") {
            query += `${item} = ${params[item]}`;
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