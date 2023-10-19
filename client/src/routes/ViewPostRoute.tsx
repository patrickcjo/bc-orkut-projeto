import { useEffect, useState } from 'react';
import toast from 'react-simple-toasts';
import { api } from '../api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { IPost } from '../interfaces/IPost';
import { FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Helmet } from 'react-helmet';
import { Textarea } from '../components/TextArea';
import { createPostCommentSchema } from '../commentSchema.ts';
import { DEFAULT_USER_ID } from '../defaltUserId.ts';

const texts = {
  commentsTitle: 'Comentário',
  commentsSendButton: 'Comentar',
  starRatingButton: 'Classificar',
};


const initialPostState: IPost = {
  id: 0,
  content: '',
  created_at: '',
  count: 0,
  initialPosts: '',
  user_id: 0,
  user_avatar: '',
  user_last_name: ''
};


const initialComments = [];
const initialComment = '';

export function ViewPostRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<IPost>(initialPostState);
  const [comments, setComments] = useState(initialComments);
  const [comment, setComment] = useState(initialComment);
  const [errors, setErrors] = useState({
    message: '',
  });

  
  async function fetchData() {
    try {
      const [postResponse, commentsResponse] = await Promise.all([
        api.get(`/posts/${params.id}`),
        api.get(`/posts/${params.id}/comments`),
      ]);
      setPost(postResponse.data);
      setComments(commentsResponse.data);
    } catch (error) {
      navigate('/not-found-page'); 
    }
  }

  
  async function loadComments() {
    const response = await api.get(`/posts/${params.id}/comments`);
    const comments = response.data;
    setComments(comments);
  }

 
  async function createComment() {
    try {
      const commentData = {
        message: comment,
        user_id: DEFAULT_USER_ID,
      };

      const validationResult = createPostCommentSchema.safeParse(commentData);

      if (validationResult.success) {
        await api.post(`/posts/${params.id}/comments`, validationResult.data);
        await loadComments();
        setComment('');
      } else {
        const errorMessage = validationResult.error?.errors[0]?.message;
        if (errorMessage) {
          toast(errorMessage);
        }
      }
    } catch (error) {
      toast('Erro ao criar o comentário:', error.message);
    }
  }

  async function deletePost() {
    const response = await api.delete(`/posts/${params.id}`);
    if (response.data.id) {
      toast(`A publicação #${post.id} foi deletada com sucesso!`);
      navigate('/');
    } else {
      toast('Houve um erro ao deletar a publicação');
    }
  }

  async function onCommentSubmit(event) {
    event.preventDefault();
    await createComment();
    await loadComments();
  }

  useEffect(() => {
    fetchData(); 
  }, [params.id]);

  const postTitleId = `Publicação #${post.id}`;

  return (
    <>
      <Card>
        <Helmet>
          <title>{postTitleId}</title>
        </Helmet>
        <Breadcrumbs
          links={[
            { href: '/', label: 'Home' },
            { label: `Ver publicação #${params.id}` },
          ]}
        />

        <div className='flex justify-end gap-3'>
          <Button typeClass='edit' to={`/edit-post/${params.id}`}>
            <span className='uppercase mr-3 font-bold '>Editar</span>
            <AiOutlineEdit />
          </Button>

          <Button typeClass='danger' onClick={deletePost}>
            <span className='uppercase mr-3 font-bold'>Delete</span>
            <FaTrashAlt />
          </Button>
        </div>

        <div className='text-gray-500 mb-2 '>#{post.id}</div>
        <div className='text-gray-500 '>
          {new Date(post.created_at).toLocaleDateString()}
        </div>

        <p className={'break-words'}>{post.content}</p>
      </Card>

      <Card>
        <Title> {texts.commentsTitle} </Title>

        <form onSubmit={onCommentSubmit} className='mt-3'>
          <Textarea
            className={`rounded-lg p-2  border focus:border-sky-500 outline-none resize-none w-full`}
            value={comment}
            placeholder='Digite o seu comentário'
            rows={3}
            name={undefined}
            onChange={(event) => setComment(event.target.value)}
            defaultValue={undefined}
          />
          {errors.message && (
            <div className='text-red-500'>{errors.message}</div>
          )}
          <div className='flex justify-end mt-2'>
            <Button
              className='bg-sky-500 mb-2 uppercase mr-3 font-bold hover:bg-sky-700 '
              typeClass='edit'
              type='submit'>

              {texts.commentsSendButton}
            </Button>
          </div>
        </form>

        <div>
          {/* Mapeia e exibe os comentários */}
          {comments.map((comment) => (
            <div key={comment.id} className='border-b py-2'>
              <div className='flex items-center gap-2'>
                <Link to={`/perfil/${comment.user_id}`}>
                  <img
                    src={comment.user_avatar}
                    alt={`Foto de ${comment.user_first_name} ${comment.user_last_name}`}
                    className='w-[48px] h-[48px] rounded-full'
                  />
                </Link>
                <div className='flex flex-col'>
                  <Link
                    to={`/perfil/${comment.user_id}`}
                    className='text-sky-600 hover:text-sky-800 hover:underline font-bold'
                  >
                    {comment.user_first_name} {comment.user_last_name}
                  </Link>
                  <span className='text-sm text-gray-500'>
                    #{comment.user_id}
                  </span>
                  <span className='text-sm text-gray-500'>
                    {new Date(comment.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    h
                  </span>
                </div>
              </div>
              <p>{comment.message}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
