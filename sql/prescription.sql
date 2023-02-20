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

-- 테이블 데이터 kanghoshin_lis.prescription:~1 rows (대략적) 내보내기
DELETE FROM `prescription`;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` (`prescription_code`, `behavior_code`, `prescription_name`, `prescription_classification_code`, `prescription_slip_code`, `prescription_comment`) VALUES
	('A0314', 'D4902010', '비타민검사', 'CP', NULL, NULL),
	('D0001', 'D0001010', '일반혈액검사1', 'CP', NULL, '하나만 요청');
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;

-- 트리거 kanghoshin_lis.prescription_before_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `prescription_before_insert` BEFORE INSERT ON `prescription` FOR EACH ROW BEGIN
IF NEW.prescription_classification_code != null THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'DO NOT INSERT prescription_classification_code VALUE';
END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
