CREATE TABLE IF NOT EXISTS users(
  id             INT          PRIMARY KEY    NOT NULL,
  name           VARCHAR(255)                   NOT NULL,
  email          VARCHAR(255)                   NOT NULL,
  created        TIMESTAMP                   NOT NULL
);

CREATE TABLE IF NOT EXISTS items(
  id             INT          PRIMARY KEY    NOT NULL,
  type           VARCHAR(255)                   NOT NULL,
  title          VARCHAR(255)                   NOT NULL,
  description    TEXT,
  content        TEXT                        NOT NULL,
  created        TIMESTAMP                   NOT NULL,
  author_id      INT                         NOT NULL
);

CREATE TABLE IF NOT EXISTS tags(
  id             INT          PRIMARY KEY    NOT NULL,
  name           VARCHAR(255)                   NOT NULL
);

CREATE TABLE IF NOT EXISTS item_tag(
  item_id        INT                         NOT NULL,
  tag_id         INT                         NOT NULL
);

INSERT INTO users VALUES
  (69,  'jykajee', 'jykajee@jee.fi', '2018-06-24T05:39:00.000Z'),
  (420, 'Mister Thane', 'mrthane@thanelandia.fi', '2016-06-20T02:22:00.000Z');

INSERT INTO items VALUES
  (123, 'article', 'Jykän paras resepti', 'Tällä pääsee hekumaan', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis orci mauris. In ultricies libero in magna tincidunt pulvinar. Cras rutrum nisl a metus aliquet convallis. Vivamus ultrices luctus dolor at luctus.', '2014-06-20T02:22:00.000Z', 69),
  (420, 'video', 'Hyvä biisi', 'Kato loppuun asti', 'https://www.youtube.com/watch?v=N9cml2D8VU0', '2013-06-20T02:22:00.000Z', 666);