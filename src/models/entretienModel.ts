import { pool } from '../models/bdd';
import { Entretien } from '../types/types';

//********** Model **********//
export const entretienModel = {
    // Récupère tous les entretiens
    getAll: async () => {
      let connection;
      try {
        connection = await pool.getConnection();
        const rows = await pool.query("select * from entretien");
        return rows;
      } catch (error) {
        return error;
      } finally {
        if (connection) connection.release();
      }
    },

    // Récupère un entretien par son ID
    getById: async (id: string) => {
      let connection;
      try {
        connection = await pool.getConnection();
        const rows = await pool.query(
          `select * from entretien where id = "${id}"`
        );
        return rows;
      } catch (error) {
        return error;
      } finally {
        if (connection) connection.release();
      }
    },

    // Récupère les entretiens avec des filtres
    getWithFilters: async (params: Record<string, string | number | undefined>) => {
      let connection;
      try {
        connection = await pool.getConnection();
        let query = "select * from entretien where ";
        Object.keys(params).forEach((item, index) => {
          if (item === "dateEntretien") {
            query += `${item} = "${params[item]}"`;
          }
          if (item === "description") {
            query += `${item} = "${params[item]}"`;
          }
          if (item === "immatriculationAvion") {
            query += `${item} = "${params[item]}"`;
          }
          if (item === "idTechnicien") {
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

    // Ajoute un nouvel entretien
    addOne: async (entretien: Entretien) => {
      let connection;
      try {
        connection = await pool.getConnection();
        const rows = await pool.query(
          `insert into entretien(dateEntretien, description, immatriculationAvion, idTechnicien) 
                          values("${entretien.date}", "${entretien.description}", 
                          "${entretien.immatriculationAvion}", "${entretien.idTechnicien}");`
        );
        return rows;
      } catch (error) {
        return error;
      } finally {
        if (connection) connection.release();
      }
    },

    // Supprime un entretien par son ID
    delete: async (id: string) => {
      let connection;
      try {
        connection = await pool.getConnection();
        const rows = await pool.query(
          `delete from entretien where id = "${id}"`
        );
        return rows;
      } catch (error) {
        return error;
      } finally {
        if (connection) connection.release();
      }
    },

    // Met à jour un entretien
    update: async (params: Record<string, string | number | undefined>) => {
      let connection;
      try {
        if (params["id"] && Object.keys(params).length > 1) {
          let query = "update entretien set ";
  
          Object.keys(params).forEach((item, index) => {
            if (item === "dateEntretien") {
              query += `${item} = "${params[item]}"`;
              if (index != Object.keys(params).length - 1) {
                query += ", ";
              }
            }
            if (item === "description") {
              query += `${item} = "${params[item]}"`;
              if (index != Object.keys(params).length - 1) {
                query += ", ";
              }
            }
            if (item === "immatriculationAvion") {
              query += `${item} = "${params[item]}"`;
              if (index != Object.keys(params).length - 1) {
                query += ", ";
              }
            }
            if (item === "idTechnicien") {
              query += `${item} = "${params[item]}"`;
              if (index != Object.keys(params).length - 1) {
                query += ", ";
              }
            }
          });
          query += ` where id = "${params["id"]}"`;
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
