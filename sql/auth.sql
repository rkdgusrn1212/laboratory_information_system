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

-- 테이블 데이터 kanghoshin_lis.auth:~7 rows (대략적) 내보내기
DELETE FROM `auth`;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` (`auth_id`, `auth_password`, `auth_refresh`, `staff_no`, `validation_email`) VALUES
	('gim765987', '$2a$10$aPMcqy/Kuw/jeFRdLMXfQ.rAKNIaYhnWvUAvDp0D43Gu8t89dqBWS', '3c2bb0f7-46ca-4478-9ee4-23d3e5c567b0', 103, 'gim765987@gmail.com'),
	('kevin3918', '$2a$10$YIhR9SXe0LywrDiiW4.K3.TEtLmdYZpuVRvARBcUn1VflJ.u11Q26', '464a7807-5314-418a-bd68-e0086393b85e', 104, 'kevin3918@naver.com'),
	('kevin91503918', '$2a$10$ipO1HRF.wN/xIF/Twy8Mcujh5Hp9giDEqR6rK9bFSsCcmsXBktN1e', 'b0d64c24-846e-4870-8504-294c8b1c3660', 105, 'kevin91503918@gmail.com'),
	('khgkjg12', '$2a$10$nHJ5D5lbFaZtekHWjiD56.ZFX86YSTGwP3gL6UlCpIyO1gRTuEoki', '1d53f756-0b6c-4bab-8bb3-2f0664c85de2', 110, 'khgkjg12@naver.com'),
	('khgnur12', '$2a$10$mbZbVPsPL1UVfnhaN.TxduBKuPAL9kERj9xSiuNQpkKMLUtT14PJ.', '5f8fa04b-d079-41a2-a1ed-615f25b7d5db', 102, 'khgkjg12@gmail.com'),
	('rhj1216', '$2a$10$kJJMrhKF5OtXg5Xbt/y2xOlXwx/aFDgzcX8YsLW6SG/rDXfUh9PrW', '950b8e8a-b709-438b-a2f8-2b08650e4163', 106, 'rhj1216@naver.com'),
	('rhj1216gg', '$2a$10$R1SaPu.1VwGkv.R08Q/U/.myBj662EWondAeyFGyi2wfy0iA3CtYW', '9d6a70d6-da26-476a-865d-32574eac3bc6', 107, 'rhj1216@gmail.com');
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;

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

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
