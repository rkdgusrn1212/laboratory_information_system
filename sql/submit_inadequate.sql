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

-- 테이블 kanghoshin_lis.submit_inadequate 구조 내보내기
CREATE TABLE IF NOT EXISTS `submit_inadequate` (
  `specimen_no` int(11) NOT NULL,
  `Inadequate_type_code` varchar(11) NOT NULL,
  `Submit_Inadequate_to` int(11) NOT NULL,
  `Submit_Inadequate_from` int(11) NOT NULL,
  `recept_Inadequate_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`specimen_no`),
  KEY `Inadequate_type_code` (`Inadequate_type_code`),
  KEY `Submit_Inadequate_to` (`Submit_Inadequate_to`),
  KEY `Submit_Inadequate_from` (`Submit_Inadequate_from`),
  CONSTRAINT `FK_submit_inadequate_specimen` FOREIGN KEY (`specimen_no`) REFERENCES `specimen` (`specimen_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `submit_inadequate_ibfk_1` FOREIGN KEY (`Inadequate_type_code`) REFERENCES `inadequate_type` (`Inadequate_type_code`),
  CONSTRAINT `submit_inadequate_ibfk_2` FOREIGN KEY (`Submit_Inadequate_to`) REFERENCES `staff` (`staff_no`),
  CONSTRAINT `submit_inadequate_ibfk_3` FOREIGN KEY (`Submit_Inadequate_from`) REFERENCES `staff` (`staff_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
