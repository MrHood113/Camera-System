CREATE TABLE age_visit (
    id BIGSERIAL PRIMARY KEY,
    customer_visit_id BIGINT NOT NULL,
    age_group VARCHAR(50) NOT NULL,
    store_visits INT NOT NULL,
    shortage_visits INT NOT NULL,
    CONSTRAINT fk_age_visit_customer FOREIGN KEY (customer_visit_id) REFERENCES customer_visit(id)
);

CREATE TABLE gender_visit (
    id BIGSERIAL PRIMARY KEY,
    customer_visit_id BIGINT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    store_visits INT NOT NULL,
    shortage_visits INT NOT NULL,
    CONSTRAINT fk_gender_visit_customer FOREIGN KEY (customer_visit_id) REFERENCES customer_visit(id)
);