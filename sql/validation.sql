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

-- 테이블 kanghoshin_lis.validation 구조 내보내기
CREATE TABLE IF NOT EXISTS `validation` (
  `validation_email` varchar(320) NOT NULL,
  `validation_code` char(60) DEFAULT NULL,
  PRIMARY KEY (`validation_email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 kanghoshin_lis.validation:~7 rows (대략적) 내보내기
DELETE FROM `validation`;
/*!40000 ALTER TABLE `validation` DISABLE KEYS */;
INSERT INTO `validation` (`validation_email`, `validation_code`) VALUES
	('gim765987@gmail.com', NULL),
	('kevin3918@naver.com', NULL),
	('kevin91503918@gmail.com', NULL),
	('khgkjg12@gmail.com', NULL),
	('khgkjg12@naver.com', NULL),
	('rhj1216@gmail.com', NULL),
	('rhj1216@naver.com', NULL);
/*!40000 ALTER TABLE `validation` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
