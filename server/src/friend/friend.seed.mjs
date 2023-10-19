import * as userService from '../user/user.service.mjs';

const minFriendsCount = 12;
const friendsRange = 15;

async function seedFriend() {
  console.log('Iniciando seeding...');
  const users = await userService.listUsers();
  const usersId = users.map((user) => user.id);
  let friendships = []; // { userA: 1, userB: 2 }

  for (const id of usersId) {
    const friendsCount =
      minFriendsCount + Math.round(Math.random() * friendsRange);
    for (let index = 0; index < friendsCount; index++) {
      let randomId;
      do {
        randomId = usersId[Math.floor(Math.random() * usersId.length)];
      } while (
        randomId === id ||
        friendships.some(
          (friend) =>
            (friend.userA === id && friend.userB === randomId) ||
            (friend.userA === randomId && friend.userB === id)
        )
      );

      friendships.push({
        userA: id,
        userB: randomId,
      });
    }
  }

  for (const { userA, userB } of friendships) {
    await userService.addFriend(userA, userB);
    console.log(`Usuário #${userA} adicionou #${userB}`);
  }

  console.log('Seeding realizado com sucesso!');
}

seedFriend();
