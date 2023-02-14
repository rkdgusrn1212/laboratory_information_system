CREATE TABLE diagnostic_test(  
    test_code VARCHAR(10) NOT NULL, 
    field_no INT NOT NULL,
    test_name VARCHAR(40),
    test_specimen VARCHAR(40),
    test_amount INT,
    test_unit VARCHAR(10),
    test_container VARCHAR(40),
    test_reference VARCHAR(40),
    PRIMARY KEY(test_code),
    FOREIGN KEY(field_no) REFERENCES test_field(field_no)
) DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;
