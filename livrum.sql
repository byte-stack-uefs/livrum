-- MySQL Script generated by MySQL Workbench
-- Sun Nov 26 18:36:19 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema livrum
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `livrum` ;

-- -----------------------------------------------------
-- Schema livrum
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `livrum` DEFAULT CHARACTER SET utf8mb4 ;
USE `livrum` ;

-- -----------------------------------------------------
-- Table `livrum`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `livrum`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `senha` VARCHAR(64) NOT NULL,
  `status` ENUM('pending', 'blocked', 'active', 'inactive') NOT NULL,
  `criadoEm` DATETIME NOT NULL,
  `modificadoEm` DATETIME NOT NULL,
  `tipo` ENUM('ADM', 'AUTOR', 'CLIENTE') NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`Cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`Cliente` ;

CREATE TABLE IF NOT EXISTS `livrum`.`Cliente` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `cpf` VARCHAR(11) NOT NULL,
  `dataNascimento` DATE NOT NULL,
  `endereco` VARCHAR(255) NULL DEFAULT NULL,
  `telefone` VARCHAR(45) NULL DEFAULT NULL,
  INDEX `fk_Cliente_Usuario1_idx` (`idUsuario` ASC),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC),
  PRIMARY KEY (`idUsuario`),
  CONSTRAINT `fk_Cliente_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `livrum`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`Cartao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`Cartao` ;

CREATE TABLE IF NOT EXISTS `livrum`.`Cartao` (
  `idCartao` INT NOT NULL AUTO_INCREMENT,
  `nomeImpresso` VARCHAR(64) NOT NULL,
  `numero` VARCHAR(32) NOT NULL,
  `cvv` INT NOT NULL,
  `dataVencimento` DATE NOT NULL,
  `criadoEm` DATETIME NOT NULL,
  `idCliente` INT NOT NULL,
  PRIMARY KEY (`idCartao`),
  INDEX `fk_Cartao_Cliente1_idx` (`idCliente` ASC),
  CONSTRAINT `fk_Cartao_Cliente1`
    FOREIGN KEY (`idCliente`)
    REFERENCES `livrum`.`Cliente` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`Autor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`Autor` ;

CREATE TABLE IF NOT EXISTS `livrum`.`Autor` (
  `idUsuario` INT NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `dataNascimento` DATE NOT NULL,
  `endereço` VARCHAR(255) NOT NULL,
  `numeroAgencia` VARCHAR(16) NOT NULL,
  `numeroConta` VARCHAR(16) NOT NULL,
  INDEX `fk_Autor_Usuario1_idx` (`idUsuario` ASC),
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC),
  CONSTRAINT `fk_Autor_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `livrum`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`Cupom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`Cupom` ;

CREATE TABLE IF NOT EXISTS `livrum`.`Cupom` (
  `idCupom` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `status` ENUM('active', 'inactive', 'expired') NOT NULL DEFAULT 'active',
  `porcentagem` DECIMAL(4,2) NOT NULL,
  `dataExpiracao` DATE NULL,
  `criadoEm` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modificadoEM` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idCupom`),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC),
  INDEX `fk_Cupom_Autor1_idx` (`idUsuario` ASC),
  CONSTRAINT `fk_Cupom_Autor1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `livrum`.`Autor` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`Genero`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`Genero` ;

CREATE TABLE IF NOT EXISTS `livrum`.`Genero` (
  `idGenero` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idGenero`),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`EBook`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`EBook` ;

