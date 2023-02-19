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

-- 테이블 kanghoshin_lis.specimen_type 구조 내보내기
CREATE TABLE IF NOT EXISTS `specimen_type` (
  `specimen_type_code` char(2) NOT NULL,
  `specimen_type_name` varchar(40) NOT NULL,
  PRIMARY KEY (`specimen_type_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 kanghoshin_lis.specimen_type:~94 rows (대략적) 내보내기
DELETE FROM `specimen_type`;
/*!40000 ALTER TABLE `specimen_type` DISABLE KEYS */;
INSERT INTO `specimen_type` (`specimen_type_code`, `specimen_type_name`) VALUES
	('01', 'BLOOD (GEL)'),
	('02', 'EDTA (W/B)'),
	('03', 'CITRATE (P)'),
	('04', 'HEPARIN (W/B)'),
	('05', 'URINE (SPOT)'),
	('06', 'URINE (24HR)'),
	('07', 'BLOOD (PLAIN)'),
	('08', 'URINE (6HR)'),
	('09', 'URINE (2HR)'),
	('10', 'BLOOD (CAPILLARY)'),
	('11', 'BLOOD (CULTURE)'),
	('12', 'CLOSED PUS'),
	('13', 'OPEN PUS'),
	('14', 'TRANSTRACHEAL ASPIRATION'),
	('15', 'BRONCHIAL ASPIRATION'),
	('16', 'SPUTUM'),
	('17', 'THROAT SWAB'),
	('18', 'VOIDED URINE'),
	('19', 'CATHETER URINE'),
	('20', 'SUPRAPUBIC URINE'),
	('21', 'JOINT FLUID'),
	('22', 'STOOL'),
	('23', 'BILE'),
	('24', 'EAR DISCHARGE'),
	('25', 'CSF'),
	('26', 'PLEURAL FLUID'),
	('27', 'ASCITIC FLUID'),
	('28', 'GASTRIC JUICE'),
	('29', 'PCNA(SPECIFY)'),
	('30', 'URETHRAL DISCHARGE'),
	('31', 'VAGINAL DISCHARGE'),
	('32', 'BONE MARROW'),
	('33', 'PERITONEAL FLUID'),
	('34', 'AMNIOTIC FLUID'),
	('35', 'SEMEN'),
	('36', 'PROSTATE SECRETION'),
	('37', 'RECTAL SWAB'),
	('38', 'EYE DISCHARGE'),
	('39', 'SKIN'),
	('40', 'NAIL'),
	('41', 'HAIR'),
	('42', 'TISSUE'),
	('43', 'ENDOCERVIX'),
	('44', 'SALIVA'),
	('45', 'NASAL'),
	('46', 'BAL (Bronchoalveolar lavage)'),
	('47', 'PSB (Protected specimen Brush)'),
	('48', 'SYNOVIAL FLUID'),
	('49', 'NASOPHARYNGEAL'),
	('50', 'TONSIL'),
	('51', 'TRACHEAL TIP'),
	('52', 'TRACHEOSTOMY SITE'),
	('53', 'ORAL MUCOSA'),
	('54', 'PTBD FLUID'),
	('55', 'CAPD FLUID'),
	('56', 'CYSTIC FLUID'),
	('57', 'PERICARDIAL FLUID'),
	('58', 'SINUSOIDAL FLUID'),
	('59', 'GASTRIC BIOPSY'),
	('60', 'DUODENAL BIOPSY'),
	('61', 'INTESTINAL BIOPSY'),
	('62', 'BARTHOLIN'),
	('63', 'CONCEPTION'),
	('64', 'CULDESAC'),
	('65', 'ENDOMETRIAL'),
	('66', 'IUD(Intrauterine Device) or LOOP'),
	('67', 'SORE'),
	('68', 'WOUND'),
	('69', 'BONE'),
	('70', 'BRAIN ABSCESS'),
	('71', 'LIVER ABSCESS'),
	('72', 'LUNG ABSCESS'),
	('73', 'SKIN ABSCESS'),
	('74', 'BREAST ABSCESS'),
	('75', 'LYMPH NODE'),
	('76', 'BULLAE'),
	('77', 'BURN'),
	('78', 'ARTERIAL CATHETER'),
	('79', 'HEMOVAC CATHETER'),
	('80', 'UMBILICAL CATHETER'),
	('81', 'VENOUS CATHETER'),
	('82', 'FISTULA TRACT'),
	('83', 'ANUS'),
	('84', 'SPECIFIC OTHERS'),
	('85', 'BM DNA EXTRACT'),
	('86', 'OTHER FLUID'),
	('87', 'ACD WHOLE BLOOD 5mL'),
	('88', 'SPECIFIC OTHERS (METAL)'),
	('89', 'OTHERS CATHETER'),
	('90', 'CVP cath'),
	('96', 'BONE BANK'),
	('97', '혈당 검사'),
	('98', '전용 용기'),
	('99', 'OTHERS');
/*!40000 ALTER TABLE `specimen_type` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
