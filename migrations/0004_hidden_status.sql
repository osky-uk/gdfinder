-- Add 'hidden' to the status CHECK constraint.
-- SQLite does not support ALTER COLUMN, so we recreate the table.

CREATE TABLE IF NOT EXISTS designers_new (
    id                  TEXT    PRIMARY KEY,

    name                TEXT    NOT NULL,
    bio                 TEXT    CHECK (LENGTH(bio) <= 300),
    listing_type        TEXT    NOT NULL DEFAULT 'freelancer'
                                CHECK (listing_type IN ('freelancer', 'sole_trader', 'company', 'agency', 'other')),
    profile_image_url   TEXT,
    status              TEXT    NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending', 'active', 'suspended', 'hidden')),
    availability        TEXT    NOT NULL DEFAULT 'available'
                                CHECK (availability IN ('available', 'busy', 'unavailable')),
    timezone            TEXT,
    price_range         TEXT    CHECK (price_range IN ('budget', 'mid', 'premium', 'enterprise')),
    pricing_structure   TEXT    CHECK (LENGTH(pricing_structure) <= 150),
    preferred_client    TEXT    CHECK (LENGTH(preferred_client) <= 150),

    city                TEXT    NOT NULL,
    country_code        TEXT    NOT NULL CHECK (LENGTH(country_code) = 2),

    email               TEXT,
    email_shown         INTEGER NOT NULL DEFAULT 0 CHECK (email_shown IN (0, 1)),
    phone_number        TEXT,
    phone_number_visible INTEGER NOT NULL DEFAULT 0 CHECK (phone_number_visible IN (0, 1)),

    instagram           TEXT,
    facebook            TEXT,
    bluesky             TEXT,
    youtube             TEXT,
    twitter             TEXT,
    dribbble            TEXT,
    behance             TEXT,
    website             TEXT,
    links               TEXT,

    languages           TEXT    NOT NULL,
    categories          TEXT    NOT NULL,
    turnaround_days     INTEGER NOT NULL,
    ai_level            INTEGER NOT NULL CHECK (ai_level IN (0, 1, 2)),
    upvotes             INTEGER NOT NULL DEFAULT 0,
    downvotes           INTEGER NOT NULL DEFAULT 0,
    avatar_color        TEXT    NOT NULL,

    gravatar_hash       TEXT,
    last_challenge      TEXT,
    last_challenge_time INTEGER,

    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO designers_new (
    id, name, bio, listing_type, profile_image_url, status, availability, timezone,
    price_range, pricing_structure, preferred_client, city, country_code,
    email, email_shown, phone_number, phone_number_visible,
    instagram, facebook, bluesky, youtube, twitter, dribbble, behance, website, links,
    languages, categories, turnaround_days, ai_level, upvotes, downvotes, avatar_color,
    gravatar_hash, last_challenge, last_challenge_time, created_at, updated_at
)
SELECT
    id, name, bio, listing_type, profile_image_url, status, availability, timezone,
    price_range, pricing_structure, preferred_client, city, country_code,
    email, email_shown, phone_number, phone_number_visible,
    instagram, facebook, bluesky, youtube, twitter, dribbble, behance, website, links,
    languages, categories, turnaround_days, ai_level, upvotes, downvotes, avatar_color,
    gravatar_hash, last_challenge, last_challenge_time, created_at, updated_at
FROM designers;

DROP TABLE designers;

ALTER TABLE designers_new RENAME TO designers;
