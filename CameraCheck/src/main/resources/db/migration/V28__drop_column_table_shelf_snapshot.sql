-- V25__drop_timestamp_from_shelf_snapshot.sql
ALTER TABLE shelf_snapshot
DROP COLUMN IF EXISTS timestamp;
