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
        return rows;
      } catch (error) {
        console.error("Error in getWithFilters:", error);
        throw error;
      } finally {
        if (connection) connection.release();
      }
    },

    // Ajoute un nouvel entretien
    addOne: async (entretien: Entretien) => {
      let connection;
      try {
          connection = await pool.getConnection(); // Récupère une connexion à la base de données
  
          // Insère l'entretien dans la table
          const result = await connection.query(
              `INSERT INTO entretien (idTechnicien, immatriculation, dateEntretien, remarque, typeEntretien) 
              VALUES (?, ?, ?, ?, ?)`,
              [entretien.idTechnicien, entretien.immatriculation, entretien.dateEntretien, entretien.remarque, entretien.typeEntretien]
          );
  
          // Retourne un objet avec l'ID de l'entretien nouvellement ajouté
          return {
              id: Number(result.insertId),  // Convertir insertId en Number
              ...entretien  // Retourne aussi les autres propriétés de l'entretien
          };
      } catch (error) {
          throw error; // Lance une erreur en cas de problème
      } finally {
          if (connection) connection.release(); // Libère la connexion après l'exécution
      }
    },
  
      delete: async (id: number) => {
        let connection;
        try {
            connection = await pool.getConnection(); // Obtenir une connexion
            const rows = await pool.query(
                `DELETE FROM entretien WHERE id = ?`, [id] // Utilisation des placeholders pour éviter les injections SQL
            );
            return rows;
        } catch (error) {
            throw error; // Renvoyer l'erreur pour un traitement ultérieur
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

          return rows;
        }
      } catch (error) {
        return error;
      } finally {
        if (connection) connection.release();
      }
    }

};
