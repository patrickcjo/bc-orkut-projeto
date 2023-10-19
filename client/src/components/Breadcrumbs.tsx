import { Link } from 'react-router-dom';

type BreadcrumbsProps = {
  links: {
    href?: string;
    label: React.ReactNode;
  }[];
};

export function Breadcrumbs({ links }: BreadcrumbsProps) {
  return (
    <div className='flex gap-1 items-center p-1'>
      {links.map((link, index) => (
        <div key={index} className='flex items-center gap-1'>
          {link.href ? (
            <Link
              to={link.href}
              className='text-blue-400 hover:text-blue-600 hover:underline'>
              {link.label}
            </Link>
          ) : (
            <span className='text-blue-400'> {link.label}</span>
          )}

          {renderSeparator(index, links.length)}
        </div>
      ))}
    </div>
  );
}

function renderSeparator(index: number, length: number) {
  if (index < length - 1) {
    return <span className='font-bold text-md'>{'>'}</span>;
  }
  return null;
}
