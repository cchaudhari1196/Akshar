-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: akshar
-- ------------------------------------------------------
-- Server version	5.6.49-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `information`
--

DROP TABLE IF EXISTS `information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  `sub_information_block_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_project_detail_project_sub_detail_block1_idx` (`sub_information_block_id`),
  CONSTRAINT `fk_project_detail_project_sub_detail_block1` FOREIGN KEY (`sub_information_block_id`) REFERENCES `sub_information_block` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information`
--

LOCK TABLES `information` WRITE;
/*!40000 ALTER TABLE `information` DISABLE KEYS */;
INSERT INTO `information` VALUES (10,'MHADA - Maharashtra Housing and Development Authority',4),(11,'MSEB -> Maharashtra state Electricity board with partnership with Akshar electricals',4),(14,'Chirag Chuadhari',10),(15,'Prashant Chaudhari',10),(16,'Prashant Chuadhari',11),(17,'Dipanshu Prashant Chuadhari',11),(18,'This Solar is of 4 KWh capacity. Which is suffic for a power needs of 2 story residential building.',12),(19,'Its installed on the rooftop. It covers half the rooftop with solar panel. We have constructed a steel structure for the solar panel. So that custome can use the balcony without worrying about solar panel',12),(28,'Generated electricity will be sold to MSEB(Maharashtra Electricity Board). In return MSEB will not charge us for the electricity that we are buying from them.',12),(29,'Inverter - This project uses Growatt inverter. Which is one of the best brand in the electrical field.',12),(30,'You can Track electricity generated using solar on your mobile phone with bunch of other cool features and logging staticstics',12),(31,'Inverter -> Inverter of Growatt which is one of the leading inverter manufacturer',14),(32,'Solar Panel -> Solar panel of Vikrant Solar corp. Which is the leading solar panel manufacturer based in India',14),(33,'Wiring -> Polycab wired for wiring the whole project',14),(34,'Copper rod for the earthing poupose.',14),(35,'GI pipes for the support stucture of the solar panels.',14),(36,'In Winter-> It generates 3 times more eletricity that the demand/need.',15),(38,'<span className=\"purple\"> Bhubaneswar, India.</span> Extra electricity that is generated in Month of winter. Can be used in summer.',15),(39,'Tower will be able to take a lightning blow of 2000MV',16),(40,'This tower is equiped with 500KV insulators which will avoid damage to structure on voltage surge',16),(41,'',16),(42,'MSEB -> Maharashtra state Electricity board with partnership with Akshar electricals',17),(43,'India was able to reach one new milstone of providing electricity to remote villages',18),(44,'',18),(45,'In Summer -> It generates exactly equal electricity that is demanded/need',15),(46,'Completed in 15 days. for 20 houses i.e. 5 days before schedule',19),(47,'Used highest quality material for whole project',19),(48,'Part 1 -> Metering and load demand related task with collaboration of MSEB',20),(49,'Part 2 -> Electrification related task for the MHADA',20);
/*!40000 ALTER TABLE `information` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-28 10:59:02
