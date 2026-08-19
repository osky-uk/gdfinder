ALTER TABLE designers ADD COLUMN gravatar_hash TEXT;
ALTER TABLE designers ADD COLUMN last_challenge TEXT;
ALTER TABLE designers ADD COLUMN last_challenge_time INTEGER;

CREATE TABLE IF NOT EXISTS sessions (
    challenge_hash  TEXT    PRIMARY KEY,  -- SHA256(session_uuid), used for new registrations
    email           TEXT    NOT NULL,
    expires_at      INTEGER NOT NULL      -- Unix timestamp, 30-min window
);