CREATE TABLE IF NOT EXISTS `livrum`.`EBook` (
  `idEBook` INT NOT NULL AUTO_INCREMENT,
  `idAutor` INT NOT NULL,
  `nome` VARCHAR(128) NOT NULL,
  `status` ENUM('pending', 'active', 'inactive', 'rejected') NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `sinopse` TEXT NOT NULL,
  `capa` VARCHAR(255) NULL,
  `qtdPaginas` INT NULL,
  `idioma` VARCHAR(64) NULL,
  `formato` VARCHAR(45) NULL DEFAULT 'PDF',
  `tamanhoEmMB` INT NULL,
  `anoLancamento` VARCHAR(45) NULL,
  `motivoRejeicao` VARCHAR(45) NULL,
  `criadoEm` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modificadoEm` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  `outrosAutores` VARCHAR(255) NULL,
  PRIMARY KEY (`idEBook`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`GeneroEBook`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`GeneroEBook` ;

CREATE TABLE IF NOT EXISTS `livrum`.`GeneroEBook` (
  `idGenero` INT NOT NULL,
  `idEBook` INT NOT NULL,
  INDEX `fk_GeneroEBook_Genero_idx` (`idGenero` ASC),
  INDEX `fk_GeneroEBook_EBook1_idx` (`idEBook` ASC),
  PRIMARY KEY (`idGenero`, `idEBook`),
  CONSTRAINT `fk_GeneroEBook_Genero`
    FOREIGN KEY (`idGenero`)
    REFERENCES `livrum`.`Genero` (`idGenero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GeneroEBook_EBook1`
    FOREIGN KEY (`idEBook`)
    REFERENCES `livrum`.`EBook` (`idEBook`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`Pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`Pedido` ;

CREATE TABLE IF NOT EXISTS `livrum`.`Pedido` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `meioPagamento` ENUM('pix', 'credito') NOT NULL,
  `data` DATE NOT NULL DEFAULT (CURRENT_DATE),
  `status` ENUM('canceled', 'pending', 'approved', 'failed') NOT NULL DEFAULT 'pending',
  `idCliente` INT NOT NULL,
  PRIMARY KEY (`idPedido`),
  INDEX `fk_Pedido_Cliente1_idx` (`idCliente` ASC),
  CONSTRAINT `fk_Pedido_Cliente1`
    FOREIGN KEY (`idCliente`)
    REFERENCES `livrum`.`Cliente` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`ItemPedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`ItemPedido` ;

CREATE TABLE IF NOT EXISTS `livrum`.`ItemPedido` (
  `idCupom` INT NULL,
  `idEBook` INT NOT NULL,
  `idPedido` INT NOT NULL,
  `valorUnitario` DECIMAL(10,2) NOT NULL,
  `valorTotal` DECIMAL(10,2) NOT NULL,
  INDEX `fk_ItemPedido_Cupom1_idx` (`idCupom` ASC),
  INDEX `fk_ItemPedido_EBook1_idx` (`idEBook` ASC),
  INDEX `fk_ItemPedido_Pedido1_idx` (`idPedido` ASC),
  PRIMARY KEY (`idEBook`, `idPedido`),
  CONSTRAINT `fk_ItemPedido_Cupom1`
    FOREIGN KEY (`idCupom`)
    REFERENCES `livrum`.`Cupom` (`idCupom`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ItemPedido_EBook1`
    FOREIGN KEY (`idEBook`)
    REFERENCES `livrum`.`EBook` (`idEBook`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ItemPedido_Pedido1`
    FOREIGN KEY (`idPedido`)
    REFERENCES `livrum`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`Carrinho`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`Carrinho` ;

CREATE TABLE IF NOT EXISTS `livrum`.`Carrinho` (
  `idCarrinho` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `modificadoEm` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCarrinho`),
  INDEX `fk_Carrinho_Cliente1_idx` (`idUsuario` ASC),
  CONSTRAINT `fk_Carrinho_Cliente1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `livrum`.`Cliente` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`ItemCarrinho`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`ItemCarrinho` ;

CREATE TABLE IF NOT EXISTS `livrum`.`ItemCarrinho` (
  `idEBook` INT NOT NULL,
  `idCarrinho` INT NOT NULL,
  INDEX `fk_ItemCarrinho_EBook1_idx` (`idEBook` ASC),
  INDEX `fk_ItemCarrinho_Carrinho1_idx` (`idCarrinho` ASC),
  PRIMARY KEY (`idEBook`, `idCarrinho`),
  CONSTRAINT `fk_ItemCarrinho_EBook1`
    FOREIGN KEY (`idEBook`)
    REFERENCES `livrum`.`EBook` (`idEBook`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ItemCarrinho_Carrinho1`
    FOREIGN KEY (`idCarrinho`)
    REFERENCES `livrum`.`Carrinho` (`idCarrinho`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`Administrador`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`Administrador` ;

CREATE TABLE IF NOT EXISTS `livrum`.`Administrador` (
  `super` TINYINT NOT NULL,
  `idUsuario` INT NOT NULL,
  INDEX `fk_Administrador_Usuario1_idx` (`idUsuario` ASC),
  PRIMARY KEY (`idUsuario`),
  CONSTRAINT `fk_Administrador_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `livrum`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `livrum`.`Biblioteca`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `livrum`.`Biblioteca` ;

CREATE TABLE IF NOT EXISTS `livrum`.`Biblioteca` (
  `idCliente` INT NOT NULL,
  `idEBook` INT NOT NULL,
  PRIMARY KEY (`idCliente`, `idEBook`),
  INDEX `fk_Cliente_has_EBook_EBook1_idx` (`idEBook` ASC),
  INDEX `fk_Cliente_has_EBook_Cliente1_idx` (`idCliente` ASC),
  CONSTRAINT `fk_Cliente_has_EBook_Cliente1`
    FOREIGN KEY (`idCliente`)
    REFERENCES `livrum`.`Cliente` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cliente_has_EBook_EBook1`
    FOREIGN KEY (`idEBook`)
    REFERENCES `livrum`.`EBook` (`idEBook`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;