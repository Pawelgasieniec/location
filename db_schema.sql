use test;
DROP TABLE IF EXISTS akcje_osoby;
DROP TABLE IF EXISTS akcje_miejsca;
DROP TABLE IF EXISTS osoby_miejsca;
DROP TABLE IF EXISTS akcje;
DROP TABLE IF EXISTS osoby;
DROP TABLE IF EXISTS miejsca;
DROP TABLE IF EXISTS typy_akcji;
DROP TABLE IF EXISTS typy_miejsc;
CREATE TABLE typy_akcji(
    typ_akcji_id int AUTO_INCREMENT
    , nazwa_typu_akcji varchar(100)
    , PRIMARY KEY(typ_akcji_id)
    );
    
CREATE TABLE typy_miejsc(
    typ_miejsca_id int AUTO_INCREMENT
    , nazwa_typu_miejsca varchar(100)
    , PRIMARY KEY(typ_miejsca_id)
    );
    
CREATE TABLE akcje(
    akcja_id int AUTO_INCREMENT
    , nazwa_akcji varchar(100) not null
    , opis_akcji varchar(255)
    , typ_akcji_id int not null
    , PRIMARY KEY(akcja_id)
    , FOREIGN KEY(typ_akcji_id) references typy_akcji(typ_akcji_id)
    );
    
CREATE TABLE miejsca(
    miejsce_id int AUTO_INCREMENT
    , nazwa_miejsca varchar(100) not null
    , opis_miejsca varchar(255)
    , typ_miejsca_id int not null
    , szerokosc_geogr float
    , dlugosc_geogr float
    , PRIMARY KEY(miejsce_id)
    , FOREIGN KEY(typ_miejsca_id) references typy_miejsc(typ_miejsca_id)
    );
    
CREATE TABLE osoby(
    osoba_id int AUTO_INCREMENT
    , imie varchar(50) not null
    , nazwisko varchar(50) not null
    , PRIMARY KEY(osoba_id)
    );
    
CREATE TABLE osoby_miejsca(
    osoby_miejsca_id int AUTO_INCREMENT
    , osoba_id int not null
    , miejsce_id int not null
    , PRIMARY KEY(osoby_miejsca_id)
    , FOREIGN KEY (osoba_id) REFERENCES osoby(osoba_id)
    , FOREIGN KEY (miejsce_id) REFERENCES miejsca(miejsce_id)
    , CONSTRAINT UC_osoby_miejsca UNIQUE (osoba_id, miejsce_id)
    );
    
CREATE TABLE akcje_miejsca(
    akcje_miejsca_id int AUTO_INCREMENT
    , akcja_id int not null
    , miejsce_id int not null
    , PRIMARY KEY(akcje_miejsca_id)
    , FOREIGN KEY (akcja_id) REFERENCES akcje(akcja_id)
    , FOREIGN KEY (miejsce_id) REFERENCES miejsca(miejsce_id)
    , CONSTRAINT UC_akcje_miejsca UNIQUE (akcja_id,miejsce_id)
    );

CREATE TABLE akcje_osoby(
    akcje_osoby_id int AUTO_INCREMENT
    , akcja_id int not null
    , osoba_id int not null
    , PRIMARY KEY(akcje_osoby_id)
    , FOREIGN KEY (akcja_id) REFERENCES akcje(akcja_id)
    , FOREIGN KEY (osoba_id) REFERENCES osoby(osoba_id)
    , CONSTRAINT UC_akcje_osoby UNIQUE (akcja_id,osoba_id)
    );
