CREATE TABLE IF NOT EXISTS users(
  id             INT          PRIMARY KEY    NOT NULL,
  name           CHAR(255)                   NOT NULL,
  email          CHAR(255)                   NOT NULL,
  created        TIMESTAMP                   NOT NULL
);

CREATE TABLE IF NOT EXISTS items(
  id             INT          PRIMARY KEY    NOT NULL,
  type           CHAR(255)                   NOT NULL,
  title          CHAR(255)                   NOT NULL,
  description    TEXT,
  content        TEXT                        NOT NULL,
  created        TIMESTAMP                   NOT NULL,
  author_id      INT                         NOT NULL
);

CREATE TABLE IF NOT EXISTS tags(
  id             INT          PRIMARY KEY    NOT NULL,
  name           CHAR(255)                   NOT NULL
);

CREATE TABLE IF NOT EXISTS item_tag(
  item_id        INT                         NOT NULL,
  tag_id         INT                         NOT NULL
);