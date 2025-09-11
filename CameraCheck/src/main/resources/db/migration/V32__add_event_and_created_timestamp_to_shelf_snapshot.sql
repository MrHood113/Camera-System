-- V2__add_event_and_created_timestamp_to_shelf_snapshot.sql

ALTER TABLE shelf_snapshot
ADD COLUMN event_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE shelf_snapshot
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
