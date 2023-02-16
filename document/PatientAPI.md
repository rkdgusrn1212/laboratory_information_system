# 환자 API 명세

## Base URL

api/patient

## Read Patient List

### endpoint

list

### Method

GET

### Request Param

- patientNoKey

  patient_no 검색 키

  > patientNoKey=string

- patientNoOrder

  patient_no 정렬

  > patientNoOrder=DESC|ASC

- patientNameKey

  patient_name 검색 키

  > patientNameKey=string,

- patientNameOrder

  patient_name 정렬

  > DESC|ASC

- patientMaleKey

  patient_male 검색 키

  > patientMaleKey=string

- patientMaleOrder

  patient_male 정렬

  > patientMaleOrder=DESC|ASC

- patientPhoneKey

  patient_phone 검색 키

  > patientPhoneKey=string

- patientPhoneOrder

  patient_phone 정렬

  > patientPhoneOrder=DESC|ASC

- patientRrnKey

  patient_rrn 검색 키

  > patientRrnKey=string

- patientRrnOrder

  patient_rrn 정렬

  > patientRrnOrder=DESC|ASC

- patientBirthStart

  patient_birth 기간 시작,

  > patientBirthStart : date

- patientBirthEnd

  patient_birth 기간 끝

  > patientBirthEnd : date

- patientBirthOrder

  patient_birth 정렬

  > patientBirthOrder=DESC|ASC

### Response body

[{
"patientNo": number,
"patientName": string,
"patientMale": boolean,
"patientPhone": string ex) "010-1234-5678",
"patientRrn": string ex) "951212-1231231",
"patientBirth": string ex)"1914-10-12T15:00:00.000+00:00"
},...]

## Read Patient

### endpoint

{no}

- no

  읽을 patient의 patient_no값.

### Method

GET

### Response Body

- 존재할 때

  {
  "patientNo": number,
  "patientName": string,
  "patientBirth": string, ex) "1995-12-11T15:00:00.000+00:00"
  "patientMale": boolean,
  "patientPhone": string, ex) "010-1234-5678"
  "patientRrn": string, ex) "951212-1234567"
  }

- 없을 때

empty
