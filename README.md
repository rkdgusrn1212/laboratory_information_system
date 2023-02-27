# 프로젝트 개요

KOSA 더존 3기, Final 프로젝트

## 배포

- AWS EC2에 배포
- [강호신 LIS(배포버전)](http://13.209.219.162)

## 프로젝트 주제

진단검사시스템 (LIS, Laboratory Information System)

## 팀 구성원

<table>
  <tr>
    <th>팀장</th>
    <th colspan="2">팀원</th>
    <th>멘토</th>
  </tr>
  <tr>
    <td>강현구</td>
    <td>류호진</td>
    <td>김동신</td>
    <td>박시현</td>
  </tr>
</table>



# 프로젝트 설계

## 기술 기반 설계

![핵심기술](https://user-images.githubusercontent.com/18836863/210029513-ba13f53a-9a6b-40c6-bc6f-62776ad841d6.jpg)

| 분류 | 소분류 | 기술 | 기술 상세 |
| -- | -- | -- | -- |
| 프론트엔드 | 주요기술 | ReactJS | 18.2.0, CRA 기반 SPA |
| | UI | MaterialUI |  5.11.2, icon 5.11.0 |
| | 상태관리 | @reduxjs/toolkit | 1.9.1, 8.0.5 |
| | 개발환경 | npm+yarn | vsc 사용 |
| 백엔드 | 주요기술 | Spring Boot | Spring Boot 2.7.7 |
| |     | Spring Framework | Spring Framework 5.3.24 |
| | Model Boilerplate | lombok | lombok 1.18.24 |
| | 빌드 툴 | Gradle | 7.6 |
| | 메시징 | MQTT | 미정 |
| | 영속성 | MyBatis | MyBatis Spring 2.0.7 |
| | WAS | Tomcat | Tomcat 9.0.70 | 
| | IDE | Eclipse+STS | STS 3.9.18, Eclipse 4.21.0 | 
데이터베이스 | 주요기술 | MariaDB | MariaDB 10.5.18
형상관리 | 주요기술 | Git | Git 2.37.1


## 화면 설계

- OVEN 링크
https://ovenapp.io/view/D7LPazdFls7PxlePZHrjrR8rsEjlP2a8/

- 화면설계서
[화면설계서.pdf](https://github.com/rkdgusrn1212/laboratory_information_system/files/10378222/default.pdf)
