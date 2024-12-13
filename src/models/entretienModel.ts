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

        if (rows.length === 0) {
          throw new Error(`AUCUN ENTRETIEN TROUVE`);
        }
        return rows;
      } catch (error) {
        throw new Error(`AUCUN ENTRETIEN TROUVE`);
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
        if (rows.length === 0) {
          throw new Error(`AUCUN ENTRETIEN TROUVE AVEC L'id : ${id}`);
        }
        return rows;
      } catch (error) {
        throw new Error(`Aucun entretien trouvé ayant l'id : ${id}`);
      } finally {
        if (connection) connection.release();
      }
    },

    getWithFilters: async (params: Record<string, string | number>) => {
      let connection;
      try {
        connection = await pool.getConnection();
    
        let query = "SELECT * FROM entretien WHERE ";
        const values: (string | number)[] = [];
        const keys = Object.keys(params);
    
        if (keys.length === 0) {
          query = "SELECT * FROM entretien";
        } else {
          keys.forEach((key, index) => {
            query += `${key} = ?`;
            values.push(params[key]);
            if (index !== keys.length - 1) query += " AND ";
          });
        }
        const rows = await connection.query(query, values);
        if (rows.length === 0) {
          throw new Error(`AUCUN ENTRETIEN TROUVE - AVEC LES FILTRES DONNES ${JSON.stringify(params)}`);
        }
        return rows;
      } catch (error) {
        throw new Error(`AUCUN ENTRETIEN TROUVE - AVEC LES FILTRES DONNES ${JSON.stringify(params)}`);
      } finally {
        if (connection) connection.release();
      }
    },

    // Ajoute un nouvel entretien
    addOne: async (entretien: { idTechnicien: any; immatriculation: any; dateEntretien: any; typeEntretien: any; remarque: any; }) => {
      let connection;
      try {
        // Validation des champs requis
          if (!entretien.idTechnicien || !entretien.immatriculation || !entretien.dateEntretien || !entretien.typeEntretien) {
              throw new Error(
                  "AUCUN ENTRETIEN AJOUTE ? Peut-être manque-t-il des données ?"
              );
          }
  
          connection = await pool.getConnection();
  
          const result = await connection.query(
              `INSERT INTO entretien (idTechnicien, immatriculation, dateEntretien, remarque, typeEntretien) 
               VALUES (?, ?, ?, ?, ?);`,
              [
                  entretien.idTechnicien,
                  entretien.immatriculation,
                  entretien.dateEntretien,
                  entretien.remarque || null,
                  entretien.typeEntretien
              ]
          );
  
          if (!result.affectedRows) {
              throw new Error("AUCUN ENTRETIEN AJOUTE");
          }
  
          return {
              id: Number(result.insertId),
              ...entretien
          };
      } catch (error) {
          if (error instanceof Error) {
              throw new Error(
                  error.message || "AUCUN ENTRETIEN AJOUTE ? Peut-être manque-t-il des données ?"
              );
          } else {
              throw new Error("AUCUN ENTRETIEN AJOUTE ? Peut-être manque-t-il des données ?");
          }
      } finally {
          if (connection) connection.release();
      }
  },
  
      delete: async (id: number) => {
        let connection;
        try {
            connection = await pool.getConnection(); // Obtenir une connexion
            const rows = await pool.query(
                `DELETE FROM entretien WHERE id = ?`, [id] // Utilisation des placeholders pour éviter les injections SQL
            );

            if (rows.affectedRows === 0) {
              throw new Error(`AUCUN ENTRETIEN SUPPRIME - Peut-être que l'id n'existe pas en BDD.`);
            }
            return rows;
        } catch (error) {
          throw new Error(`AUCUN ENTRETIEN SUPPRIME - Peut-être que l'id n'existe pas en BDD.`);
        } finally {
            if (connection) connection.release(); // Libérer la connexion
        }
    },


    // Met à jour un entretien
    update: async (params: Record<string, string | number | undefined>) => {
      let connection;
      try {
        // Vérification que l'ID est bien présent dans les paramètres
        if (params["id"] && Object.keys(params).length > 1) {
          let query = "UPDATE entretien SET ";

          // Ajout des colonnes à mettre à jour
          Object.keys(params).forEach((item, index) => {
            if (item === "idTechnicien" || item === "immatriculation" || item === "dateEntretien" || item === "remarque" || item === "typeEntretien") {
              query += `${item} = "${params[item]}"`;
              if (index != Object.keys(params).length - 1) {
                query += ", ";
              }
            }
          });

          // Condition sur l'ID de l'entretien à mettre à jour
          query += ` WHERE id = ${params["id"]}`;

          // Exécution de la requête SQL
          connection = await pool.getConnection();
          const rows = await connection.query(query);
          if (rows.affectedRows === 0) {
            throw new Error(`AUCUN ENTRETIEN MODIFIE - Peut-être que l'immatriculation n'existe pas en BDD. L’entretien n’a pas été mis à jour`);
          }

          return rows;
        }
      } catch (error) {
        throw new Error(`AUCUN ENTRETIEN MODIFIE - Peut-être que l'id n'existe pas en BDD. L’entretien n’a pas été mis à jour`);
      } finally {
        if (connection) connection.release();
      }
    }

};
