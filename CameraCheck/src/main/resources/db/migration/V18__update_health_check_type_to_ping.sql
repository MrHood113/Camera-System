UPDATE cameras
SET health_check_type = 'PING'
WHERE health_check_type = 'HTTP';