DROP DATABASE IF EXISTS launchstoredb;
CREATE DATABASE launchstoredb;

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL ,
  "user_id" int ,
  "name" text,
  "description" text,
  "old_price" int,
  "price" int,
  "quantity" int,
  "status" int,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,  
  "name" text
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text,
  "product_id" int 
);
INSERT INTO categories(name)VALUES('comida')
INSERT INTO categories(name)VALUES('eletronicos')
INSERT INTO categories(name)VALUES('automoveis')

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" int NOT NULL ,
  "email" text UNIQUE NOT NULL ,
  "password" text NOT NULL,
  "cpf_cnpj" int UNIQUE NOT NULL,
  "cep" text,
  "addres" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);
-- foreidn key
 ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id");
--create procedure
 CREATE FUNCTION trigger_set_timestamp()
 RETURNS TRIGGER AS $$
 BEGIN
  NEW.updated.at = NOW();
  RETURN NEW;
END;
$$LANGUAGE plpgsql;
   --auto updates_at products 

   CREATE TRIGGER set_timestamp 
   BEFORE UPDATE ON products
   FOR EACH ROW
   EXECUTE PROCEDURE trigger_set_timestamp();
    --auto updates_at users 

   CREATE TRIGGER set_timestamp 
   BEFORE UPDATE ON users
   FOR EACH ROW
   EXECUTE PROCEDURE trigger_set_timestamp();

