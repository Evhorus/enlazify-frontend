import clsx from 'clsx';
import { Link, useLocation } from 'react-router';
import { NavigationTab } from '../types/index';

type NavigationTabsMobileProps = {
  tabs: NavigationTab[];
};

export const NavigationTabsMobile = ({ tabs }: NavigationTabsMobileProps) => {
  const { pathname } = useLocation();

  return (
    <nav
      className={clsx(
        'border-t border-gray-200 lg:hidden fixed bottom-0 w-full bg-white p-2',
        `grid grid-cols-2`
      )}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          to={tab.href}
          className={clsx(
            'flex flex-col items-center',
            pathname === tab.href && 'text-blue-600'
          )}
        >
          <tab.icon size={23} />
          <span className="text-sm font-semibold">{tab.name}</span>
        </Link>
      ))}
    </nav>
  );
};
