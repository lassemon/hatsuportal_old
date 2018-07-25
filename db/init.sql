CREATE TABLE IF NOT EXISTS users(
  id             SERIAL       PRIMARY KEY    NOT NULL    UNIQUE,
  name           VARCHAR(255)                NOT NULL,
  email          VARCHAR(255)                NOT NULL,
  created        TIMESTAMP                   NOT NULL
);

CREATE TABLE IF NOT EXISTS items(
  id             SERIAL       PRIMARY KEY    NOT NULL    UNIQUE,
  type           VARCHAR(255)                NOT NULL,
  title          VARCHAR(255)                NOT NULL,
  description    TEXT,
  content        TEXT                        NOT NULL,
  created        TIMESTAMP                   NOT NULL,
  modified       TIMESTAMP,
  author_id      INT                         NOT NULL
);

CREATE TABLE IF NOT EXISTS tags(
  id             SERIAL       PRIMARY KEY    NOT NULL    UNIQUE,
  name           VARCHAR(255)                NOT NULL
);

CREATE TABLE IF NOT EXISTS item_tag(
  item_id        INT                         NOT NULL,
  tag_id         INT                         NOT NULL    REFERENCES    tags(id)
);