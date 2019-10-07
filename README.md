## Projeto MyTest

API com Node.js

Front-end com ReactJS

Mobile com React Native

## Comando SQL para criar database

CREATE DATABASE IF NOT EXISTS MyTest
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;

## Comando SQL para criar tabela

CREATE TABLE IF NOT EXISTS user (

	id_user INT NOT NULL AUTO_INCREMENT,
    name_user VARCHAR(100) NOT NULL,
    username_user VARCHAR(45) NOT NULL UNIQUE,
    email_user VARCHAR(45) NOT NULL UNIQUE,
    password_user VARCHAR(45) NOT NULL,
    active_user BOOLEAN DEFAULT FALSE,
    hash_active VARCHAR(45) NOT NULL,
    
    PRIMARY KEY(id_user)

)DEFAULT CHARSET = utf8;