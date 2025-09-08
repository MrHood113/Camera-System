-- ================================
-- STORES
-- ================================
CREATE TABLE store (
    id BIGSERIAL PRIMARY KEY,
    store_name VARCHAR(255) NOT NULL,
    location VARCHAR(255)
);

-- ================================
-- SHELVES
-- ================================
CREATE TABLE shelf (
    id BIGSERIAL PRIMARY KEY,
    shelf_name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    store_id BIGINT NOT NULL REFERENCES store(id) ON DELETE CASCADE
);

-- ================================
-- SHELF SNAPSHOTS (OSA Rate)
-- ================================
CREATE TABLE shelf_snapshot (
    id BIGSERIAL PRIMARY KEY,
    shelf_id BIGINT NOT NULL REFERENCES shelf(id) ON DELETE CASCADE,
    expected_items INT NOT NULL,
    current_items INT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

-- ================================
-- SHELF RECOVERY
-- ================================
CREATE TABLE shelf_recovery (
    id BIGSERIAL PRIMARY KEY,
    shelf_id BIGINT NOT NULL REFERENCES shelf(id) ON DELETE CASCADE,
    total_replenishment_alerts INT NOT NULL,
    on_time_recoveries INT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

-- ================================
-- SHELF SHORTAGE
-- ================================
CREATE TABLE shelf_shortage (
    id BIGSERIAL PRIMARY KEY,
    shelf_id BIGINT NOT NULL REFERENCES shelf(id) ON DELETE CASCADE,
    total_operating_hours DOUBLE PRECISION NOT NULL,
    shortage_hours DOUBLE PRECISION NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

-- ================================
-- CUSTOMER VISITS
-- ================================
CREATE TABLE customer_visit (
    id BIGSERIAL PRIMARY KEY,
    store_id BIGINT NOT NULL REFERENCES store(id) ON DELETE CASCADE,
    visit_time TIMESTAMP NOT NULL,
    age_group VARCHAR(50),
    gender VARCHAR(20),
    during_shortage BOOLEAN DEFAULT FALSE
);

-- ================================
-- INDEXES
-- ================================
CREATE INDEX idx_shelf_store ON shelf(store_id);
CREATE INDEX idx_snapshot_shelf ON shelf_snapshot(shelf_id);
CREATE INDEX idx_recovery_shelf ON shelf_recovery(shelf_id);
CREATE INDEX idx_shortage_shelf ON shelf_shortage(shelf_id);
CREATE INDEX idx_customer_store ON customer_visit(store_id);
