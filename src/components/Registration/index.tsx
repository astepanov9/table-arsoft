import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { instance } from '../../utils';
import { roleList } from '../EdiTable';
import AppContext from '../../context/context';
import { RegistrationType } from './Registration.types';
import { Inputs } from './Registration.types';
import { useAddUsersMutation } from '../../redux';

const Registration: React.FC<RegistrationType> = ({ modalClose, rowsState, setRowsState }) => {
  const { setVisible, setStatus, setTitle } = React.useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [addUser] = useAddUsersMutation();

  const toastSuccess = () => {
    setVisible(true);
    setTitle('Пользователь добавлен');
    setStatus('success');
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  /* const onSubmit: SubmitHandler<Inputs> = (data) => {
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
  }; */

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addUser(data)
      .then(() => {
        const newData = [...rowsState, data];
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
          <label className="block text-gray-700 text-sm font-bold">
            Имя:
            {errors.name && (
              <p className="text-red-500 text-xs font-light">
                Введите имя (только буквы, 3-20 символов)
              </p>
            )}
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-light leading-tight focus:outline-none focus:shadow-outline mt-2"
              style={{ borderColor: errors.name && 'red' }}
              {...register('name', {
                required: true,
                minLength: 3,
                maxLength: 20,
                pattern: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
              })}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold">
            Фамилия:
            {errors.lastname && (
              <p className="text-red-500 text-xs font-light">
                Введите фамилию (только буквы, 3-20 символов)
              </p>
            )}
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-light leading-tight focus:outline-none focus:shadow-outline mt-2"
              style={{ borderColor: errors.lastname && 'red' }}
              {...register('lastname', {
                required: true,
                minLength: 3,
                maxLength: 20,
                pattern: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
              })}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold">
            Username:
            {errors.username && (
              <p className="text-red-500 text-xs font-light">Введите username (3-20 символов)</p>
            )}
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-light leading-tight focus:outline-none focus:shadow-outline mt-2"
              style={{ borderColor: errors.username && 'red' }}
              {...register('username', { required: true, minLength: 3, maxLength: 20 })}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold">
            Пароль:
            {errors.password && (
              <p className="text-red-500 text-xs font-light">
                Введите пароль (от 6 символов с использованием цифр, спец. символов, латиницы,
                наличием строчных и прописных символов)
              </p>
            )}
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
          <label className="block text-gray-700 text-sm font-bold">
            Роль:
            {errors.roles && (
              <p className="text-red-500 text-xs font-light">Выберите роль из списка</p>
            )}
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
          <label className="block text-gray-700 text-sm font-bold">
            Организация:
            {errors.company && (
              <p className="text-red-500 text-xs font-light">Выберите организацию из списка</p>
            )}
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-light leading-tight focus:outline-none focus:shadow-outline mt-2"
              style={{ borderColor: errors.company && 'red' }}
              {...register('company', {
                required: true,
                validate: (value) =>
                  value === 'Koss LLC' || value === 'ArSoft' || value === 'Kautzer and Schmidt',
              })}
            >
              <option value="Выберите организацию">Выберите организацию</option>
              <option value="Koss LLC">Koss LLC</option>
              <option value="ArSoft">ArSoft</option>
              <option value="Kautzer and Schmidt">Kautzer and Schmidt</option>
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
