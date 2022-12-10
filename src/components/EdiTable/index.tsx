import React from 'react';
import {
  TrashIcon,
  PencilSquareIcon,
  PhotoIcon,
  DocumentCheckIcon,
  MinusCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';

import { instance } from '../../utils';
import Button from '../Button';
import Modal from '../Modal';
import Pagination from '../Pagination';
import usePagination from '../../hooks/usePagination';
import Preloader from '../Preloader';
import AppContext from '../../context/context';
import { EdiTableType } from './EdiTable.types';
import { ModalDataType } from './EdiTable.types';
import { EditedRow } from './EdiTable.types';
import { RolesPropertyEnum } from './EdiTable.types';
import { RolesListObj } from './EdiTable.types';

export const roleList: RolesListObj[] = [
  {
    name: 'ROLE_USER',
    translate: RolesPropertyEnum.ROLE_USER,
  },
  {
    name: 'ROLE_ADMIN',
    translate: RolesPropertyEnum.ROLE_ADMIN,
  },
  {
    name: 'ROLE_SUPERADMIN',
    translate: RolesPropertyEnum.ROLE_SUPERADMIN,
  },
];

const rolesTranslate = (role: string) => {
  let ruRole = 'Не удалось определить';
  if (role === 'ROLE_USER') ruRole = RolesPropertyEnum.ROLE_USER;
  if (role === 'ROLE_ADMIN') ruRole = RolesPropertyEnum.ROLE_ADMIN;
  if (role === 'ROLE_SUPERADMIN') ruRole = RolesPropertyEnum.ROLE_SUPERADMIN;
  return ruRole;
};

const downloadImage = async (imageSrc: string) => {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = 'Avatar';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const EdiTable: React.FC<EdiTableType> = ({ columns, rowsState, setRowsState, loading }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [rowIDToEdit, setRowIDToEdit] = React.useState<string | undefined>(undefined);
  const [editedRow, setEditedRow] = React.useState<EditedRow | undefined>(undefined);
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<ModalDataType>({ action: '', rowDeleteId: '' });
  const [width, setWidth] = React.useState(window.innerWidth);
  const { register, watch, reset } = useForm<EditedRow>();

  const { setVisible, setStatus, setTitle } = React.useContext(AppContext);

  const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, setPage, totalPages } =
    usePagination({
      contentPerPage: 4,
      count: rowsState.length,
    });

  React.useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  });

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };

  const handleRemoveRow = (rowID: string) => {
    setIsOpen(true);
    setModalType({
      action: 'delete',
      rowDeleteId: rowID,
    });
  };

  const handleEdit = (rowID: string) => {
    reset();
    setIsEditMode(true);
    setEditedRow(undefined);
    setRowIDToEdit(rowID);
  };

  const handleCancelEditing = () => {
    setIsEditMode(false);
    setEditedRow(undefined);
  };

  const handleOnChangeField = (rowID: string) => {
    const newData = {
      id: rowID,
      name: watch('name'),
      lastname: watch('lastname'),
      username: watch('username'),
      roles: watch('roles'),
      company: watch('company'),
    };
    setEditedRow(newData);
  };

  const handleSaveRowChanges = () => {
    const saveRow = () => {
      instance
        .put('/users/' + editedRow?.id, editedRow)
        .then(() => {
          setRowsState(newData);
          toastEdit();
        })
        .catch((error) => {
          console.log(error);
        });

      setIsEditMode(false);
      setEditedRow(undefined);
    };

    const newData = rowsState.map((row) => {
      if (row.id === editedRow?.id) {
        const valid =
          editedRow.name.length < 1 ||
          editedRow.lastname.length < 1 ||
          editedRow.username.length < 1;

        if (valid) {
          toastErrorEdit();
        } else {
          row.name = editedRow.name;
          row.lastname = editedRow.lastname;
          row.username = editedRow.username;
          row.roles = editedRow.roles;
          row.company = editedRow.company;
          saveRow();
        }
      }

      return row;
    });
  };

  const addUser = () => {
    setIsOpen(true);
    setModalType({
      action: 'add',
      rowDeleteId: '0',
    });
  };

  const sortField = (type: string, parametr: string) => {
    if (type === 'name') {
      if (parametr === 'asc') {
        setRowsState([...rowsState].sort((a, b) => (a.name < b.name ? -1 : 1)));
      } else if (parametr === 'desc') {
        setRowsState([...rowsState].sort((a, b) => (a.name > b.name ? -1 : 1)));
      }
    }
    if (type === 'lastname') {
      if (parametr === 'asc') {
        setRowsState([...rowsState].sort((a, b) => (a.lastname < b.lastname ? -1 : 1)));
      } else if (parametr === 'desc') {
        setRowsState([...rowsState].sort((a, b) => (a.lastname > b.lastname ? -1 : 1)));
      }
    }
    if (type === 'username') {
      if (parametr === 'asc') {
        setRowsState([...rowsState].sort((a, b) => (a.username < b.username ? -1 : 1)));
      } else if (parametr === 'desc') {
        setRowsState([...rowsState].sort((a, b) => (a.username > b.username ? -1 : 1)));
      }
    }
    if (type === 'roles') {
      if (parametr === 'asc') {
        setRowsState([...rowsState].sort((a, b) => (a.roles < b.roles ? -1 : 1)));
      } else if (parametr === 'desc') {
        setRowsState([...rowsState].sort((a, b) => (a.roles > b.roles ? -1 : 1)));
      }
    }
    if (type === 'company') {
      if (parametr === 'asc') {
        setRowsState([...rowsState].sort((a, b) => (a.company < b.company ? -1 : 1)));
      } else if (parametr === 'desc') {
        setRowsState([...rowsState].sort((a, b) => (a.company > b.company ? -1 : 1)));
      }
    }
  };

  const toastEdit = () => {
    setVisible(true);
    setTitle('Отредактировано');
    setStatus('success');
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  const toastErrorEdit = () => {
    setVisible(true);
    setTitle('Поля не должны быть пустыми');
    setStatus('error');
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="border rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.field}
                      scope="col"
                      className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        <p>{column.fieldName}</p>
                        {column.field === 'name' ? (
                          <div className="ml-3">
                            <button
                              className="group block cursor-pointer w-3 h-3 outline-none"
                              onClick={() => sortField('name', 'desc')}
                            >
                              <ChevronUpIcon className="transition opacity-50 group-hover:opacity-100 group-hover:fill-black group-focus:fill-black group-focus:opacity-100" />
                            </button>
                            <button
                              className="group block cursor-pointer w-3 h-3 outline-none"
                              onClick={() => sortField('name', 'asc')}
                            >
                              <ChevronDownIcon className="transition opacity-50 group-hover:opacity-100 group-hover:fill-black group-focus:fill-black group-focus:opacity-100" />
                            </button>
                          </div>
                        ) : (
                          ''
                        )}
                        {column.field === 'lastname' ? (
                          <div className="ml-3">
                            <button
                              className="group block cursor-pointer w-3 h-3 outline-none"
                              onClick={() => sortField('lastname', 'desc')}
                            >
                              <ChevronUpIcon className="transition opacity-50 group-hover:opacity-100 group-hover:fill-black group-focus:fill-black group-focus:opacity-100" />
                            </button>
                            <button
                              className="group block cursor-pointer w-3 h-3 outline-none"
                              onClick={() => sortField('lastname', 'asc')}
                            >
                              <ChevronDownIcon className="transition opacity-50 group-hover:opacity-100 group-hover:fill-black group-focus:fill-black group-focus:opacity-100" />
                            </button>
                          </div>
                        ) : (
                          ''
                        )}
                        {column.field === 'username' ? (
                          <div className="ml-3">
                            <button
                              className="group block cursor-pointer w-3 h-3 outline-none"
                              onClick={() => sortField('username', 'desc')}
                            >
                              <ChevronUpIcon className="transition opacity-50 group-hover:opacity-100 group-hover:fill-black group-focus:fill-black group-focus:opacity-100" />
                            </button>
                            <button
                              className="group block cursor-pointer w-3 h-3 outline-none"
                              onClick={() => sortField('username', 'asc')}
                            >
                              <ChevronDownIcon className="transition opacity-50 group-hover:opacity-100 group-hover:fill-black group-focus:fill-black group-focus:opacity-100" />
                            </button>
                          </div>
                        ) : (
                          ''
                        )}
                        {column.field === 'company' ? (
                          <div className="ml-3">
                            <button
                              className="group block cursor-pointer w-3 h-3 outline-none"
                              onClick={() => sortField('company', 'desc')}
                            >
                              <ChevronUpIcon className="transition opacity-50 group-hover:opacity-100 group-hover:fill-black group-focus:fill-black group-focus:opacity-100" />
                            </button>
                            <button
                              className="group block cursor-pointer w-3 h-3 outline-none"
                              onClick={() => sortField('company', 'asc')}
                            >
                              <ChevronDownIcon className="transition opacity-50 group-hover:opacity-100 group-hover:fill-black group-focus:fill-black group-focus:opacity-100" />
                            </button>
                          </div>
                        ) : (
                          ''
                        )}
                        {column.field === 'roles' ? (
                          <div className="ml-3">
                            <button
                              className="group block cursor-pointer w-3 h-3 outline-none"
                              onClick={() => sortField('roles', 'desc')}
                            >
                              <ChevronUpIcon className="transition opacity-50 group-hover:opacity-100 group-hover:fill-black group-focus:fill-black group-focus:opacity-100" />
                            </button>
                            <button
                              className="group block cursor-pointer w-3 h-3 outline-none"
                              onClick={() => sortField('roles', 'asc')}
                            >
                              <ChevronDownIcon className="transition opacity-50 group-hover:opacity-100 group-hover:fill-black group-focus:fill-black group-focus:opacity-100" />
                            </button>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 h-[212px]">
                {rowsState.slice(firstContentIndex, lastContentIndex).map((row, i) => (
                  <tr key={row.id}>
                    <td className="px-3 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <p className="w-[30px]">{firstContentIndex + 1 + i}</p>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {isEditMode && rowIDToEdit === row.id ? (
                        <input
                          type="text"
                          className="
                  block
                  w-[150px]
                  px-[7px]
                  py-[3px]
                  text-sm
                  text-gray-800
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          defaultValue={editedRow ? editedRow.name : row.name}
                          id={row.id}
                          {...register('name', {
                            onChange: () => handleOnChangeField(row.id),
                          })}
                        />
                      ) : (
                        <p className="px-[8px] py-[4px] w-[150px]">{row.name}</p>
                      )}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {isEditMode && rowIDToEdit === row.id ? (
                        <input
                          type="text"
                          className="
                block
                w-[150px]
                px-[7px]
                py-[3px]
                text-sm
                text-gray-800
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          defaultValue={editedRow ? editedRow.lastname : row.lastname}
                          id={row.id}
                          {...register('lastname', {
                            onChange: () => handleOnChangeField(row.id),
                          })}
                        />
                      ) : (
                        <p className="px-[8px] py-[4px] w-[150px]">{row.lastname}</p>
                      )}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {isEditMode && rowIDToEdit === row.id ? (
                        <input
                          type="text"
                          className="
                block
                w-[150px]
                px-[7px]
                py-[3px]
                text-sm
                text-gray-800
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          defaultValue={editedRow ? editedRow.username : row.username}
                          id={row.id}
                          {...register('username', {
                            onChange: () => handleOnChangeField(row.id),
                          })}
                        />
                      ) : (
                        <p className="px-[8px] py-[4px] w-[150px]">{row.username}</p>
                      )}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {isEditMode && rowIDToEdit === row.id ? (
                        <select
                          className="form-select appearance-none
                block
                w-[150px]
                px-[7px]
                py-[3px]
                text-sm
                text-gray-800
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Default select example"
                          defaultValue={row.roles}
                          {...register('roles', {
                            onChange: () => handleOnChangeField(row.id),
                          })}
                        >
                          {roleList.map((role) => (
                            <option key={role.name} value={role.name}>
                              {role.translate}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="px-[8px] py-[4px] w-[150px]">{rolesTranslate(row.roles)}</p>
                      )}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {isEditMode && rowIDToEdit === row.id ? (
                        <select
                          className="form-select appearance-none
                block
                w-[150px]
                px-[7px]
                py-[3px]
                text-sm
                text-gray-800
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Default select example"
                          defaultValue={row.company}
                          {...register('company', {
                            onChange: () => handleOnChangeField(row.id),
                          })}
                        >
                          <option value="Koss LLC">Koss LLC</option>
                          <option value="ArSoft">ArSoft</option>
                          <option value="Kautzer and Schmidt">Kautzer and Schmidt</option>
                        </select>
                      ) : (
                        <p className="px-[8px] py-[4px] w-[150px]">{row.company}</p>
                      )}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      <div className="flex justify-center">
                        <button
                          onClick={() => downloadImage(row.images)}
                          className="w-5 h-5 outline-none"
                        >
                          <PhotoIcon className="cursor-pointer transition hover:fill-slate-400" />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      <div className="flex justify-center space-x-3">
                        {isEditMode && rowIDToEdit === row.id ? (
                          <button
                            onClick={() => handleSaveRowChanges()}
                            className="w-5 h-5 outline-none"
                          >
                            <DocumentCheckIcon className="fill-green-400 cursor-pointer hover:fill-green-500" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(row.id)}
                            className="w-5 h-5 outline-none"
                          >
                            <PencilSquareIcon className="cursor-pointer transition hover:fill-green-400" />
                          </button>
                        )}
                        {isEditMode && rowIDToEdit === row.id ? (
                          <button
                            onClick={() => handleCancelEditing()}
                            className="w-5 h-5 outline-none"
                          >
                            <MinusCircleIcon className="cursor-pointer fill-red-400 hover:fill-red-500" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRemoveRow(row.id)}
                            className="w-5 h-5 outline-none"
                          >
                            <TrashIcon className="cursor-pointer transition hover:fill-red-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between">
            <Pagination
              nextPage={nextPage}
              prevPage={prevPage}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
            <Button
              name={width < 700 ? '+' : 'Создать пользователя'}
              onClickButton={() => addUser()}
            />
          </div>
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            rowsState={rowsState}
            setRowsState={setRowsState}
            modalType={modalType}
          />
        </div>
      )}
    </>
  );
};

export default EdiTable;
