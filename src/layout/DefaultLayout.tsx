import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {localStorage.getItem('role_backoffice') == 'admin' ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="flex h-[90vh] items-center justify-center text-[50px]">
          Unauthorized page
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
