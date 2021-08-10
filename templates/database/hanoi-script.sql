
CREATE TABLE etnia (
                id_etnia INT AUTO_INCREMENT NOT NULL,
                name_etnia VARCHAR(25) NOT NULL,
                PRIMARY KEY (id_etnia)
);


CREATE TABLE Genero (
                id_gen INT AUTO_INCREMENT NOT NULL,
                name_gen VARCHAR(25) NOT NULL,
                PRIMARY KEY (id_gen)
);


CREATE TABLE Figura (
                id_figura INT AUTO_INCREMENT NOT NULL,
                name_figura VARCHAR(25) NOT NULL,
                PRIMARY KEY (id_figura)
);


CREATE TABLE usuario (
                id_usuario INT AUTO_INCREMENT NOT NULL,
                email_user VARCHAR(50) NOT NULL,
                nick_user VARCHAR(25) NOT NULL,
                id_etnia INT NOT NULL,
                id_gen INT NOT NULL,
                id_figura INT NOT NULL,
                names_user VARCHAR(50) NOT NULL,
                last_user VARCHAR(50) NOT NULL,
                ci_user VARCHAR(10) NOT NULL,
                password_user VARCHAR(50) NOT NULL,
                number_user INT NOT NULL,
                country_user VARCHAR(25) NOT NULL,
                province_user VARCHAR(35) NOT NULL,
                sector_user VARCHAR(50) NOT NULL,
                phone_user VARCHAR(15) NOT NULL,
                edad_user INT NOT NULL,
                PRIMARY KEY (id_usuario, email_user, nick_user)
);


ALTER TABLE usuario ADD CONSTRAINT etnia_usuario_fk
FOREIGN KEY (id_etnia)
REFERENCES etnia (id_etnia)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE usuario ADD CONSTRAINT genero_usuario_fk
FOREIGN KEY (id_gen)
REFERENCES Genero (id_gen)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE usuario ADD CONSTRAINT figura_usuario_fk
FOREIGN KEY (id_figura)
REFERENCES Figura (id_figura)
ON DELETE NO ACTION
ON UPDATE NO ACTION;
