-- ===============================
-- ALTER ShelfSnapshotModel
-- ===============================
ALTER TABLE shelf_snapshot
    ADD COLUMN missing_items INT NOT NULL DEFAULT 0;

-- ===============================
-- ALTER ShelfShortageModel
-- ===============================
ALTER TABLE shelf_shortage
    RENAME COLUMN shortage_hours TO total_shortage_hours;

ALTER TABLE shelf_shortage
    ADD COLUMN duration_above_threshold DOUBLE PRECISION NOT NULL DEFAULT 0;

ALTER TABLE shelf_shortage
    DROP COLUMN IF EXISTS timestamp;

-- ===============================
-- ALTER ShelfRecoveryModel
-- ===============================
ALTER TABLE shelf_recovery
    ADD COLUMN overtime_recoveries INT NOT NULL DEFAULT 0;

ALTER TABLE shelf_recovery
    DROP COLUMN IF EXISTS timestamp;

-- ===============================
-- ALTER CustomerVisitModel
-- ===============================
ALTER TABLE customer_visit
    ADD COLUMN shortage_visits INT NOT NULL DEFAULT 0,
    ADD COLUMN total_store_visits INT NOT NULL DEFAULT 0;

ALTER TABLE customer_visit
    DROP COLUMN IF EXISTS visit_time,
    DROP COLUMN IF EXISTS during_shortage;
