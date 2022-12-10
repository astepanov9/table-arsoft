import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { instance } from '../../utils';
import { roleList } from '../EdiTable';
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
          {errors.name && (
            <p className="text-red-500 text-xs">Введите имя (только буквы, 3-20 символов)</p>
          )}
          <label className="block text-gray-700 text-sm font-bold">
            Имя:
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-light leading-tight focus:outline-none focus:shadow-outline mt-2"
              style={{ borderColor: errors.name && 'red' }}
              {...register('name', {
                required: true,
                minLength: 3,
                maxLength: 20,
                pattern: /[a-zа-яё]/,
              })}
            />
          </label>
        </div>
        <div className="mb-4">
          {errors.lastname && (
            <p className="text-red-500 text-xs">Введите фамилию (только буквы, 3-20 символов)</p>
          )}
          <label className="block text-gray-700 text-sm font-bold">
            Фамилия:
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-light leading-tight focus:outline-none focus:shadow-outline mt-2"
              style={{ borderColor: errors.lastname && 'red' }}
              {...register('lastname', {
                required: true,
                minLength: 3,
                maxLength: 20,
                pattern: /[a-zа-яё]/,
              })}
            />
          </label>
        </div>
        <div className="mb-4">
          {errors.username && (
            <p className="text-red-500 text-xs">Введите username (3-20 символов)</p>
          )}
          <label className="block text-gray-700 text-sm font-bold">
            Username:
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-light leading-tight focus:outline-none focus:shadow-outline mt-2"
              style={{ borderColor: errors.username && 'red' }}
              {...register('username', { required: true, minLength: 3, maxLength: 20 })}
            />
          </label>
        </div>
        <div className="mb-4">
          {errors.password && (
            <p className="text-red-500 text-xs">
              Введите пароль (от 6 символов с использованием цифр, спец. символов, латиницы,
              наличием строчных и прописных символов)
            </p>
          )}
          <label className="block text-gray-700 text-sm font-bold">
            Пароль:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-light leading-tight focus:outline-none focus:shadow-outline mt-2"
              type="password"
              placeholder="******************"
              style={{ borderColor: errors.password && 'red' }}
              {...register('password', {
                required: true,
                pattern:
                  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
              })}
            />
          </label>
        </div>
        <div className="mb-4">
          {errors.roles && <p className="text-red-500 text-xs">Выберите роль из списка</p>}
          <label className="block text-gray-700 text-sm font-bold">
            Роль:
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-light leading-tight focus:outline-none focus:shadow-outline mt-2"
              style={{ borderColor: errors.roles && 'red' }}
              {...register('roles', {
                required: true,
                validate: (value) =>
                  value === 'ROLE_USER' || value === 'ROLE_ADMIN' || value === 'ROLE_SUPERADMIN',
              })}
            >
              <option value="Выберите роль">Выберите роль</option>
              {roleList.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.translate}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mb-4">
          {errors.company && <p className="text-red-500 text-xs">Выберите организацию из списка</p>}
          <label className="block text-gray-700 text-sm font-bold">
            Организация:
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-light leading-tight focus:outline-none focus:shadow-outline mt-2"
              style={{ borderColor: errors.company && 'red' }}
              {...register('company', {
                required: true,
                validate: (value) =>
                  value === 'Koss LLC' ||
                  value === 'ArSoft' ||
                  value === 'Dickens, Kautzer and Schmidt',
              })}
            >
              <option defaultValue="Выберите организацию">Выберите организацию</option>
              <option defaultValue="Koss LLC">Koss LLC</option>
              <option defaultValue="ArSoft">ArSoft</option>
              <option defaultValue="Kautzer and Schmidt">Kautzer and Schmidt</option>
            </select>
          </label>
        </div>
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded transition cursor-pointer"
          value="Сохранить"
        />
      </form>
    </>
  );
};

export default Registration;
