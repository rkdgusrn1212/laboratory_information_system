-- kanghoshin_lis.diagnostic_test definition

CREATE TABLE `diagnostic_test` (
  `diagnostic_test_code` varchar(10) NOT NULL,
  `test_field_no` int(11) NOT NULL,
  `diagnostic_test_name` varchar(40) DEFAULT NULL,
  `diagnostic_test_specimen` varchar(40) DEFAULT NULL,
  `diagnostic_test_amount` int(11) DEFAULT NULL,
  `diagnostic_test_unit` varchar(10) DEFAULT NULL,
  `diagnostic_test_container` varchar(40) DEFAULT NULL,
  `diagnostic_test_reference` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`diagnostic_test_code`),
  KEY `field_no` (`test_field_no`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;