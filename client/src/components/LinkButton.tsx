import { Link } from 'react-router-dom';

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
  className?: string;
  onClick?: () => void;
};

export function LinkButton({
  children,
  to,
  className,
  onClick,
}: LinkButtonProps) {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`bg-sky-400 hover:bg-sky-600 text-slate-50 font-bold uppercase py-1 px-3 rounded-md ${className}`}>
      {children}
    </Link>
  );
}
