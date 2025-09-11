ALTER TABLE shelf_recovery
    RENAME COLUMN total_replenishment_alerts TO replenishment_alerts;

ALTER TABLE shelf_recovery
    ADD COLUMN event_timestamp TIMESTAMP NOT NULL,
    ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;