-- ================================
-- Sample Customers
-- ================================
INSERT INTO customer (gender, age_group) VALUES
 ('Male',   '10-19'),
 ('Female', '10-19'),
 ('Male',   '20-29'),
 ('Female', '20-29'),
 ('Male',   '30-39'),
 ('Female', '30-39'),
 ('Male',   '40-49'),
 ('Female', '40-49');

-- ================================
-- Sample Shelves
-- ================================
INSERT INTO shelf (name, category) VALUES
 ('Beverages', 'Drinks'),
 ('Snacks',    'Food'),
 ('Dairy',     'Food');

-- ================================
-- Shelf Operations (3 ngày gần nhất)
-- ================================
INSERT INTO shelf_operation (shelf_id, operation_date, operating_hours, total_items, shortage_items)
(
  SELECT id, CURRENT_DATE - INTERVAL '2 days', 8, 200, 20 FROM shelf WHERE name = 'Beverages'
  UNION ALL
  SELECT id, CURRENT_DATE - INTERVAL '2 days', 8, 150, 15 FROM shelf WHERE name = 'Snacks'
  UNION ALL
  SELECT id, CURRENT_DATE - INTERVAL '2 days', 8, 180, 10 FROM shelf WHERE name = 'Dairy'
);

INSERT INTO shelf_operation (shelf_id, operation_date, operating_hours, total_items, shortage_items)
(
  SELECT id, CURRENT_DATE - INTERVAL '1 days', 8, 200, 25 FROM shelf WHERE name = 'Beverages'
  UNION ALL
  SELECT id, CURRENT_DATE - INTERVAL '1 days', 8, 150, 20 FROM shelf WHERE name = 'Snacks'
  UNION ALL
  SELECT id, CURRENT_DATE - INTERVAL '1 days', 8, 180, 15 FROM shelf WHERE name = 'Dairy'
);

INSERT INTO shelf_operation (shelf_id, operation_date, operating_hours, total_items, shortage_items)
(
  SELECT id, CURRENT_DATE, 8, 200, 30 FROM shelf WHERE name = 'Beverages'
  UNION ALL
  SELECT id, CURRENT_DATE, 8, 150, 25 FROM shelf WHERE name = 'Snacks'
  UNION ALL
  SELECT id, CURRENT_DATE, 8, 180, 20 FROM shelf WHERE name = 'Dairy'
);

-- ================================
-- OSA Measurements (15min slots, sample trong ngày hôm nay)
-- ================================
INSERT INTO osa_measurement (shelf_id, measure_time, available_quantity, expected_quantity, shortage_ratio)
(
  SELECT id, CURRENT_DATE + TIME '08:00', 180, 200, 10.00 FROM shelf WHERE name = 'Beverages'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:15', 160, 200, 20.00 FROM shelf WHERE name = 'Beverages'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:30', 150, 200, 25.00 FROM shelf WHERE name = 'Beverages'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:45', 170, 200, 15.00 FROM shelf WHERE name = 'Beverages'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '09:00', 180, 200, 10.00 FROM shelf WHERE name = 'Beverages'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '09:15', 200, 200, 0.00 FROM shelf WHERE name = 'Beverages'
);

INSERT INTO osa_measurement (shelf_id, measure_time, available_quantity, expected_quantity, shortage_ratio)
(
  SELECT id, CURRENT_DATE + TIME '08:00', 140, 150, 6.67 FROM shelf WHERE name = 'Snacks'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:15', 120, 150, 20.00 FROM shelf WHERE name = 'Snacks'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:30', 130, 150, 13.33 FROM shelf WHERE name = 'Snacks'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:45', 125, 150, 16.67 FROM shelf WHERE name = 'Snacks'
);

INSERT INTO osa_measurement (shelf_id, measure_time, available_quantity, expected_quantity, shortage_ratio)
(
  SELECT id, CURRENT_DATE + TIME '08:00', 160, 180, 11.11 FROM shelf WHERE name = 'Dairy'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:15', 140, 180, 22.22 FROM shelf WHERE name = 'Dairy'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:30', 150, 180, 16.67 FROM shelf WHERE name = 'Dairy'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:45', 155, 180, 13.89 FROM shelf WHERE name = 'Dairy'
);

-- ================================
-- Alerts
-- ================================
INSERT INTO shelf_alert (shelf_id, alert_time, shortage_ratio, resolved)
(
  SELECT id, CURRENT_DATE + TIME '08:15', 20.00, FALSE FROM shelf WHERE name = 'Beverages'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:30', 25.00, FALSE FROM shelf WHERE name = 'Beverages'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:15', 20.00, FALSE FROM shelf WHERE name = 'Snacks'
  UNION ALL
  SELECT id, CURRENT_DATE + TIME '08:15', 22.22, FALSE FROM shelf WHERE name = 'Dairy'
);

-- ================================
-- Replenishment Events (recovery)
-- ================================
INSERT INTO replenishment_event (shelf_id, event_time, alert_id)
(
  SELECT s.id, CURRENT_DATE + TIME '08:25', a.id
  FROM shelf s
  JOIN shelf_alert a ON a.shelf_id = s.id AND a.alert_time = CURRENT_DATE + TIME '08:15'
  WHERE s.name = 'Beverages'
  UNION ALL
  SELECT s.id, CURRENT_DATE + TIME '08:20', a.id
  FROM shelf s
  JOIN shelf_alert a ON a.shelf_id = s.id AND a.alert_time = CURRENT_DATE + TIME '08:15'
  WHERE s.name = 'Snacks'
  UNION ALL
  SELECT s.id, CURRENT_DATE + TIME '08:40', a.id
  FROM shelf s
  JOIN shelf_alert a ON a.shelf_id = s.id AND a.alert_time = CURRENT_DATE + TIME '08:15'
  WHERE s.name = 'Dairy'
);

-- ================================
-- Customer Visits
-- ================================
INSERT INTO customer_visit (customer_id, shelf_id, visit_time)
(
  SELECT c.id, s.id, CURRENT_DATE + TIME '08:05'
  FROM customer c, shelf s
  WHERE c.gender = 'Male' AND c.age_group = '10-19' AND s.name = 'Beverages'
  LIMIT 1
)
UNION ALL
(
  SELECT c.id, s.id, CURRENT_DATE + TIME '08:20'
  FROM customer c, shelf s
  WHERE c.gender = 'Female' AND c.age_group = '10-19' AND s.name = 'Beverages'
  LIMIT 1
)
UNION ALL
(
  SELECT c.id, s.id, CURRENT_DATE + TIME '08:25'
  FROM customer c, shelf s
  WHERE c.gender = 'Male' AND c.age_group = '20-29' AND s.name = 'Snacks'
  LIMIT 1
)
UNION ALL
(
  SELECT c.id, s.id, CURRENT_DATE + TIME '08:35'
  FROM customer c, shelf s
  WHERE c.gender = 'Female' AND c.age_group = '20-29' AND s.name = 'Dairy'
  LIMIT 1
)
UNION ALL
(
  SELECT c.id, s.id, CURRENT_DATE + TIME '08:40'
  FROM customer c, shelf s
  WHERE c.gender = 'Male' AND c.age_group = '30-39' AND s.name = 'Dairy'
  LIMIT 1
)
UNION ALL
(
  SELECT c.id, s.id, CURRENT_DATE + TIME '09:10'
  FROM customer c, shelf s
  WHERE c.gender = 'Female' AND c.age_group = '30-39' AND s.name = 'Beverages'
  LIMIT 1
);
