import React from 'react';

import EdiTable from './components/EdiTable';
import { Data } from './components/EdiTable/EdiTable.types';
import Toast from './components/Toast';
import AppContext from './context/context';
import { useGetUsersQuery } from './redux';

const columns = [
  { field: 'id', fieldName: '#' },
  { field: 'name', fieldName: 'Имя' },
  { field: 'lastname', fieldName: 'Фамилия' },
  { field: 'username', fieldName: 'Username' },
  { field: 'roles', fieldName: 'Роль' },
  { field: 'company', fieldName: 'Организация' },
  { field: 'image', fieldName: 'Изображения' },
  { field: 'actions', fieldName: '' },
];

const App: React.FC = () => {
  const [rowsState, setRowsState] = React.useState<Data[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [status, setStatus] = React.useState('success');
  const [title, setTitle] = React.useState('Пользователь добавлен');

  const { data, isLoading } = useGetUsersQuery('');

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (isLoading) return <></>;

  return (
    <AppContext.Provider
      value={{
        visible,
        setVisible,
        status,
        setStatus,
        title,
        setTitle,
      }}
    >
      <div className="App">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
          <div>
            <h1 className="text-xl text-center font-semibold">Table ArSoft</h1>
          </div>
          <div className="mt-4">
            <EdiTable
              columns={columns}
              rowsState={data}
              setRowsState={setRowsState}
              loading={loading}
            />
            <Toast />
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
