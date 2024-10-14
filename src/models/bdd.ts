//********** Imports **********/
import mariadb from "mariadb";

//********** Pool **********/
export const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "GestionEntretiens",
  connectionLimit: 5,
});