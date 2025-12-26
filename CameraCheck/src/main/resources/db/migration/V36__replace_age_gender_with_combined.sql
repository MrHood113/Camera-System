DROP TABLE IF EXISTS age_visit CASCADE;
DROP TABLE IF EXISTS gender_visit CASCADE;

CREATE TABLE age_gender_visit (
    id BIGSERIAL PRIMARY KEY,
    customer_visit_id BIGINT NOT NULL,
    age_group VARCHAR(50) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    visit_count INT NOT NULL,

    CONSTRAINT fk_age_gender_customer_visit FOREIGN KEY (customer_visit_id)
        REFERENCES customer_visit(id)
        ON DELETE CASCADE
);
