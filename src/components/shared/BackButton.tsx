
import { Link } from 'react-router-dom';

interface BackButtonProps {
  to: string;
  className?: string;
}

const BackButton = ({ to, className = '' }: BackButtonProps) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${className}`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-5 h-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
    </Link>
  );
};

export default BackButton;