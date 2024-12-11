CREATE TABLE employes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    poste VARCHAR(255),
    salaire DECIMAL(10, 2),
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL 
);

CREATE TABLE evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employe_id INT,
    date DATE,
    note DECIMAL(3, 2),
    FOREIGN KEY (employe_id) REFERENCES employes(id)
);