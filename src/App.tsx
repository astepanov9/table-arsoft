import React from 'react';

import EdiTable from './components/EdiTable';

const App: React.FC = () => {
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

  return (
    <div className="App">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div>
          <h1 className="text-xl text-center font-semibold">Table ArSoft</h1>
        </div>
        <div className="mt-4">
          <EdiTable columns={columns} />
        </div>
      </main>
    </div>
  );
};

export default App;
