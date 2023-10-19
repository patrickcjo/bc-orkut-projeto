import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';
import { api } from '../api';

const initialUser = {
  id: 0,
  first_name: '',
  last_name: '',
  created_at: '',
  passwd: '',
  avatar: '',
};

export function ProfileRoute() {
  const params = useParams();
  const userId = params.id;
  const [user, setUser] = useState({ ...initialUser, id: userId });

  async function loadUser() {
    const response = await api.get(`/users/${userId}`);
    const user = response.data;
    setUser(user);
  }

  useEffect(() => {
    loadUser();
  }, [userId]);

  return (
    <div className='flex flex-col lg:flex-row gap-2 m-2 sm:mx-auto max-w-screen-sm lg:max-w-screen-lg lg:mx-auto'>
      <div className='lg:max-w-[192px]'>
        <AvatarCard {...user} />
      </div>
      <div className='flex-1 flex flex-col gap-2'>
        <ProfileCard {...user} />
      </div>
      <div className='lg:max-w-[256px]'>
        <FriendsCard {...user} />
      </div>
    </div>
  );
}

function AvatarCard({ id, avatar, first_name, last_name }) {
  return (
    <Card>
      <img src={avatar} alt={`Foto de ${first_name}`} />
      <Link
        to={`/perfil/${id}`}
        className='text-sky-600 hover:text-sky-800 hover:underline font-bold'
      >
        {first_name} {last_name}
      </Link>
    </Card>
  );
}

function ProfileCard({ first_name, last_name }) {
  return (
    <Card >
      <h2 className=' ml-6 text-2xl w-full font-bold'>
        {first_name} {last_name}
      </h2>
    </Card>
  );
}

const initialFriends = [];

function FriendsCard({ id }) {
  const [friends, setFriends] = useState(initialFriends);

  async function loadFriends() {
    const response = await api.get(`/users/${id}/friends`);
    const friends = response.data;
    setFriends(friends);
  }

  useEffect(() => {
    loadFriends();
  }, [id]);

  return (
    <Card>
      <h2 className='lowercase font-bold'>Amigos</h2>
      <div className='flex flex-row flex-wrap'>
        {friends.map((friend) => (
          <div className='w-1/3 p-1 box-border text-center'>
            <Link to={`/perfil/${friend.id}`}>
              <img
                src={friend.avatar}
                alt={`Foto de ${friend.first_name}`}
                className='w-full'
              />
            </Link>
            <Link
              to={`/perfil/${friend.id}`}
              className='text-sky-600 hover:text-sky-700 font-bold text-sm hover:underline leading-tight'
            >
              {friend.first_name}
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}
