UPDATE cameras
SET health_check_type = 'HTTP'
WHERE stream_url LIKE 'http://%/axis-cgi/mjpg/video.cgi';
