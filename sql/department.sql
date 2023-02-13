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

-- 테이블 kanghoshin_lis.department 구조 내보내기
CREATE TABLE IF NOT EXISTS `department` (
  `department_code` char(2) NOT NULL DEFAULT '0',
  `department_name` varchar(40) NOT NULL,
  PRIMARY KEY (`department_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 kanghoshin_lis.department:~59 rows (대략적) 내보내기
DELETE FROM `department`;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` (`department_code`, `department_name`) VALUES
	('00', '일반의'),
	('01', '내과'),
	('02', '신경과'),
	('03', '정신건강의학과'),
	('04', '외과'),
	('05', '정형외과'),
	('06', '신경외과'),
	('07', '심장혈관흉부외과'),
	('08', '성형외과'),
	('09', '마취통증의학과'),
	('10', '산부인과'),
	('11', '소아청소년과'),
	('12', '안과'),
	('13', '이비인후과'),
	('14', '피부과'),
	('15', '비뇨의학과'),
	('16', '영상의학과'),
	('17', '방사선종양학과'),
	('18', '병리과'),
	('19', '진단검사의학과'),
	('20', '결핵과'),
	('21', '재활의학과'),
	('22', '핵의학과'),
	('23', '가정의학과'),
	('24', '응급의학과'),
	('25', '직업환경의학과'),
	('26', '예방의학과'),
	('27', '기타1(치과)'),
	('28', '기타4(한방)'),
	('31', '기타2'),
	('40', '기타2'),
	('41', '보건'),
	('42', '기타3'),
	('43', '보건기관치과'),
	('44', '보건기관한방'),
	('49', '치과'),
	('50', '구강악안면외과'),
	('51', '치과보철과'),
	('52', '치과교정과'),
	('53', '소아치과'),
	('54', '치주과'),
	('55', '치과보존과'),
	('56', '구강내과'),
	('57', '영상치의학과'),
	('58', '구강병리과'),
	('59', '예방치과'),
	('60', '치과소계'),
	('61', '통합치의학과'),
	('80', '한방내과'),
	('81', '한방부인과'),
	('82', '한방소아과'),
	('83', '한방안·이비인후·피부과'),
	('84', '한방신경정신과'),
	('85', '침구과'),
	('86', '한방재활의학과'),
	('87', '사상체질과'),
	('88', '한방응급'),
	('89', '한방응급'),
	('90', '한방소계');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
