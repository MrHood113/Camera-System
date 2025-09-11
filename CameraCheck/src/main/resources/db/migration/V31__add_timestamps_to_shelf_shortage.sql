-- Add event_timestamp and created_at to shelf_shortage

ALTER TABLE shelf_shortage
ADD COLUMN event_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
