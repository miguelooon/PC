drop table if exists templates;
drop table if exists psql_procedures;
drop table if exists db_data;


CREATE TABLE db_data (
    id serial PRIMARY KEY,
    db_name VARCHAR(70) not null,
    host VARCHAR(70) not null,
    port INTEGER not null,
    db_user VARCHAR(70) not null,
    password VARCHAR(70) not null
);


CREATE TABLE psql_procedures (
    id serial PRIMARY KEY,
    fk_id_db integer,
    name VARCHAR(70) UNIQUE NOT NULL,
    description text,
    input_count integer NOT NULL,
    params text[] NOT NULL,
    FOREIGN KEY (fk_id_db) REFERENCES db_data(id)
);

CREATE table templates (
    id serial PRIMARY KEY,
    fk_id_psql_procedure integer,
    template_name VARCHAR(70) unique not null,
    plantilla_codigo text not null,
    FOREIGN KEY (fk_id_psql_procedure) REFERENCES psql_procedures(id)
);





