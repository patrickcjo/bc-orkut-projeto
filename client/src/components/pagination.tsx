import { LinkButton } from './LinkButton';

export function Pagination({ pageCount, currentPage, basePath, onPageChange }) {
  const pages = new Array(pageCount).fill(null).map((_, index) => index + 1);

  return (
    <div className='flex flex-row gap-2 flex-wrap p-4  '>
      {pages.map(( page: number ) => ( /* Defina o tipo do parâmetro 'page' como 'number'*/
          <LinkButton
            to={`${basePath}/${page}`}
            key={page}
            className={page === currentPage ? 'bg-sky-900  ' : ''}
            onClick={() => onPageChange(page)}>
            {page}
          </LinkButton>
        )
      )}
    </div>
  );
}
