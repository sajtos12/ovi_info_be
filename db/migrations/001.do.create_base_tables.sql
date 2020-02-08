CREATE TABLE "User" (
	"id" serial NOT NULL,
	"username" varchar(50) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"name" varchar(60) NOT NULL,	
	CONSTRAINT "User_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Kindergarden" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"om" varchar(255) UNIQUE,
	CONSTRAINT "Kindergarden_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Child" (
	"id" serial NOT NULL,
	"kindergarden_id" serial NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"mothers_name" varchar(255) NOT NULL,
	"birthdate" DATE NOT NULL,
	"note" TEXT NOT NULL,
	"group_id" integer NOT NULL,
	"boy" BOOLEAN NOT NULL,
	"girl" BOOLEAN NOT NULL,
	CONSTRAINT "Child_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Group" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"kindergarden_id" integer NOT NULL,
	CONSTRAINT "Group_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "Child" ADD CONSTRAINT "Child_fk0" FOREIGN KEY ("kindergarden_id") REFERENCES "Kindergarden"("id");
ALTER TABLE "Child" ADD CONSTRAINT "Child_fk1" FOREIGN KEY ("group_id") REFERENCES "Group"("id");

ALTER TABLE "Group" ADD CONSTRAINT "Group_fk0" FOREIGN KEY ("kindergarden_id") REFERENCES "Kindergarden"("id");
