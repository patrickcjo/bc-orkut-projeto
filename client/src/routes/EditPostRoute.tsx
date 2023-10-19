import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-simple-toasts';
import { Helmet } from 'react-helmet';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { api } from '../api';
import { Textarea } from '../components/TextArea';
import { PostSchema } from '../postSchema.ts';

const texts = {
  title: 'Editar publicação',
  contentPlaceholder: 'Edite a sua publicação',
  submit: 'Enviar',
  submitSuccess: 'Sua publicação foi editada com sucesso!',
  submitFailure: 'Houve um erro ao editar a sua publicação.',
};

export function EditPostRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: '',
  });

  useEffect(() => {

    async function loadPost() {
      try {

        const response = await api.get(`/posts/${params.id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Erro ao carregar a postagem:', error);

        toast(texts.submitFailure);
      }
    }

    loadPost();
  }, [params.id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
     
      const validationResult = PostSchema.safeParse(formData);
  
      if (validationResult.success) {

        const response = await api.put(`/posts/${params.id}`, formData);
  
        if (response.data.id) {
  
          toast(texts.submitSuccess);
          navigate(`/view-post/${params.id}`);
        } else {

          toast(texts.submitFailure);
        }
      } else {

        validationResult.error?.issues.forEach((issue) => {
          toast(issue.message);
        });
      }
    } catch (error) {
      console.error('Erro ao editar a postagem:', error);

      toast(texts.submitFailure);
    }
  };

  const handleContentChange = (e) => {

    setFormData({
      ...formData,
      content: e.target.value,
    });
  };

  return ( 
    <Card>
      <Helmet>
        <title>Editar publicação #{params.id}</title>
      </Helmet>

      <form onSubmit={handleFormSubmit} className='flex flex-col gap-3'>
        <div>
          <Textarea
            className='rounded-lg p-2 border mt-6 focus:border-amber-300 outline-none w-full resize-none'
            placeholder={texts.contentPlaceholder}
            name="content"
            value={formData.content}
            onChange={handleContentChange}
            rows={3}
            defaultValue={undefined}
          />

        </div>
        <div className='flex justify-end items-center px-2'>
          <Button type='submit' className='bg-yellow-500 hover:bg-yellow-600'>
            {texts.submit}
          </Button>

        </div>
      </form>
    </Card>
  );
}
