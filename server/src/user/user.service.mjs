import { createUserSchema } from './schemas/create-user.schema.mjs';
import { db } from '../db.mjs';

export async function createUser(data) {
  await createUserSchema.parseAsync(data);
  const user = db
    .prepare(
      /* sql */
      `insert into users(
         first_name,
         last_name,
         avatar,
         passwd
       ) values(?, ?, ?, ?) returning *`
    )
    .get(data.first_name, data.last_name, data.avatar, data.password);
  return user;
}

export async function readUser(id) {
  const user = db.prepare(/* sql */ `select * from users where id=?`).get(id);
  return user;
}

export async function listUsers() {
  const users = db.prepare(/* sql */ `select * from users`).all();
  return users;
}

export async function addFriend(userA, userB) {
  const friend = db
    .prepare(
      /* sql */
      `insert into friends (user_a, user_b) values (?, ?) returning *`
    )
    .get(userA, userB);
  return friend;
}

export async function listLatestFriends(userId) {
  const friends = db
    .prepare(
      /* sql */ `
      select * from users where id in (
        select user_b
        from friends
        where user_a = ?
        union
        select user_a
        from friends
        where user_b = ?
      )
      order by created_at desc
      limit 9;`
    )
    .all(userId, userId);
  return friends;
}

export async function getRandomUser() {
  const randomUser = db
    .prepare(
      /* sql */
      `select * from users order by random() limit 1`
    ).get();
  return randomUser;
}