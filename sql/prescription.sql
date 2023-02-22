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

-- 테이블 데이터 kanghoshin_lis.prescription:~42 rows (대략적) 내보내기
DELETE FROM `prescription`;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` (`prescription_code`, `behavior_code`, `prescription_name`, `prescription_classification_code`, `prescription_slip_code`, `prescription_comment`) VALUES
	('A0082', 'D0001010', 'Ach-r-binding Ab', 'CP', NULL, NULL),
	('A0237', 'D0001010', 'Anti Cardiolipin IgG', 'CP', NULL, NULL),
	('A0341', 'D0001010', '1CTP', 'CP', NULL, NULL),
	('A0352', 'D0001010', 'Acetazolamide', 'CP', NULL, NULL),
	('A0414', 'D0001010', '1,5-Anhydroglucitol', 'CP', NULL, NULL),
	('A0420', 'D0001010', '2,5-Hexanedione', 'CP', NULL, NULL),
	('A0504', 'D0001010', 'C. difficile Toxin A/B', 'CP', NULL, NULL),
	('A0547', 'D0001010', 'Anion Gap', 'CP', NULL, NULL),
	('A0801', 'D0001010', 'Adenovirus Culture', 'CP', NULL, NULL),
	('A5165', 'D0001010', 'Antiplasmin', 'CP', NULL, NULL),
	('A6047', 'D0001010', 'APCR', 'CP', NULL, NULL),
	('A6065', 'D0001010', 'Anti-Xa LMWH test', 'CP', NULL, NULL),
	('A6163', 'D0001010', 'C. difficile Culture', 'CP', NULL, NULL),
	('A6510', 'D0001010', 'Acylcarnitine 정량', 'CP', NULL, NULL),
	('A6590', 'D0001010', 'AVPR2 gene mutation', 'CP', NULL, NULL),
	('B0680', 'D0001010', 'Egg count', 'CP', NULL, NULL),
	('B1070', 'D0001010', 'Eosinophil count', 'CP', NULL, NULL),
	('B1530', 'D0001010', 'APTT', 'CP', NULL, NULL),
	('B2023', 'D0001010', 'Du Test', 'CP', NULL, NULL),
	('B2510', 'D0001010', 'Albumin', 'CP', NULL, NULL),
	('B2531', 'D0001010', '100g OGTT (임신성 당뇨)', 'CP', NULL, NULL),
	('B2535', 'D0001010', '50g OGTT (임신성 당뇨 스크리닝)', 'CP', NULL, NULL),
	('B2580', 'D0001010', 'ALT (SGPT)', 'CP', NULL, NULL),
	('B2601', 'D0001010', 'Acid phosphatase', 'CP', NULL, NULL),
	('B3081', 'D0001010', 'Dyshemoglobin Test', 'CP', NULL, NULL),
	('B4052', 'D0001010', 'AFB Culture', 'CP', NULL, NULL),
	('B4114', 'D0001010', 'CRE Culture', 'CP', NULL, NULL),
	('B5290', 'D0001010', 'AIDS(HIV) Ag/Ab (combo)', 'CP', NULL, NULL),
	('B53611', 'D0001010', 'CMV IgM', 'CP', NULL, NULL),
	('C3221', 'D0001010', '5-HIAA (Qual)', 'CP', NULL, NULL),
	('C4691', 'D0001010', 'Adenovirus Ag (Stool)', 'CP', NULL, NULL),
	('H0225', 'D0001010', 'DMD/BMD Exon Deletion', 'CP', NULL, NULL),
	('H0576', 'D0001010', 'ABCB11 gene mutation (PFIC2)', 'CP', NULL, NULL),
	('H0667', 'D0001010', '(1-3)β-D-Glucan', 'CP', NULL, NULL),
	('H0735', 'D0001010', 'AR gene, mutation (androgen insensitivity)', 'CP', NULL, NULL),
	('H0827', 'D0001010', 'ALB gene, mutation [sequencing]', 'CP', NULL, NULL);
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;

-- 트리거 kanghoshin_lis.prescription_after_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `prescription_after_insert` AFTER INSERT ON `prescription` FOR EACH ROW BEGIN
IF NEW.prescription_classification_code = 'CP' THEN
INSERT  test_prescription(prescription_code) VALUES(NEW.prescription_code);
END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 kanghoshin_lis.prescription_before_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `prescription_before_insert` BEFORE INSERT ON `prescription` FOR EACH ROW BEGIN
IF NEW.prescription_classification_code != null THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'DO NOT INSERT prescription_classification_code VALUE';
END IF;
IF LEFT(NEW.behavior_code, 1) = 'D' THEN
SET NEW.prescription_classification_code = 'CP';
END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
