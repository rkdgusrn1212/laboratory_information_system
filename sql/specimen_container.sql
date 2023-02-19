-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.5.18-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- kanghoshin_lis 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `kanghoshin_lis` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `kanghoshin_lis`;

-- 테이블 kanghoshin_lis.specimen_container 구조 내보내기
CREATE TABLE IF NOT EXISTS `specimen_container` (
  `specimen_container_code` char(2) NOT NULL,
  `specimen_container_name` varchar(40) NOT NULL,
  PRIMARY KEY (`specimen_container_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 kanghoshin_lis.specimen_container:~15 rows (대략적) 내보내기
DELETE FROM `specimen_container`;
/*!40000 ALTER TABLE `specimen_container` DISABLE KEYS */;
INSERT INTO `specimen_container` (`specimen_container_code`, `specimen_container_name`) VALUES
	('01', ' SST tube'),
	('02', ' EDTA tube'),
	('03', ' Sod. Citrate tube'),
	('04', ' Heparin tube'),
	('05', ' CUP'),
	('06', ' BAG'),
	('07', ' Plan tube'),
	('08', ' Syringe'),
	('09', ' Culture'),
	('10', ' 배양용기'),
	('20', ' 진균배양'),
	('51', ' 전용-TB'),
	('97', ' 차광용기'),
	('98', ' 전용용기'),
	('99', ' Others');
/*!40000 ALTER TABLE `specimen_container` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
