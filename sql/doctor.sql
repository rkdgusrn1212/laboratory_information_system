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

-- 테이블 kanghoshin_lis.doctor 구조 내보내기
CREATE TABLE IF NOT EXISTS `doctor` (
  `staff_no` int(11) NOT NULL,
  `doctor_certification` int(11) NOT NULL,
  `department_code` char(2) DEFAULT '',
  PRIMARY KEY (`staff_no`),
  KEY `FK_doctor_department` (`department_code`),
  CONSTRAINT `FK_doctor_department` FOREIGN KEY (`department_code`) REFERENCES `department` (`department_code`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_doctor_staff` FOREIGN KEY (`staff_no`) REFERENCES `staff` (`staff_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 kanghoshin_lis.doctor:~7 rows (대략적) 내보내기
DELETE FROM `doctor`;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` (`staff_no`, `doctor_certification`, `department_code`) VALUES
	(102, 193774, '16'),
	(103, 8999, '06'),
	(104, 53672, '07'),
	(105, 87901, '10'),
	(106, 88774, '11'),
	(107, 737642, '04'),
	(194, 771231, '03');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;

-- 트리거 kanghoshin_lis.doctor_after_delete 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `doctor_after_delete` AFTER DELETE ON `doctor` FOR EACH ROW BEGIN
UPDATE staff SET staff_type = 'NAN' WHERE staff_no = OLD.staff_no;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 kanghoshin_lis.doctor_before_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `doctor_before_insert` BEFORE INSERT ON `doctor` FOR EACH ROW BEGIN
UPDATE staff SET staff_type = 'DOC' WHERE staff_no = NEW.staff_no;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
