ALTER TABLE shelf_shortage
    RENAME COLUMN total_operating_hours TO shelf_operating_hours;

ALTER TABLE shelf_shortage
    RENAME COLUMN total_shortage_hours TO shelf_shortage_hours;

ALTER TABLE shelf_snapshot
    ADD COLUMN timestamp TIMESTAMP NOT NULL;