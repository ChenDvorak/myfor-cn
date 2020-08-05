-- MariaDB dump 10.17  Distrib 10.4.7-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: myfor
-- ------------------------------------------------------
-- Server version	10.4.7-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administartors`
--

DROP TABLE IF EXISTS `administartors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administartors` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `State` int(11) NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  `UserName` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
  `Password` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `Email` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `AvatarId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Administartors_AvatarId` (`AvatarId`),
  CONSTRAINT `FK_Administartors_Files_AvatarId` FOREIGN KEY (`AvatarId`) REFERENCES `files` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administartors`
--

LOCK TABLES `administartors` WRITE;
/*!40000 ALTER TABLE `administartors` DISABLE KEYS */;
INSERT INTO `administartors` VALUES (1,1,'2020-01-01 00:00:00.000000','myforadmin','15da5a3cf3a6b79034ad05c0bddcb0b846629bdb41256bf4703a5b66662a3ece','mrmyfor@outlook.com',1);
/*!40000 ALTER TABLE `administartors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agreesrecords`
--

DROP TABLE IF EXISTS `agreesrecords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agreesrecords` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `State` int(11) NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  `AgreerId` int(11) NOT NULL,
  `AccepterId` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agreesrecords`
--

LOCK TABLES `agreesrecords` WRITE;
/*!40000 ALTER TABLE `agreesrecords` DISABLE KEYS */;
/*!40000 ALTER TABLE `agreesrecords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blogs` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `State` int(11) NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  `Title` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `Content` varchar(1000) CHARACTER SET utf8mb4 NOT NULL,
  `AuthorId` int(11) NOT NULL,
  `AgreedCount` int(11) NOT NULL,
  `CommentCount` int(11) NOT NULL,
  `ReferencedFromId` int(11) DEFAULT NULL,
  `ReferencedCount` int(11) NOT NULL,
  `ThoughtFromId` int(11) DEFAULT NULL,
  `ThoughtCount` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Blogs_AuthorId` (`AuthorId`),
  CONSTRAINT `FK_Blogs_Users_AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `State` int(11) NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  `Content` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
  `CommenterId` int(11) NOT NULL,
  `BlogId` int(11) NOT NULL,
  `AgreedCount` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Comments_BlogId` (`BlogId`),
  KEY `IX_Comments_CommenterId` (`CommenterId`),
  CONSTRAINT `FK_Comments_Blogs_BlogId` FOREIGN KEY (`BlogId`) REFERENCES `blogs` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Comments_Users_CommenterId` FOREIGN KEY (`CommenterId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `State` int(11) NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  `Name` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `Extension` varchar(8) CHARACTER SET utf8mb4 NOT NULL,
  `SaveName` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `Size` bigint(20) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,1,'2020-01-01 00:00:00.000000','default.png','.png','default.png',4000);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `State` int(11) NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  `Account` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
  `Name` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
  `Password` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `Email` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `AvatarId` int(11) NOT NULL,
  `Introduction` varchar(512) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Users_AvatarId` (`AvatarId`),
  CONSTRAINT `FK_Users_Files_AvatarId` FOREIGN KEY (`AvatarId`) REFERENCES `files` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-06 11:55:16
