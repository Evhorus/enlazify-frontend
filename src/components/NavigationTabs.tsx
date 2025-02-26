import { Link, useLocation } from 'react-router';
import clsx from 'clsx';
import { NavigationTab } from '../types';

type NavigationTabsDesktopProps = {
  tabs: NavigationTab[];
};

export const NavigationTabsDesktop = ({ tabs }: NavigationTabsDesktopProps) => {
  const location = useLocation();

  return (
    <div className="hidden lg:block mb-5">
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={clsx(
                  'group inline-flex items-center border-b-2 py-4 px-1 text-xl',
                  location.pathname === tab.href
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                )}
              >
                <tab.icon
                  className={clsx(
                    '-ml-0.5 mr-2 h-5 w-5',
                    location.pathname === tab.href
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
