-- Creation of a DB (DataBase) -- 

create database pwa;

-- Seleccion de la DB a utilizar --

use pwi;

-- Creacion de la tabla --

create table alumno(
nombre varchar(40),
apellido varchar(30),
dni int(20),
direccion varchar(100),
carrera varchar(50)
);

-- seleccion de la tabla --

select * from alumno;

use sakila;

select * from city;