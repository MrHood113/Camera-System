UPDATE cameras SET
  status = 'ACTIVE',
  last_heartbeat = CURRENT_TIMESTAMP,
  latency = 25
WHERE id = 1;

UPDATE cameras SET
  status = 'INACTIVE',
  last_heartbeat = CURRENT_TIMESTAMP,
  latency = 0
WHERE id = 2;

UPDATE cameras SET
  status = 'ACTIVE',
  last_heartbeat = CURRENT_TIMESTAMP,
  latency = 35
WHERE id = 3;

UPDATE cameras SET
  status = 'ACTIVE',
  last_heartbeat = CURRENT_TIMESTAMP,
  latency = 22
WHERE id = 4;

UPDATE cameras SET
  status = 'OFFLINE',
  last_heartbeat = CURRENT_TIMESTAMP,
  latency = 0
WHERE id = 5;

UPDATE cameras SET
  status = 'ACTIVE',
  last_heartbeat = CURRENT_TIMESTAMP,
  latency = 18
WHERE id = 6;

UPDATE cameras SET
  status = 'ACTIVE',
  last_heartbeat = CURRENT_TIMESTAMP,
  latency = 12
WHERE id = 7;

UPDATE cameras SET
  status = 'INACTIVE',
  last_heartbeat = CURRENT_TIMESTAMP,
  latency = 0
WHERE id = 8;

UPDATE cameras SET
  status = 'ACTIVE',
  last_heartbeat = CURRENT_TIMESTAMP,
  latency = 27
WHERE id = 9;

UPDATE cameras SET
  status = 'MAINTENANCE',
  last_heartbeat = CURRENT_TIMESTAMP,
  latency = 10
WHERE id = 10;
