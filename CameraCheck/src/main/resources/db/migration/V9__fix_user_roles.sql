-- Fix user roles
UPDATE users
SET role = 'USER'
WHERE role = 'ROLE_USER';