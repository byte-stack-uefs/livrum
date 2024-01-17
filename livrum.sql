-- MySQL dump 10.13  Distrib 8.1.0, for Linux (x86_64)
--
-- Host: localhost    Database: livrum
-- ------------------------------------------------------
-- Server version	8.1.0
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Current Database: `livrum`
--
CREATE DATABASE
/*!32312 IF NOT EXISTS*/
`livrum`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */
/*!80016 DEFAULT ENCRYPTION='N' */
;
USE `livrum`;
--
-- Table structure for table `administrador`
--
DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `administrador` (
    `super` tinyint NOT NULL,
    `idUsuario` int NOT NULL,
    PRIMARY KEY (`idUsuario`),
    KEY `fk_Administrador_Usuario1_idx` (`idUsuario`),
    CONSTRAINT `fk_Administrador_Usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `autor`
--
DROP TABLE IF EXISTS `autor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `autor` (
    `idUsuario` int NOT NULL,
    `cpf` varchar(11) NOT NULL,
    `dataNascimento` date NOT NULL,
    `endereço` varchar(255) NOT NULL,
    `numeroAgencia` varchar(16) NOT NULL,
    `numeroConta` varchar(16) NOT NULL,
    PRIMARY KEY (`idUsuario`),
    UNIQUE KEY `cpf_UNIQUE` (`cpf`),
    KEY `fk_Autor_Usuario1_idx` (`idUsuario`),
    CONSTRAINT `fk_Autor_Usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `biblioteca`
--
DROP TABLE IF EXISTS `biblioteca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `biblioteca` (
    `idCliente` int NOT NULL,
    `idEBook` int NOT NULL,
    PRIMARY KEY (`idCliente`, `idEBook`),
    KEY `fk_Cliente_has_EBook_EBook1_idx` (`idEBook`),
    KEY `fk_Cliente_has_EBook_Cliente1_idx` (`idCliente`),
    CONSTRAINT `fk_Cliente_has_EBook_Cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idUsuario`),
    CONSTRAINT `fk_Cliente_has_EBook_EBook1` FOREIGN KEY (`idEBook`) REFERENCES `ebook` (`idEBook`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `carrinho`
--
DROP TABLE IF EXISTS `carrinho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `carrinho` (
    `idCarrinho` int NOT NULL AUTO_INCREMENT,
    `idUsuario` int NOT NULL,
    `modificadoEm` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`idCarrinho`),
    KEY `fk_Carrinho_Cliente1_idx` (`idUsuario`),
    CONSTRAINT `fk_Carrinho_Cliente1` FOREIGN KEY (`idUsuario`) REFERENCES `cliente` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `cartao`
--
DROP TABLE IF EXISTS `cartao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `cartao` (
    `idCartao` int NOT NULL AUTO_INCREMENT,
    `nomeImpresso` varchar(64) NOT NULL,
    `numero` varchar(32) NOT NULL,
    `cvv` int NOT NULL,
    `dataVencimento` date NOT NULL,
    `criadoEm` datetime NOT NULL,
    `idCliente` int NOT NULL,
    PRIMARY KEY (`idCartao`),
    KEY `fk_Cartao_Cliente1_idx` (`idCliente`),
    CONSTRAINT `fk_Cartao_Cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `cliente`
--
DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `cliente` (
    `idUsuario` int NOT NULL AUTO_INCREMENT,
    `cpf` varchar(11) NOT NULL,
    `dataNascimento` date NOT NULL,
    `endereco` varchar(255) DEFAULT NULL,
    `telefone` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`idUsuario`),
    UNIQUE KEY `cpf_UNIQUE` (`cpf`),
    KEY `fk_Cliente_Usuario1_idx` (`idUsuario`),
    CONSTRAINT `fk_Cliente_Usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `cupom`
--
DROP TABLE IF EXISTS `cupom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `cupom` (
    `idCupom` int NOT NULL AUTO_INCREMENT,
    `nome` varchar(45) NOT NULL,
    `status` enum('active', 'inactive', 'expired') NOT NULL DEFAULT 'active',
    `porcentagem` decimal(4, 2) NOT NULL,
    `dataExpiracao` date DEFAULT NULL,
    `criadoEm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `modificadoEM` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `idUsuario` int NOT NULL,
    PRIMARY KEY (`idCupom`),
    UNIQUE KEY `nome_UNIQUE` (`nome`),
    KEY `fk_Cupom_Autor1_idx` (`idUsuario`),
    CONSTRAINT `fk_Cupom_Autor1` FOREIGN KEY (`idUsuario`) REFERENCES `autor` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `ebook`
--
DROP TABLE IF EXISTS `ebook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `ebook` (
    `idEBook` int NOT NULL AUTO_INCREMENT,
    `idAutor` int NOT NULL,
    `nome` varchar(128) NOT NULL,
    `status` enum('pending', 'active', 'inactive', 'rejected') NOT NULL,
    `preco` decimal(10, 2) NOT NULL,
    `sinopse` text NOT NULL,
    `capa` varchar(255) DEFAULT NULL,
    `qtdPaginas` int DEFAULT NULL,
    `idioma` varchar(64) DEFAULT NULL,
    `formato` varchar(45) DEFAULT 'PDF',
    `tamanhoEmMB` int DEFAULT NULL,
    `anoLancamento` varchar(45) DEFAULT NULL,
    `motivoRejeicao` varchar(45) DEFAULT NULL,
    `criadoEm` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `modificadoEm` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    `outrosAutores` varchar(255) DEFAULT NULL,
    `visto` int NOT NULL DEFAULT '0',
    PRIMARY KEY (`idEBook`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `genero`
--
DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `genero` (
    `idGenero` int NOT NULL AUTO_INCREMENT,
    `nome` varchar(45) NOT NULL,
    PRIMARY KEY (`idGenero`),
    UNIQUE KEY `nome_UNIQUE` (`nome`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `generoebook`
--
DROP TABLE IF EXISTS `generoebook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `generoebook` (
    `idGenero` int NOT NULL,
    `idEBook` int NOT NULL,
    PRIMARY KEY (`idGenero`, `idEBook`),
    KEY `fk_GeneroEBook_Genero_idx` (`idGenero`),
    KEY `fk_GeneroEBook_EBook1_idx` (`idEBook`),
    CONSTRAINT `fk_GeneroEBook_EBook1` FOREIGN KEY (`idEBook`) REFERENCES `ebook` (`idEBook`),
    CONSTRAINT `fk_GeneroEBook_Genero` FOREIGN KEY (`idGenero`) REFERENCES `genero` (`idGenero`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `itemcarrinho`
--
DROP TABLE IF EXISTS `itemcarrinho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `itemcarrinho` (
    `idEBook` int NOT NULL,
    `idCarrinho` int NOT NULL,
    PRIMARY KEY (`idEBook`, `idCarrinho`),
    KEY `fk_ItemCarrinho_EBook1_idx` (`idEBook`),
    KEY `fk_ItemCarrinho_Carrinho1_idx` (`idCarrinho`),
    CONSTRAINT `fk_ItemCarrinho_Carrinho1` FOREIGN KEY (`idCarrinho`) REFERENCES `carrinho` (`idCarrinho`),
    CONSTRAINT `fk_ItemCarrinho_EBook1` FOREIGN KEY (`idEBook`) REFERENCES `ebook` (`idEBook`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `itempedido`
--
DROP TABLE IF EXISTS `itempedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `itempedido` (
    `idCupom` int DEFAULT NULL,
    `idEBook` int NOT NULL,
    `idPedido` int NOT NULL,
    `valorUnitario` decimal(10, 2) NOT NULL,
    `valorTotal` decimal(10, 2) NOT NULL,
    PRIMARY KEY (`idEBook`, `idPedido`),
    KEY `fk_ItemPedido_Cupom1_idx` (`idCupom`),
    KEY `fk_ItemPedido_EBook1_idx` (`idEBook`),
    KEY `fk_ItemPedido_Pedido1_idx` (`idPedido`),
    CONSTRAINT `fk_ItemPedido_Cupom1` FOREIGN KEY (`idCupom`) REFERENCES `cupom` (`idCupom`),
    CONSTRAINT `fk_ItemPedido_EBook1` FOREIGN KEY (`idEBook`) REFERENCES `ebook` (`idEBook`),
    CONSTRAINT `fk_ItemPedido_Pedido1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `pedido`
--
DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `pedido` (
    `idPedido` int NOT NULL AUTO_INCREMENT,
    `meioPagamento` enum('pix', 'credito') NOT NULL,
    `data` date NOT NULL DEFAULT (curdate()),
    `status` enum('canceled', 'pending', 'approved', 'failed') NOT NULL DEFAULT 'pending',
    `idCliente` int NOT NULL,
    PRIMARY KEY (`idPedido`),
    KEY `fk_Pedido_Cliente1_idx` (`idCliente`),
    CONSTRAINT `fk_Pedido_Cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Table structure for table `usuario`
--
DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `usuario` (
    `idUsuario` int NOT NULL AUTO_INCREMENT,
    `nome` varchar(128) NOT NULL,
    `email` varchar(128) NOT NULL,
    `senha` varchar(64) NOT NULL,
    `status` enum('pending', 'blocked', 'active', 'inactive') NOT NULL,
    `criadoEm` datetime NOT NULL,
    `modificadoEm` datetime NOT NULL,
    `tipo` enum('ADM', 'AUTOR', 'CLIENTE') NOT NULL,
    PRIMARY KEY (`idUsuario`),
    UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping routines for database 'livrum'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
-- Dump completed on 2024-01-17 23:16:51