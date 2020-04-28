/*
 Navicat PostgreSQL Data Transfer

 Source Server         : Tony
 Source Server Type    : PostgreSQL
 Source Server Version : 110006
 Source Host           : kandula.db.elephantsql.com:5432
 Source Catalog        : trrqajvm
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 110006
 File Encoding         : 65001

 Date: 28/04/2020 22:10:35
*/


-- ----------------------------
-- Table structure for Adverse_Event
-- ----------------------------
DROP TABLE IF EXISTS "public"."Adverse_Event";
CREATE TABLE "public"."Adverse_Event" (
  "id" int4 NOT NULL DEFAULT nextval('"Adverse_Event_id_seq"'::regclass),
  "idN" int4 NOT NULL,
  "CodeD" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "Description" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "Type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "Name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "Days" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."Adverse_Event" OWNER TO "trrqajvm";

-- ----------------------------
-- Table structure for Medication
-- ----------------------------
DROP TABLE IF EXISTS "public"."Medication";
CREATE TABLE "public"."Medication" (
  "DoseMg" numeric(32) NOT NULL DEFAULT 0,
  "Indication" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "Name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "Route" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "id" int4 NOT NULL DEFAULT nextval('"Medication_id_seq"'::regclass),
  "idN" int4
)
;
ALTER TABLE "public"."Medication" OWNER TO "trrqajvm";

-- ----------------------------
-- Table structure for Problem
-- ----------------------------
DROP TABLE IF EXISTS "public"."Problem";
CREATE TABLE "public"."Problem" (
  "id" int4 NOT NULL DEFAULT nextval('"Problem_id_seq"'::regclass),
  "idN" int4 NOT NULL,
  "CodeD" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "Name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "Description" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "Days" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."Problem" OWNER TO "trrqajvm";

-- ----------------------------
-- Primary Key structure for table Adverse_Event
-- ----------------------------
ALTER TABLE "public"."Adverse_Event" ADD CONSTRAINT "Adverse_Event_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Medication
-- ----------------------------
ALTER TABLE "public"."Medication" ADD CONSTRAINT "Medication_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Problem
-- ----------------------------
ALTER TABLE "public"."Problem" ADD CONSTRAINT "Problem_pkey" PRIMARY KEY ("id");
