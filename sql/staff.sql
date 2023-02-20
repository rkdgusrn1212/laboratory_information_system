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

-- 테이블 데이터 kanghoshin_lis.staff:~2 rows (대략적) 내보내기
DELETE FROM `staff`;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` (`staff_no`, `staff_name`, `staff_birth`, `staff_male`, `staff_phone`, `staff_image`, `staff_rrn`, `staff_admitted`, `staff_type`) VALUES
	(80, '강현구', '1995-12-12', b'1', '010-5502-6774', NULL, '951212-1234567', b'1', 1),
	(102, '구한강', '1982-03-27', b'1', '010-3805-7373', NULL, '820327-1193283', b'1', 1),
	(103, '김기남', '1968-09-02', b'1', '010-7767-3823', NULL, '680902-1134562', b'1', 1),
	(104, '김동신', '1988-02-03', b'1', '010-2347-4638', NULL, '880203-1836381', b'1', 1),
	(105, '김미도', '1991-07-28', b'0', '010-4432-1381', NULL, '910728-2113113', b'1', 1),
	(106, '박신혜', '1973-10-11', b'0', '010-2389-7789', NULL, '731011-2141321', b'1', 1),
	(107, '류호진', '1987-01-31', b'1', '010-7763-8214', NULL, '870131-1847382', b'1', 1);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;

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
