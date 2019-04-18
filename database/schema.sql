
USE lead_the_deal;

  /*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *  OR
 *    mysql -u <USER> -p < schema.sql
 *  For example, on a pairing station, it'll be
 *    mysql -u student -p < schema.sql
 *  and then you'll have to enter the password, student
 *  On your personal computer, if you haven't set up
 *  a password, it'll be
 *    mysql -u root < schema.sql
 *
 *  If you need assistance with this step,
 *  please talk to a proctor.
*/

  INSERT into users
    (username, name)
  VALUES
    ('chango33', 'Juan Trejo');

  INSERT into users
    (username, name)
  VALUES
    ('ijole22', 'Panfilo Tijeras');

  INSERT into users
    (username, name)
  VALUES
    ('varcharbaby', 'Eduardo Barrera');

  INSERT into users
    (username, name)
  VALUES
    ('chikfilley', 'Wintano Ballena');



  INSERT into contacts
    (name, position, company, industry, phone, email, address, userId)
  VALUES
    ('Pedro Navajas', 'CEO', 'Taco Enterprises', 'food', '504-678-2345', 'what@gmail.com', '2456 N Miro, New Orleans LA 70117', 1);
  INSERT into contacts
    (name, position, company, industry, phone, email, address, userId)
  VALUES
    ('Harvey Sanders', 'CTO', 'Operation Spark', 'software', '504-234-5563', 'harvey@gmail.com', '2094 Columbus St, New Orleans La 28732', 1);
  INSERT into contacts
    (name, position, company, industry, phone, email, address, userId)
  VALUES
    ('Bruce Lee', 'Ninja Master', 'Hollywood', 'movies', '845-675-6765', 'bruce@lee.com', '234 Sunset Blvd, Los Angeles CA 2345', 2);
  INSERT into contacts
    (name, position, company, industry, phone, email, address, userId)
  VALUES
    ('Luke Skywalker', 'Jedi', 'The Republic', 'freedom', '210-234-5678', 'lukie45@aol.com', '234 Tatooni, Galaxy Far Away', 2);
  INSERT into contacts
    (name, position, company, industry, phone, email, address, userId)
  VALUES
    ('Billy Elliot', 'Ballet Dancer', 'London Ballet', 'art', '232-232-3322', 'billy@yahoo.com', '221B Baker Street, London', 2);



INSERT INTO purchases
  (userId, contact_id)
values(1, 3);

INSERT INTO purchases
  (userId, contact_id)
values(1, 2);

INSERT INTO purchases
  (userId, contact_id)
values(2, 1);

INSERT INTO purchases
  (userId, contact_id)
values(2, 4);
