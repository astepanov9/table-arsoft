import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { instance } from '../../utils';
import AppContext from '../../context/context';
import { RegistrationType } from './Registration.types';
import { Inputs } from './Registration.types';

const Registration: React.FC<RegistrationType> = ({ modalClose, rowsState, setRowsState }) => {
  const { setVisible, setStatus, setTitle } = React.useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const toastSuccess = () => {
    setVisible(true);
    setTitle('Пользователь добавлен');
    setStatus('success');
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    instance
      .post('/users', data)
      .then((response) => {
        const newData = [...rowsState, response.data];
        setRowsState(newData);
        toastSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    modalClose(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Имя:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            style={{ borderColor: errors.username && 'red' }}
            required
            {...register('name')}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Фамилия:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            {...register('lastname')}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            {...register('username')}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Пароль:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******************"
            required
            {...register('password')}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Роль:</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            {...register('roles')}
          >
            <option defaultValue="ROLE_USER">ROLE_USER</option>
            <option defaultValue="ROLE_ADMIN">ROLE_ADMIN</option>
            <option defaultValue="ROLE_SUPERADMIN">ROLE_SUPERADMIN</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Компания:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            {...register('company')}
          />
        </div>
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded transition cursor-pointer"
        />
      </form>
    </>
  );
};

export default Registration;
