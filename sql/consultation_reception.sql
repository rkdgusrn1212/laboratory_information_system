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

-- 테이블 kanghoshin_lis.consultation_reception 구조 내보내기
CREATE TABLE IF NOT EXISTS `consultation_reception` (
  `consultation_reception_no` int(11) NOT NULL AUTO_INCREMENT,
  `consultation_reception_time` datetime NOT NULL,
  `staff_no` int(11) NOT NULL,
  `patient_no` int(11) NOT NULL,
  `consultation_no` int(11) NOT NULL DEFAULT 0,
  `consultation_reception_appointment` datetime DEFAULT NULL,
  PRIMARY KEY (`consultation_reception_no`) USING BTREE,
  KEY `FK__doctor` (`staff_no`),
  KEY `FK__patient` (`patient_no`),
  CONSTRAINT `FK__doctor` FOREIGN KEY (`staff_no`) REFERENCES `doctor` (`staff_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK__patient` FOREIGN KEY (`patient_no`) REFERENCES `patient` (`patient_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 트리거 kanghoshin_lis.consultation_reception_before_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `consultation_reception_before_insert` BEFORE INSERT ON `consultation_reception` FOR EACH ROW BEGIN
SET NEW.consultation_reception_time = NOW();
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
