CREATE TYPE user_role AS ENUM('member', 'admin');
CREATE TYPE register_mode AS ENUM('email', 'oauth');
CREATE TYPE register_step AS ENUM('email_confirm', 'registered');

CREATE TABLE users (
  id                bigserial                 PRIMARY KEY,
  username          text                      UNIQUE DEFAULT NULL,
  email             text                      UNIQUE NOT NULL,
  pass_digest       text                      NULL,
  location          text                      DEFAULT '',
  image             text                      DEFAULT '',
  bio               text                      DEFAULT '',
  role              user_role                 NOT NULL DEFAULT 'member',
  created_at        timestamp                 NOT NULL DEFAULT NOW(),
  register_mode     register_mode             NOT NULL,
  register_step     register_step             NOT NULL,
  validation_token  text                      NULL,
  available         boolean                   NOT NULL DEFAULT false,
  show_email        boolean                   NOT NULL DEFAULT false,
  deleted           boolean                   NOT NULL DEFAULT false
);

CREATE TABLE users_oauth_providers (
  id            bigserial             PRIMARY KEY,
  user_id       bigint                NOT NULL REFERENCES users(id),
  twitter_id    numeric               NULL,
  facebook_id   numeric               NULL,
  google_id     numeric               NULL
);

CREATE TABLE user_social_networks (
  id            bigserial             PRIMARY KEY,
  user_id       bigint                UNIQUE NOT NULL REFERENCES users(id),
  website       text                  DEFAULT '',
  facebook      text                  DEFAULT '',
  twitter       text                  DEFAULT ''
);

CREATE TABLE user_password_reset (
  id            bigserial             PRIMARY KEY,
  user_id       bigint                NOT NULL REFERENCES users(id),
  used          boolean               NOT NULL DEFAULT false,
  token         text                  NOT NULL
);

CREATE TABLE test_data (
  id            bigserial             PRIMARY KEY,
  data          text                  DEFAULT ''
);
