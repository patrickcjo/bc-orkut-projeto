import { ImagemComponent } from '../components/ImageComponent';

export const NotFoundPage = () => {
  return (
    <div className={'flex justify-center items-center '}>
      <ImagemComponent
        src={'/src/assets/img-erro-404/ERRO404.gif'}
        alt={'erro 404'}
        className={'w-9/12 h-9/12 rounded-xl my-12'}
      />
    </div>
  );
};
