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
DROP DATABASE IF EXISTS `kanghoshin_lis`;
CREATE DATABASE IF NOT EXISTS `kanghoshin_lis` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `kanghoshin_lis`;

-- 테이블 kanghoshin_lis.auth 구조 내보내기
DROP TABLE IF EXISTS `auth`;
CREATE TABLE IF NOT EXISTS `auth` (
  `auth_id` varchar(40) NOT NULL,
  `auth_password` char(60) NOT NULL,
  `auth_refresh` char(36) NOT NULL,
  `staff_no` int(11) NOT NULL,
  PRIMARY KEY (`auth_id`),
  KEY `FK__staff` (`staff_no`),
  CONSTRAINT `FK__staff` FOREIGN KEY (`staff_no`) REFERENCES `staff` (`staff_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 kanghoshin_lis.staff 구조 내보내기
DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `staff_no` int(11) NOT NULL AUTO_INCREMENT,
  `staff_name` varchar(40) NOT NULL,
  `staff_birth` date NOT NULL,
  `staff_male` bit(1) NOT NULL,
  `staff_phone` varchar(13) NOT NULL,
  `staff_image` varchar(255) DEFAULT NULL,
  `staff_rrn` char(14) NOT NULL,
  `staff_admitted` bit(1) NOT NULL DEFAULT b'0',
  `staff_type` tinyint(4) NOT NULL,
  PRIMARY KEY (`staff_no`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 kanghoshin_lis.validation 구조 내보내기
DROP TABLE IF EXISTS `validation`;
CREATE TABLE IF NOT EXISTS `validation` (
  `validation_email` varchar(320) NOT NULL,
  `validation_code` char(60),
  `auth_id` varchar(40) NOT NULL,
  PRIMARY KEY (`validation_email`),
  KEY `FK_validation_auth` (`auth_id`),
  CONSTRAINT `FK_validation_auth` FOREIGN KEY (`auth_id`) REFERENCES `auth` (`auth_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
