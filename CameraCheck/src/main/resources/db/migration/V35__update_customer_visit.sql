ALTER TABLE customer_visit
    DROP COLUMN age_group,
    DROP COLUMN gender;

ALTER TABLE customer_visit
     RENAME COLUMN shortage_visits TO total_shortage_visits;