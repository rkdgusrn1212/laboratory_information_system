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

-- 뷰 kanghoshin_lis.expanded_test_order 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `expanded_test_order` (
	`prescription_order_no` INT(11) NOT NULL,
	`consultation_no` INT(11) NOT NULL,
	`prescription_code` VARCHAR(10) NOT NULL COLLATE 'utf8_general_ci',
	`prescription_order_time` DATETIME NOT NULL,
	`specimen_container_code` CHAR(2) NOT NULL COLLATE 'utf8_general_ci',
	`specimen_container_name` VARCHAR(40) NOT NULL COLLATE 'utf8_general_ci',
	`specimen_type_code` CHAR(2) NOT NULL COLLATE 'utf8_general_ci',
	`specimen_type_name` VARCHAR(40) NOT NULL COLLATE 'utf8_general_ci',
	`prescription_name` VARCHAR(200) NOT NULL COLLATE 'utf8_general_ci',
	`prescription_classification_code` VARCHAR(10) NULL COLLATE 'utf8_general_ci',
	`prescription_classification_name` VARCHAR(40) NOT NULL COLLATE 'utf8_general_ci',
	`prescription_slip_code` VARCHAR(10) NULL COLLATE 'utf8_general_ci',
	`prescription_comment` VARCHAR(200) NULL COLLATE 'utf8_general_ci',
	`consultation_time` DATETIME NOT NULL,
	`consultation_reception_no` INT(11) NOT NULL,
	`patient_no` INT(11) NOT NULL,
	`staff_no` INT(11) NOT NULL,
	`department_code` CHAR(2) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;

-- 뷰 kanghoshin_lis.expanded_test_order 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `expanded_test_order`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `expanded_test_order` AS select `prescription_order`.`prescription_order_no` AS `prescription_order_no`,`prescription_order`.`consultation_no` AS `consultation_no`,`prescription_order`.`prescription_code` AS `prescription_code`,`prescription_order`.`prescription_order_time` AS `prescription_order_time`,`specimen_container`.`specimen_container_code` AS `specimen_container_code`,`specimen_container`.`specimen_container_name` AS `specimen_container_name`,`specimen_type`.`specimen_type_code` AS `specimen_type_code`,`specimen_type`.`specimen_type_name` AS `specimen_type_name`,`prescription`.`prescription_name` AS `prescription_name`,`prescription`.`prescription_classification_code` AS `prescription_classification_code`,`prescription_classification`.`prescription_classification_name` AS `prescription_classification_name`,`prescription`.`prescription_slip_code` AS `prescription_slip_code`,`prescription`.`prescription_comment` AS `prescription_comment`,`consultation`.`consultation_time` AS `consultation_time`,`consultation`.`consultation_reception_no` AS `consultation_reception_no`,`consultation_reception`.`patient_no` AS `patient_no`,`doctor`.`staff_no` AS `staff_no`,`doctor`.`department_code` AS `department_code` from ((((((((`prescription_order` join `test_prescription` on(`prescription_order`.`prescription_code` = `test_prescription`.`prescription_code`)) join `specimen_type` on(`test_prescription`.`specimen_type_code` = `specimen_type`.`specimen_type_code`)) join `specimen_container` on(`test_prescription`.`specimen_container_code` = `specimen_container`.`specimen_container_code`)) join `prescription` on(`test_prescription`.`prescription_code` = `prescription`.`prescription_code`)) join `prescription_classification` on(`prescription_classification`.`prescription_classification_code` = `prescription`.`prescription_classification_code`)) join `consultation` on(`prescription_order`.`consultation_no` = `consultation`.`consultation_no`)) join `consultation_reception` on(`consultation`.`consultation_reception_no` = `consultation_reception`.`consultation_reception_no`)) join `doctor` on(`doctor`.`staff_no` = `consultation_reception`.`staff_no`));

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
