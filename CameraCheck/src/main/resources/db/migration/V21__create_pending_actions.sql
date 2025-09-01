CREATE TABLE pending_actions (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry TIMESTAMP NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- REGISTER, RESET_PASSWORD, FORGOT_PASSWORD
    payload JSONB,                    -- để lưu thêm thông tin tuỳ action
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pending_actions_token ON pending_actions(token);
CREATE INDEX idx_pending_actions_email ON pending_actions(email);
CREATE INDEX idx_pending_actions_action_type ON pending_actions(action_type);
CREATE INDEX idx_pending_actions_expiry ON pending_actions(expiry);