interface ImgProps {
  src: string;
  alt: string;
  className: string;
}

export const ImagemComponent = ({ src, alt, className }: ImgProps) => {
  return (
    <>
      <img src={src} alt={alt} className={className} />
    </>
  );
};
