CREATE TABLE IF NOT EXISTS users(
  id             SERIAL       PRIMARY KEY    NOT NULL    UNIQUE,
  name           VARCHAR(255)                NOT NULL,
  password       VARCHAR(255)                NOT NULL,
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

INSERT INTO users (name, password, email, created) VALUES
  ('jykajee', 'root', 'jykajee@jee.fi', '2018-06-24T05:39:00.000Z'),
  ('Mister Thane', 'root', 'mrthane@thanelandia.fi', '2016-06-20T02:22:00.000Z');

INSERT INTO items (type, title, description, content, created, modified, author_id) VALUES
  ('article', 'Jykän paras resepti', 'Tällä pääsee hekumaan', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis orci mauris. In ultricies libero in magna tincidunt pulvinar. Cras rutrum nisl a metus aliquet convallis. Vivamus ultrices luctus dolor at luctus.', '2014-06-20T02:22:00.000Z', NULL, 1),
  ('video', 'Hyvä biisi', 'Kato loppuun asti', 'https://www.youtube.com/watch?v=N9cml2D8VU0', '2013-06-20T02:22:00.000Z', NULL, 2);

INSERT INTO tags (name) VALUES
  ('laatukamaa'),
  ('resepti'),
  ('musiikki');

INSERT INTO item_tag VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3);