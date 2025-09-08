-- =========================
-- Customer Domain
-- =========================
CREATE TABLE customer (
    id BIGSERIAL PRIMARY KEY,
    gender VARCHAR(10) NOT NULL,
    age_group VARCHAR(20) NOT NULL
);

CREATE TABLE customer_visit (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customer(id),
    shelf_id BIGINT NOT NULL,
    visit_time TIMESTAMP NOT NULL
);

-- =========================
-- Shelf Domain
-- =========================
CREATE TABLE shelf (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL
);

ALTER TABLE customer_visit
    ADD CONSTRAINT fk_customer_visit_shelf
    FOREIGN KEY (shelf_id) REFERENCES shelf(id);

CREATE TABLE shelf_operation (
    id BIGSERIAL PRIMARY KEY,
    shelf_id BIGINT NOT NULL REFERENCES shelf(id),
    operationDate DATE NOT NULL,
    operating_hours INT NOT NULL,
    total_items INT NOT NULL,
    shortage_items INT NOT NULL
);

-- =========================
-- OSA Domain
-- =========================
CREATE TABLE osa_measurement (
    id BIGSERIAL PRIMARY KEY,
    shelf_id BIGINT NOT NULL REFERENCES shelf(id),
    measure_time TIMESTAMP NOT NULL,
    available_quantity INT NOT NULL,
    expected_quantity INT NOT NULL,
    shortage_ratio DECIMAL(5,2) NOT NULL
);

-- =========================
-- Alert Domain
-- =========================
CREATE TABLE shelf_alert (
    id BIGSERIAL PRIMARY KEY,
    shelf_id BIGINT NOT NULL REFERENCES shelf(id),
    alert_time TIMESTAMP NOT NULL,
    shortage_ratio DECIMAL(5,2) NOT NULL,
    resolved BOOLEAN DEFAULT FALSE
);

-- =========================
-- Recovery Domain
-- =========================
CREATE TABLE replenishment_event (
    id BIGSERIAL PRIMARY KEY,
    shelf_id BIGINT NOT NULL REFERENCES shelf(id),
    event_time TIMESTAMP NOT NULL,
    alert_id BIGINT REFERENCES shelf_alert(id)
);
