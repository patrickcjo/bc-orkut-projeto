import * as postService from './post.service.mjs';
import * as userService from '../user/user.service.mjs';
import { faker } from '@faker-js/faker';

const defaultLimit = 100;
const minCommentCount = 3;
const commentRange = 12;

async function postSeed() {
  const users = await userService.listUsers();
  const usersIds = users.map((user) => user.id);

  const limit = Number(process.argv[2]) || defaultLimit;
  console.log('Iniciando seeding...');
  console.log(`Vão ser criados ${limit} posts`);
  for (let index = 0; index < limit; index++) {
    const userId = getRandomUserId(usersIds);
    const postData = generatePost(userId);
    const post = await postService.createPost(postData);
    console.log(`Criado post de id #${post.id}`);
    await commentSeed(post, usersIds);
  }
  console.log('Seeding realizado com sucesso!');
}

async function commentSeed(post, usersIds) {
  const commentCount =
    minCommentCount + Math.round(Math.random() * commentRange);
  for (let index = 0; index < commentCount; index++) {
    const comment = generateComment();

    const addedComment = await postService.createPostComment(
      comment,  
      post.id   
    );

    console.log(`Criado comentário de id #${addedComment.id}`);
  }
}


function generatePost(user_id) {
  return {
    user_id,
    content: faker.lorem.words(5 + Math.round(Math.random() * 5)),
  };
}

function generateComment(user_id) {
  return {
    user_id,
    message: faker.lorem.words(2 + Math.round(Math.random() * 3)),
  };
}

function getRandomUserId(usersId) {
  return usersId[Math.floor(Math.random() * usersId.length)];
}

postSeed();
