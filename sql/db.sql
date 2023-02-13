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

-- 테이블 kanghoshin_lis.auth 구조 내보내기
CREATE TABLE IF NOT EXISTS `auth` (
  `auth_id` varchar(40) NOT NULL,
  `auth_password` char(60) NOT NULL,
  `auth_refresh` char(36) NOT NULL,
  `staff_no` int(11) DEFAULT NULL,
  `validation_email` varchar(320) NOT NULL,
  PRIMARY KEY (`auth_id`),
  KEY `FK_validation` (`validation_email`),
  KEY `FK__staff` (`staff_no`),
  CONSTRAINT `FK__staff` FOREIGN KEY (`staff_no`) REFERENCES `staff` (`staff_no`) ON UPDATE CASCADE,
  CONSTRAINT `FK_validation` FOREIGN KEY (`validation_email`) REFERENCES `validation` (`validation_email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 kanghoshin_lis.department 구조 내보내기
CREATE TABLE IF NOT EXISTS `department` (
  `department_code` char(2) NOT NULL DEFAULT '0',
  `department_name` varchar(40) NOT NULL,
  PRIMARY KEY (`department_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 kanghoshin_lis.doctor 구조 내보내기
CREATE TABLE IF NOT EXISTS `doctor` (
  `staff_no` int(11) NOT NULL,
  `doctor_certification` int(11) NOT NULL,
  `department_code` char(2) DEFAULT '',
  PRIMARY KEY (`staff_no`),
  KEY `FK_doctor_department` (`department_code`),
  CONSTRAINT `FK_doctor_department` FOREIGN KEY (`department_code`) REFERENCES `department` (`department_code`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 kanghoshin_lis.patient 구조 내보내기
CREATE TABLE IF NOT EXISTS `patient` (
  `patient_no` int(11) NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(40) NOT NULL,
  `patient_male` bit(1) NOT NULL,
  `patient_rrn` char(14) NOT NULL,
  `patient_birth` date NOT NULL,
  `patient_phone` varchar(13) NOT NULL,
  PRIMARY KEY (`patient_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 kanghoshin_lis.staff 구조 내보내기
CREATE TABLE IF NOT EXISTS `staff` (
  `staff_no` int(11) NOT NULL AUTO_INCREMENT,
  `staff_name` varchar(40) NOT NULL,
  `staff_birth` date NOT NULL,
  `staff_male` bit(1) NOT NULL,
  `staff_phone` varchar(13) NOT NULL,
  `staff_image` varchar(255) DEFAULT NULL,
  `staff_rrn` char(14) NOT NULL,
  `staff_admitted` bit(1) NOT NULL DEFAULT b'0',
  `staff_type` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`staff_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 kanghoshin_lis.validation 구조 내보내기
CREATE TABLE IF NOT EXISTS `validation` (
  `validation_email` varchar(320) NOT NULL,
  `validation_code` char(60) DEFAULT NULL,
  PRIMARY KEY (`validation_email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 트리거 kanghoshin_lis.auth_after_delete 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `auth_after_delete` AFTER DELETE ON `auth` FOR EACH ROW BEGIN
DELETE FROM validation WHERE validation_email = OLD.validation_email;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 kanghoshin_lis.auth_before_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `auth_before_insert` BEFORE INSERT ON `auth` FOR EACH ROW BEGIN
UPDATE validation SET validation_code = NULL WHERE validation_email = NEW.validation_email;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 kanghoshin_lis.doctor_after_delete 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `doctor_after_delete` AFTER DELETE ON `doctor` FOR EACH ROW BEGIN
UPDATE staff SET staff_type = 0 WHERE staff_no = OLD.staff_no;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 kanghoshin_lis.doctor_before_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `doctor_before_insert` BEFORE INSERT ON `doctor` FOR EACH ROW BEGIN
UPDATE staff SET staff_type = 1 WHERE staff_no = NEW.staff_no;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 kanghoshin_lis.staff_before_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `staff_before_insert` BEFORE INSERT ON `staff` FOR EACH ROW BEGIN
IF NEW.staff_type != 0 THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'DO NOT INSERT staff_type VALUE';
END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
