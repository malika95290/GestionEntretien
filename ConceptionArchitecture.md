# Documentation GestionEntretiens

Le projet consiste en la création d'une application permettant la gestion des avions d'une base ainsi que les techniciens qui font des entretiens sur les appareils.

Le backend sera implémenté sur NodeJS en Typescript et pourra s’interfacer avec la base de données MariaDB de la base d’Istre.

Afin d’anticiper la création de la base de données, on prévoit le model de donnée relatif au schéma donné ci-dessous :

![model](https://hackmd.io/_uploads/SkQv9qcJyl.png)
ou en cliquant via son lien : https://hackmd.io/_uploads/SkQv9qcJyl.png

On prévoit également les opérations CRUD attendues pour chaque entité de notre modèle de données :

- Avion
    - GetAll
    - GetById
    - GetWithFilters
    - Create
    - Update
    - Delete

- Technicien
    - GetAll
    - GetById
    - GetWithFilters
    - Create
    - Update

- Entretien
    - GetAll
    - GetById
    - GetWithFilters
    - Create
    - Update
    - Delete

Afin de couvrir tous les besoins dont l’API aura la charge, nous faisons un tableau avec les endpoints et les options qu’il propose.


| Endpoint       | Paramètres  | Description|
| -------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **POST** /avions | Objet Avion passé dans le body au format JSON ex :<br> `{ "immatriculation": "AB-913", "marque": "Dassault Aviation", "modele": "Super Etendard"}` | Ajoute un avion en base de données et retourne l’avion ajouté                           |
| **GET** /avions | Aucun| Retourne tous les avions                                                                 |
| **GET** /avions | `?immatriculation` - string                                                                                    | Retourne l’avion correspondant à l’immatriculation                                       |
| **GET** /avions | `?marque` - string<br> `?modele` - string<br>  | Retourne les avions selon les filtres passés en paramètres |
| **PUT** /avions | `immatriculation` - string<br> `?marque` - string<br> `?modele` - string<br>           | Met à jour les informations passées en paramètres dans l’avion correspondant à l’immatriculation donnée et retourne l’avion modifié |
| **DELETE** /avions | `immatriculation` - string | Supprime l’avion |
| **POST** /technicien | Objet Technicien passé dans le body au format JSON ex :<br> `{ "id": 1, "nom": "Dupond", "prenom": "Bernard", "dateEntretien": 2024/10/15, "specialite": "moteur"}` | Ajoute un technicien en base de données et retourne le technicien ajouté                           |
| **GET** /technicien | Aucun | Retourne tous les techniciens                          || **GET** /technicien | `?id - number` - string | Retourne le technicien correspondant à l'id |
| **GET** /technicien | `?nom` - string<br> `?prenom` - string<br>  | Retourne les techniciens selon les filtres passés en paramètres |
| **PUT** /technicien | `id` - number<br> `?nom` - string<br> `?prenom` - string<br>`?dateEntretien` - date<br>`?specialite` - string<br> | Met à jour les informations passées en paramètres dans l’avion correspondant à l’immatriculation donnée et retourne l’avion modifié |
| **DELETE** /technicien | `id` - number | Supprime le technicien |
| **POST** /entretien | Objet Entretien passé dans le body au format JSON ex :<br> `{ "id": 1, "idtechnicien": 1, "immatriculation": "AB-913", "dateEntretien": 2024/10/15, "remarque": "ok", "typeEntretien":"réparation moteur"}`| Ajoute un technicien en base de données et retourne le technicien ajouté|
| **GET** /entretien | Aucun                                                                                                          | Retourne tous les entretiens                                                                 |
| **GET** /entretien | `?id` - number                                                                                    | Retourne l’entretien correspondant à l’id                                       |
| **GET** /entretien | `?id` - number<br> `?idtechnicien` - number<br>`?immatriculation` - string<br>`?dateEntretien` - date<br>`?remarque` - string<br>`?typeEntretien` - string<br>  | Retourne les entretiens selon les filtres passés en paramètres |
| **PUT** /entretien | `id` - number<br> `?idtechnicien` - number<br>`?immatriculation` - string<br>`?dateEntretien` - date<br>`?remarque` - string<br>`?typeEntretien` - string<br>| Met à jour les informations passées en paramètres dans l’entretien correspondant à l’id donnée et retourne l’avion modifié |
| **DELETE** /entretien | `id` - string | Supprime l’entretien |

Etant donné qu’une requête peut être un succès comme une erreur, et ce pour diverses raisons : ressource introuvable, serveur indisponible, etc, nous proposons une gestion des erreurs donnée ci-dessous : 



| Endpoint | Erreur | Description |
| -------- | -------- | -------- |
| POST/avion | AUCUN AVION AJOUTE - Peut-être manque-t-il des données. | L’avion n’a pas été ajouté|
| GET/avion | AUCUN AVION TROUVE | Aucun avion n’a été trouvé|
| GET/avion | 	AUCUN AVION TROUVE - AVEC L'IMMATRICULATION : ${params["immatriculation"]}| Impossible de récupérer l’avion associé à l’immatriculation passée en paramètres|
| GET/avion | AUCUN AVION TROUVE - AVEC CES PARAMETRES : ${toJson(params)}| Impossible de récupérer l’avion associé aux paramètres envoyés|
| PUT/avion | AUCUN AVION MODIFIE - Peut-être que l'immatriculation n'existe pas en BDD.| l'immatriculation n'existe pas en BDD.L’avion n’a pas été mis à jour|
| DELETE/avion | AUCUN AVION SUPPRIME - Peut-être que l'immatriculation n'existe pas en BDD.| L’avion n’a pas été supprimé|
| POST/technicien | AUCUN TECHNICIEN AJOUTE - Peut-être manque-t-il des données. | Le technicien n’a pas été ajouté|
| GET/technicien | AUCUN TECHNICIEN TROUVE | Aucun technicien n’a été trouvé|
| GET/technicien | 	AUCUN TECHNICIEN TROUVE - AVEC L'ID : ${params["id"]}| Impossible de récupérer le technicien associé à l’id passée en paramètres|
| GET/technicien | AUCUN TECHNICIEN TROUVE - AVEC CES PARAMETRES : ${toJson(params)}| Impossible de récupérer l’id associé aux paramètres envoyés|
| PUT/technicien | AUCUN TECHNICIEN MODIFIE - Peut-être que l'id n'existe pas en BDD.| l'id n'existe pas en BDD. Le technicien n’a pas été mis à jour|
| DELETE/technicien | 	AUCUN TECHNICIEN SUPPRIME - Peut-être que l'id n'existe pas en BDD.| Le technicien n’a pas été supprimé|
| POST/entretien | AUCUN ENTRETIEN AJOUTE - Peut-être manque-t-il des données. | L'entretien n’a pas été ajouté|
| GET/entretien | AUCUN ENTRETIEN TROUVE | Aucun entretien n’a été trouvé|
| GET/entretien | AUCUN ENTRETIEN TROUVE - AVEC L'ID : ${params["id"]}| Impossible de récupérer l'entretien associé à l’id passée en paramètres|
| GET/entretien | AUCUN ENTRETIEN TROUVE - AVEC CES PARAMETRES : ${toJson(params)}| Impossible de récupérer l’id associé aux paramètres envoyés|
| PUT/entretien | AUCUN ENTRETIEN MODIFIE - Peut-être que l'id n'existe pas en BDD.| l'id n'existe pas en BDD. L'entretien n’a pas été mis à jour|
| DELETE/entretien | AUCUN ENTRETIEN SUPPRIME - Peut-être que l'id n'existe pas en BDD.| L'entretien n’a pas été supprimé.

L'ensemble du projet est à retrouver sur ce dépôt :
https://github.com/malika95290/GestionEntretien.git
