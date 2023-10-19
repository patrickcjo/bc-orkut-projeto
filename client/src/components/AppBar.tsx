import { Link } from 'react-router-dom';
//import { MdStickyNote2 as LogoIcon } from 'react-icons/md';

export function AppBar() {
  return (
    <header className='bg-[#67757c] p-3 shadow-md flex flex-row justify-between'>
      <div className='flex flex-row items-center gap-8'>

        <Link to={'/'}>
          <img src='\src\assets\img-fiveIcons\orkut.png' alt='orkut' className='h-6 w-20 rounded-md ml-3' />
        </Link>
      </div>

      <div className='flex flex-row items-center gap-8'>
        <Link
          to='/create-post'
          className='bg-[#f195ce] hover:[#ef0093a5] text-white font-bold uppercase mr-3 py-1
          px-3 rounded-md hover:text-black'>
          Nova publicação
        </Link>
      </div>
    </header>
  );
}