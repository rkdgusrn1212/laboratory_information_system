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

-- 테이블 kanghoshin_lis.test_prescription 구조 내보내기
CREATE TABLE IF NOT EXISTS `test_prescription` (
  `prescription_code` varchar(10) NOT NULL,
  `specimen_type_code` char(2) DEFAULT NULL,
  `specimen_container_code` char(2) DEFAULT NULL,
  `test_prescription_amount` int(11) DEFAULT NULL,
  `test_prescription_unit` varchar(10) DEFAULT NULL,
  `test_prescription_reference` varchar(200) DEFAULT NULL,
  `test_field_code` char(4) DEFAULT NULL,
  PRIMARY KEY (`prescription_code`) USING BTREE,
  KEY `FK_test_prescription_specimen_type` (`specimen_type_code`) USING BTREE,
  KEY `FK_test_prescription_specimen_container` (`specimen_container_code`) USING BTREE,
  KEY `FK_test_prescription_test_field` (`test_field_code`),
  CONSTRAINT `FK_test_prescription_prescription` FOREIGN KEY (`prescription_code`) REFERENCES `prescription` (`prescription_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_test_prescription_specimen_container` FOREIGN KEY (`specimen_container_code`) REFERENCES `specimen_container` (`specimen_container_code`) ON UPDATE CASCADE,
  CONSTRAINT `FK_test_prescription_specimen_type` FOREIGN KEY (`specimen_type_code`) REFERENCES `specimen_type` (`specimen_type_code`) ON UPDATE CASCADE,
  CONSTRAINT `FK_test_prescription_test_field` FOREIGN KEY (`test_field_code`) REFERENCES `test_field` (`test_field_code`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 kanghoshin_lis.test_prescription:~36 rows (대략적) 내보내기
DELETE FROM `test_prescription`;
/*!40000 ALTER TABLE `test_prescription` DISABLE KEYS */;
INSERT INTO `test_prescription` (`prescription_code`, `specimen_type_code`, `specimen_container_code`, `test_prescription_amount`, `test_prescription_unit`, `test_prescription_reference`, `test_field_code`) VALUES
	('A0082', '01', '01', 1, 'ml', '<  0.5  nmol/L', 'DI01'),
	('A0237', '01', '01', 1, 'ml', 'Negative  ≤  20  CU', 'DI01'),
	('A0341', '01', '01', 2, 'ml', '≤4.49  ng/mL', 'DI01'),
	('A0352', '01', '01', 2, 'ml', 'Not  established  ug/mL', 'GI01'),
	('A0414', '01', '01', 1, 'mL', '≥14.00 ug/mL', 'CC01'),
	('A0420', '05', '98', 10, 'ml', '< 5.00 mg/L', 'GI01'),
	('A0504', '22', '10', 2, 'g', 'Negative', 'CM01'),
	('A0547', '01', '01', 1, 'mL', 'Anion Gap : 10.00~20.00 mEq/L', 'CC01'),
	('A0801', '05', '98', 5, 'mL', 'No  Adeno  virus  isolated', 'CM01'),
	('A5165', '03', '03', 1, 'mL', '80  ~  130  %', 'DH01'),
	('A6047', '03', '03', 1, 'mL', 'Negative', 'DH01'),
	('A6065', '03', '03', 1, 'mL', '0.3-0.7 IU/mL (헤파린 투여자의 적정치료범위)', 'DH01'),
	('A6163', '22', '10', 10, 'g', '없음', 'CM01'),
	('A6510', '02', '02', 3, 'ml', '없음', 'GI01'),
	('A6590', '02', '02', 3, 'ml', '없음', 'MG01'),
	('B0680', '22', '10', 10, 'g', '없음', 'CM01'),
	('B1070', '02', '02', 3, 'mL', '50.0 ~ 500.0/uL', 'DH01'),
	('B1530', '03', '03', 1, 'mL', '30.5 ~ 45 Sec', 'DH01'),
	('B2023', '02', '02', 2, 'mL', '없음', 'DH01'),
	('B2510', '01', '01', 1, 'mL', '3.50  ~  5.20  g/dL', 'CC01'),
	('B2531', '01', '01', 1, 'mL', '공복: < 95 mg/dL, 1시간: < 180 mg/dL, 2시간: < 155 mg/dL, 3시간: < 140 mg/dL', 'CC01'),
	('B2535', '01', '01', 1, 'mL', '< 140 mg/dL', 'CC01'),
	('B2580', '01', '01', 1, 'mL', '≤41 U/L', 'CC01'),
	('B2601', '01', '01', 1, 'mL', '여자 : ≤6.5, 남자 : ≤6.6 U/L', 'CC01'),
	('B3081', '02', '02', 2, 'mL', 'Met Hb : < 1.5%, Carboxy Hb(CO-Hb) : 비흡연 ≤ 2.0', 'DH01'),
	('B4052', '05', '98', 10, 'mL', '없음', 'CM01'),
	('B4114', '22', '10', 5, 'g', '없음', 'CM01'),
	('B5290', '01', '01', 1, 'ml', 'Negative', 'DI01'),
	('B53611', '01', '01', 1, 'ml', 'Non-Reactive < 0.85, Gray Zone 0.85 ~ <  1.0, Reactive ≥ 1.0 Index', 'DI01'),
	('C3221', '05', '98', 10, 'ml', 'Negative', 'GI01'),
	('C4691', '22', '10', 5, 'g', 'Negative', 'CM01'),
	('H0225', '02', '02', 3, 'ml', '없음', 'MG01'),
	('H0576', '02', '02', 4, 'ml', '없음', 'MG01'),
	('H0667', '01', '01', 1, 'ml', 'Negative < 60.0, Intermediate 60.0~79.9, Positive ≥ 80.0 pg/mL', 'GI01'),
	('H0735', '02', '02', 4, 'ml', '없음', 'MG01'),
	('H0827', '02', '02', 4, 'ml', '없음', 'MG01');
/*!40000 ALTER TABLE `test_prescription` ENABLE KEYS */;

-- 트리거 kanghoshin_lis.test_prescription_after_delete 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `test_prescription_after_delete` AFTER DELETE ON `test_prescription` FOR EACH ROW BEGIN
DELETE FROM prescription WHERE prescription_code = OLD.prescription_code;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
