# Criando Ambas Tabelas

```` MySQL
CREATE TABLE pc (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome_box VARCHAR(50) NOT NULL,
    treinador_dono VARCHAR(100) NOT NULL
);

CREATE TABLE pokedex(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome_pokemon VARCHAR(100) NOT NULL,
  nivel_pokemon INT NOT NULL,
  box_id INT,
  
  FOREIGN KEY (box_id) REFERENCES pc (id) ON DELETE SET NULL ON UPDATE CASCADE
);
````
# Inserindo Data em Ambas Tabelas

```` MySQL
INSERT INTO pc (nome_box, treinador_dono) VALUES ("Teste", "Natan");
INSERT INTO pokedex (nome_pokemon, nivel_pokemon, box_id) VALUES ("Bulbassaur", 7, 1);
````



