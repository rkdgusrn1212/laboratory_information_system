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

-- 테이블 kanghoshin_lis.patient 구조 내보내기
CREATE TABLE IF NOT EXISTS `patient` (
  `patient_no` int(11) NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(40) NOT NULL,
  `patient_male` bit(1) NOT NULL,
  `patient_rrn` char(14) NOT NULL,
  `patient_birth` date NOT NULL,
  `patient_phone` varchar(13) NOT NULL,
  PRIMARY KEY (`patient_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 kanghoshin_lis.patient:~5 rows (대략적) 내보내기
DELETE FROM `patient`;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` (`patient_no`, `patient_name`, `patient_male`, `patient_rrn`, `patient_birth`, `patient_phone`) VALUES
	(36, '김덕배', b'1', '840313-1243243', '1984-03-13', '010-2938-4932'),
	(37, '이금희', b'0', '871209-2938737', '1987-12-09', '010-2383-4112'),
	(38, '김재민', b'1', '020808-3314343', '2002-08-08', '010-5738-7782'),
	(39, '김민석', b'1', '880217-1328738', '1988-02-17', '010-9473-0283'),
	(40, '서민지', b'0', '870415-2716361', '1987-04-15', '010-9823-9832');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
