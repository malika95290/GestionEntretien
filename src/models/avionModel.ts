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

      if (rows.length === 0) {
        throw new Error(`AUCUN AVION`);
      }
      return rows;
    } catch (error) {
      throw new Error(`Aucun avion trouvé`);
      ;
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

      // Vérification si des résultats ont été trouvés
      if (rows.length === 0) {
        // Si aucun avion n'a été trouvé, lancer une erreur avec un message spécifique
        throw new Error(`AUCUN AVION TROUVE - AVEC L'IMMATRICULATION : ${immatriculation}`);
      }
      return rows;
    } catch (error) {
      throw new Error(`Aucun avion trouvé ayant l'immatriculation : ${immatriculation}`);
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
      if (rows.length === 0) {
        // Si aucun avion n'a été trouvé, lancer une erreur avec un message spécifique
        throw new Error(`AUCUN AVION TROUVE - AVEC LES FILTRES DONNES ${JSON.stringify(params)}`);
      }
      return rows;
    } catch (error) {
      throw new Error(`Aucun avion trouvé ayant les filtres donnés ${JSON.stringify(params)}`);
    } finally {
      if (connection) connection.release();
    }
  },

  addOne: async (avion: { immatriculation: any; marque: any; modele: any; }) => {
    let connection;
    try {
        // Validation des champs requis
        if (!avion.immatriculation || !avion.marque || !avion.modele) {
            throw new Error(
                "AUCUN AVION AJOUTE ? Peut-être manque-t-il des données ?"
            );
        }

        connection = await pool.getConnection();

        const rows = await connection.query(
            `INSERT INTO avion (immatriculation, marque, modele) 
             VALUES (?, ?, ?);`,
            [avion.immatriculation, avion.marque, avion.modele] // Utilisation des paramètres pour éviter les injections SQL
        );

        if (!rows.affectedRows) {
            throw new Error("AUCUN AVION AJOUTE");
        }

        return rows;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(
                error.message || "AUCUN AVION AJOUTE ? Peut-être manque-t-il des données ?"
            );
        } else {
            throw new Error("Une erreur inconnue est survenue.");
        }
    } finally {
        if (connection) connection.release();
    }
},

  // Requête SQL pour supprimer un avion
  delete: async (immatriculation: string) => {
    let connection;
    try {
      const query = "DELETE FROM avion WHERE immatriculation = ?";
      connection = await pool.getConnection(); 
      const result = await connection.query(query, [immatriculation]); 

      if (result.affectedRows === 0) {
        throw new Error(`AUCUN AVION SUPPRIME - Peut-être que l'immatriculation n'existe pas en BDD.`);
      }
      return result;
    } catch (error) {
        throw new Error(`AUCUN AVION SUPPRIME - Peut-être que l'immatriculation n'existe pas en BDD.`);
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
        });
        query += ` where immatriculation = "${params["immatriculation"]}"`;
        connection = await pool.getConnection();
        const rows = await pool.query(query);
        console.log(rows)
        if (rows.affectedRows === 0) {
          throw new Error(`AUCUN AVION MODIFIE - Peut-être que l'immatriculation n'existe pas en BDD.`);
        }
        return rows;
      }
    } catch (error) {
        throw new Error(`AUCUN AVION MODIFIE - Peut-être que l'immatriculation n'existe pas en BDD.`);
      } finally {
      if (connection) connection.release();
    }
  },
};