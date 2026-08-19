-- UUIDs are generated in application code via crypto.randomUUID() and stored as TEXT.
-- SQLite / D1 has no native UUID type; TEXT(36) is the standard approach.

CREATE TABLE IF NOT EXISTS designers (
    id                  TEXT    PRIMARY KEY,  -- UUID v4, e.g. "f47ac10b-58cc-4372-a567-0e02b2c3d479"

    -- Identity
    name                TEXT    NOT NULL,
    bio                 TEXT    CHECK (LENGTH(bio) <= 300),
    listing_type        TEXT    NOT NULL DEFAULT 'freelancer'
                                CHECK (listing_type IN ('freelancer', 'sole_trader', 'company', 'agency', 'other')),
    profile_image_url   TEXT,
    status              TEXT    NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending', 'active', 'suspended')),  -- moderation gate
    availability        TEXT    NOT NULL DEFAULT 'available'
                                CHECK (availability IN ('available', 'busy', 'unavailable')),
    timezone            TEXT,   -- IANA tz name, e.g. "Europe/London"
    price_range         TEXT    CHECK (price_range IN ('budget', 'mid', 'premium', 'enterprise')),
    pricing_structure   TEXT    CHECK (LENGTH(pricing_structure) <= 150),  -- e.g. "£50/hr or fixed-price projects from £200"
    preferred_client    TEXT    CHECK (LENGTH(preferred_client) <= 150),   -- e.g. "Small businesses and startups"

    -- Location (replaces single location column)
    city                TEXT    NOT NULL,
    country_code        TEXT    NOT NULL CHECK (LENGTH(country_code) = 2),  -- ISO 3166-1 alpha-2, e.g. "GB"

    -- Contact
    email               TEXT,
    email_shown         INTEGER NOT NULL DEFAULT 0 CHECK (email_shown IN (0, 1)),  -- boolean
    phone_number        TEXT,
    phone_number_visible INTEGER NOT NULL DEFAULT 0 CHECK (phone_number_visible IN (0, 1)),  -- boolean

    -- Social / web links
    instagram           TEXT,
    facebook            TEXT,
    bluesky             TEXT,
    youtube             TEXT,
    twitter             TEXT,
    dribbble            TEXT,
    behance             TEXT,
    website             TEXT,
    links               TEXT,   -- JSON array of {label, url} objects for any extra links

    -- Work details
    languages           TEXT    NOT NULL,  -- JSON array, e.g. ["English","French"]
    categories          TEXT    NOT NULL,  -- JSON array, e.g. ["Logos","Flyers"]
    turnaround_days     INTEGER NOT NULL,
    ai_level            INTEGER NOT NULL CHECK (ai_level IN (0, 1, 2)),
    upvotes             INTEGER NOT NULL DEFAULT 0,
    downvotes           INTEGER NOT NULL DEFAULT 0,
    avatar_color        TEXT    NOT NULL,

    -- Timestamps
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- One vote per (designer, voter) pair, enforced by the UNIQUE constraint.
-- voter_email_hash is SHA-256 of the voter's email - never store plaintext.
-- upvotes/downvotes on designers are denormalised counts; keep them in sync
-- in the application when inserting/updating/deleting rows here.
-- Note: REFERENCES enforcement requires `PRAGMA foreign_keys = ON` per connection.
CREATE TABLE IF NOT EXISTS votes (
    id                  TEXT    PRIMARY KEY,  -- UUID v4
    designer_id         TEXT    NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
    voter_email_hash    TEXT    NOT NULL,     -- SHA-256 of voter email
    direction           INTEGER NOT NULL CHECK (direction IN (1, -1)),  -- 1 = upvote, -1 = downvote
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (designer_id, voter_email_hash)    -- one vote per email per designer
);

CREATE TABLE IF NOT EXISTS otps (
    email       TEXT    PRIMARY KEY,
    code_hash   TEXT    NOT NULL,  -- SHA-256(code:email), never store plaintext OTPs
    expires_at  INTEGER NOT NULL   -- Unix timestamp
);
