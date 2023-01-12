CREATE DATABASE orgtrans;
CREATE TABLE contact(
    contact_id SERIAL PRIMARY KEY,
    client VARCHAR (50),
    email VARCHAR(255),
    message VARCHAR(1000)
);
CREATE TABLE donorcard(
    donor_id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    AADHAR_card BIGINT,
    email VARCHAR(50),
    address_id VARCHAR(250),
    Phone_no BIGINT,
    Country VARCHAR(30),
    State_name VARCHAR(30),
    zip VARCHAR(30),
    height INTEGER,
    weight_kg INTEGER,
    gender VARCHAR(10),
    father_name VARCHAR(50),
    mother_name VARCHAR(50),
    ts TIMESTAMP
   
    );
     SET timezone='Asia/Calcutta';
     CREATE TABLE hospital(
        
         hospital_id  VARCHAR (20) PRIMARY KEY UNIQUE,
         password VARCHAR(50)
         );
         CREATE TABLE hospitalinfo(
             hosp_id  VARCHAR(20) REFERENCES hospital(hospital_id),
             hospname VARCHAR(250) PRIMARY KEY,
             hosp_address VARCHAR(500),
             phone BIGINT,
             website VARCHAR(100),
             organs VARCHAR(100)
         );
         alter table hospitalinfo add column longitude double precision ;

 alter table hospitalinfo add column latitude double precision;


 create extension postgis;

 alter table hospitalinfo add column geolocation geography(point);
         CREATE TABLE doctor(
              doc_name VARCHAR(50) PRIMARY KEY,
             hosp_id VARCHAR(20) REFERENCES hospital(hospital_id),
             doc_phone BIGINT,
             appointement TIME

         );
CREATE TABLE chemists(
    hosp_id  VARCHAR(20) REFERENCES hospital(hospital_id),
    chemist_name VARCHAR(50) PRIMARY KEY,
    chemist_phone BIGINT,
    chemist_address VARCHAR(250)
);
CREATE TABLE transplantcoordinator(
    hosp_id  VARCHAR(20) REFERENCES hospital(hospital_id),
    coordinator_name VARCHAR(50) PRIMARY KEY,
    coordinator_phone BIGINT,
    coordinator_email VARCHAR(50)
);   
CREATE TABLE bloodbank(
    hosp_id  VARCHAR(20) REFERENCES hospital(hospital_id),
    bank_name VARCHAR(100) PRIMARY KEY,
    bank_phone BIGINT,
    bank_address VARCHAR(250)
) ;
CREATE TABLE labs(
     hosp_id  VARCHAR(20) REFERENCES hospital(hospital_id),
    lab_name VARCHAR(100) PRIMARY KEY,
    lab_phone BIGINT,
    lab_address VARCHAR(250),
    lab_email VARCHAR(50)
);
CREATE TABLE medicalsupplies(
      hosp_id  VARCHAR(20) REFERENCES hospital(hospital_id),
    supply_name VARCHAR(50) PRIMARY KEY,
    supply_phone BIGINT,
    supply_address VARCHAR(250),
    supply_email VARCHAR(50)
);
CREATE TABLE ambulance(
hosp_id  VARCHAR(20) REFERENCES hospital(hospital_id),
     ambulance_name VARCHAR(50) PRIMARY KEY,
     ambulance_phone BIGINT,
     ambulance_address VARCHAR(250)
);
CREATE TABLE recipient(
recipient_id INTEGER REFERENCES  donorcard(donor_id) PRIMARY KEY,
hospid VARCHAR(20) REFERENCES hospital(hospital_id),
bloodtype VARCHAR(10),
tissuetype VARCHAR(10),
bodysize   INTEGER,
MELD_PELD_score INTEGER,
regdate DATE,
lymphocytotoxic VARCHAR(100),
no_of_HLA_antigens INTEGER,
CMV_EBV_details VARCHAR(100),
Organ_reqcode INTEGER,
emergency_statuscode INTEGER,
recipient_report VARCHAR(500)
);
CREATE TABLE braindeath(
deaddonor_id INTEGER REFERENCES  donorcard(donor_id) PRIMARY KEY,
hospi_id VARCHAR(20) REFERENCES hospital(hospital_id),
bloodtype VARCHAR(10),
tissuetype VARCHAR(10),
bodysize   INTEGER,
MELD_PELD_score INTEGER,
regdate DATE,
lymphocytotoxic VARCHAR(100),
no_of_HLA_antigens INTEGER,
CMV_EBV_details VARCHAR(100),
Organ_doncode INTEGER,
deaddonor_report VARCHAR(500)
);
 CREATE TABLE MATCH(

    MATCH_ID uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
   

 recipient_id INTEGER,
 bloodtype VARCHAR(10),
 tissuetype VARCHAR(10),
 bodysize   INTEGER,
 MELD_PELD_score INTEGER,
 regdate DATE,
 lymphocytotoxic VARCHAR(100),
 no_of_HLA_antigens INTEGER,
 CMV_EBV_details VARCHAR(100),
 Organ_reqcode INTEGER,
 emergency_statuscode INTEGER,
 recipient_report VARCHAR(500),
 deaddonor_id INTEGER,
 hospi_id VARCHAR(20),
 dbloodtype VARCHAR(10),
 dtissuetype VARCHAR(10),
 dbodysize   INTEGER,
 dMELD_PELD_score INTEGER,
 dregdate DATE,
 dlymphocytotoxic VARCHAR(100),
 dno_of_HLA_antigens INTEGER,
 dCMV_EBV_details VARCHAR(100),
 dOrgan_doncode INTEGER,
 deaddonor_report VARCHAR(500),
 Match_orgCode VARCHAR(10) );
  ALTER TABLE match
 ADD COLUMN match_date DATE;
  
CREATE TABLE complaint(
    complaint_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    Register_name VARCHAR(40),
    Against VARCHAR(50),
    complaint_msg VARCHAR(1000)
);