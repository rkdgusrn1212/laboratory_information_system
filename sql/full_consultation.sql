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

-- 뷰 kanghoshin_lis.full_consultation 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `full_consultation` (
	`consultation_no` INT(11) NOT NULL,
	`consultation_time` DATETIME NOT NULL,
	`consultation_reception_no` INT(11) NOT NULL,
	`consultation_reception_time` DATETIME NOT NULL,
	`staff_no` INT(11) NOT NULL,
	`patient_no` INT(11) NOT NULL,
	`consultation_reception_appointment` DATETIME NULL
) ENGINE=MyISAM;

-- 뷰 kanghoshin_lis.full_consultation 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `full_consultation`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `full_consultation` AS select `consultation`.`consultation_no` AS `consultation_no`,`consultation`.`consultation_time` AS `consultation_time`,`consultation_reception`.`consultation_reception_no` AS `consultation_reception_no`,`consultation_reception`.`consultation_reception_time` AS `consultation_reception_time`,`consultation_reception`.`staff_no` AS `staff_no`,`consultation_reception`.`patient_no` AS `patient_no`,`consultation_reception`.`consultation_reception_appointment` AS `consultation_reception_appointment` from (`consultation` join `consultation_reception` on(`consultation`.`consultation_reception_no` = `consultation_reception`.`consultation_reception_no`));

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
