# 직원 API 명세

## Base URL

api/staff

## Read Staff List

### endpoint

list

### Method

GET

### Request Param

- staffNoKey

  patient_no 검색 키

  > staffNoKey=string

- staffNoOrder

  staff_no 정렬

  > staffNoOrder=DESC|ASC

- staffNameKey

  staff_name 검색 키

  > staffNameKey=string,

- staffNameOrder

  staff_name 정렬

  > DESC|ASC

- staffMaleKey

  staff_male 검색 키

  > staffMaleKey=string

- staffMaleOrder

  staff_male 정렬

  > staffMaleOrder=DESC|ASC

- staffPhoneKey

  staff_phone 검색 키

  > staffPhoneKey=string

- staffPhoneOrder

  staff_phone 정렬

  > staffPhoneOrder=DESC|ASC

- staffRrnKey

  staff_rrn 검색 키

  > staffRrnKey=string

- staffRrnOrder

  staff_rrn 정렬

  > staffRrnOrder=DESC|ASC

- staffBirthStart

  staff_birth 기간 시작,

  > staffBirthStart : date

- staffBirthEnd

  staff_birth 기간 끝

  > staffBirthEnd : date

- staffBirthOrder

  staff_birth 정렬

  > staffBirthOrder=DESC|ASC

- staffAdmittedKey

  staff_admitted 검색 키, '=' 조건

  > staffAdmittedKey=number

- staffTypeKey

  staff_type 검색 키, '=' 조건

  > staffTypeKey=number

- staffAdmittedOrder

  staff_admitted 정렬

  > staffAdmittedOrder=DESC|ASC

- staffTypeOrder

  staff_type 정렬

  > staffTypeOrder=DESC|ASC

### Response body

{
"staffNo": number,
"staffName": string,
"staffMale": boolean,
"staffPhone": string ex) "010-1234-5678",
"staffImage": string desc) URL 형식
"staffRrn": string ex) "951212-1231231",
"staffBirth": string ex)"1914-10-12T15:00:00.000+00:00",
"staffAdmitted": boolean,
"staffType": number
}
