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

-- 테이블 kanghoshin_lis.inadequate_type 구조 내보내기
CREATE TABLE IF NOT EXISTS `inadequate_type` (
  `Inadequate_type_code` varchar(11) NOT NULL,
  `Inadequate_type_name` varchar(200) NOT NULL,
  `Inadequate_type_brief_explanation` varchar(200) NOT NULL,
  PRIMARY KEY (`Inadequate_type_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 kanghoshin_lis.inadequate_type:~8 rows (대략적) 내보내기
/*!40000 ALTER TABLE `inadequate_type` DISABLE KEYS */;
INSERT INTO `inadequate_type` (`Inadequate_type_code`, `Inadequate_type_name`, `Inadequate_type_brief_explanation`) VALUES
	('DA', 'Delayed arrival', '병동에서의 사무적 오류로 인한 검체 도착 지연'),
	('HOCOTD', 'Hemolysis or clotting of the blood', '검체의 용혈이나 응집이 생긴 경우'),
	('IAOS', 'Insufficient amount of specimens', '검체량 부족'),
	('IT', 'Incorrect tubes', 'EDTA 용기가 아닌 다른 용기가 접수되어 검체 용기가 부적합했던 경우'),
	('OC', 'Other causes', '다른 환자의 검체로 확인된 경우나, 검체의 바코드 불량, 환자 등록번호 오류 등'),
	('PSC', 'Poor storage condition', '용기 뚜껑이 제대로 닫혀있지 않았거나 제시간에 가온기에 보관되지 않아 검체 보관 상태가 불량했던 경우'),
	('US', 'Unsigned specimens', '채혈자 서명을 기입하여 확인하는데 채혈자의 서명이 누락된 경우'),
	('USIGN', 'Unverifiable signatures', '확인 불가능한 채혈자 서명');
/*!40000 ALTER TABLE `inadequate_type` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
