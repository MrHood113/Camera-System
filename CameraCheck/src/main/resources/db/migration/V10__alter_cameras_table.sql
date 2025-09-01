--Delete old data
DELETE FROM cameras;

-- Delete old column
ALTER TABLE cameras
  DROP COLUMN IF EXISTS ip_address,
  DROP COLUMN IF EXISTS location,
  DROP COLUMN IF EXISTS active,
  DROP COLUMN IF EXISTS status,
  DROP COLUMN IF EXISTS last_heartbeat,
  DROP COLUMN IF EXISTS latency;

-- Add new column
ALTER TABLE cameras
  ADD COLUMN latitude DOUBLE PRECISION,
  ADD COLUMN longitude DOUBLE PRECISION,
  ADD COLUMN country_code VARCHAR(10),
  ADD COLUMN country VARCHAR(100),
  ADD COLUMN city VARCHAR(100),
  ADD COLUMN region VARCHAR(100),
  ADD COLUMN zip_code VARCHAR(20),
  ADD COLUMN timezone VARCHAR(50),
  ADD COLUMN stream_url TEXT,
  ADD COLUMN is_public BOOLEAN DEFAULT true,
  ADD COLUMN description TEXT;
