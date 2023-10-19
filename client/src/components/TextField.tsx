type TextFieldProps = {
  textoPadrao: string;
  valor: string;
};

export const TextField = ({ textoPadrao, valor }: TextFieldProps) => {
  return (
    <input
      placeholder={textoPadrao}
      value={valor}
      type='text'
      className='border rounded-lg outline-none focus:border-sky-500 py-1 px-2'
    />
  );
};
