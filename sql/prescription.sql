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

-- 테이블 kanghoshin_lis.prescription 구조 내보내기
CREATE TABLE IF NOT EXISTS `prescription` (
  `prescription_code` varchar(10) NOT NULL,
  `behavior_code` varchar(10) DEFAULT NULL,
  `prescription_name` varchar(200) NOT NULL,
  `prescription_classification_code` varchar(10) DEFAULT NULL,
  `prescription_slip_code` varchar(10) DEFAULT NULL,
  `prescription_comment` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`prescription_code`) USING BTREE,
  KEY `FK_prescription_prescription_classification` (`prescription_classification_code`),
  KEY `FK_prescription_behavior` (`behavior_code`) USING BTREE,
  CONSTRAINT `FK_prescription_behavior` FOREIGN KEY (`behavior_code`) REFERENCES `behavior` (`behavior_code`) ON UPDATE CASCADE,
  CONSTRAINT `FK_prescription_prescription_classification` FOREIGN KEY (`prescription_classification_code`) REFERENCES `prescription_classification` (`prescription_classification_code`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
