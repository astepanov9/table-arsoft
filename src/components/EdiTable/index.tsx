import React from 'react';
import {
  TrashIcon,
  PencilSquareIcon,
  PhotoIcon,
  DocumentCheckIcon,
  MinusCircleIcon,
  ArrowsUpDownIcon,
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

const EdiTable: React.FC<EdiTableType> = ({ columns, rowsState, setRowsState, loading }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [rowIDToEdit, setRowIDToEdit] = React.useState<string | undefined>(undefined);
  const [editedRow, setEditedRow] = React.useState<EditedRow | undefined>(undefined);
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<ModalDataType>({ action: '', rowDeleteId: '' });
  const [width, setWidth] = React.useState(window.innerWidth);
  const { register, watch, reset } = useForm();

  const { setVisible, setStatus, setTitle } = React.useContext(AppContext);

  const toastEdit = () => {
    setVisible(true);
    setTitle('Отредактировано');
    setStatus('success');
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

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
    };

    setEditedRow(newData);
  };

  const handleSaveRowChanges = () => {
    setIsEditMode(false);

    const newData = rowsState.map((row) => {
      if (row.id === editedRow?.id) {
        if (editedRow.name) row.name = editedRow.name;
        if (editedRow.lastname) row.lastname = editedRow.lastname;
        if (editedRow.username) row.username = editedRow.username;
        if (editedRow.roles) row.roles = editedRow.roles;
      }

      return row;
    });

    instance
      .put('/users/' + editedRow?.id, editedRow)
      .then(() => {
        setRowsState(newData);
        toastEdit();
      })
      .catch((error) => {
        console.log(error);
      });

    setEditedRow(undefined);
  };

  const addUser = () => {
    setIsOpen(true);
    setModalType({
      action: 'add',
      rowDeleteId: '0',
    });
  };

  const sortField = (parametr: string) => {
    if (parametr === 'name')
      setRowsState([...rowsState].sort((a, b) => (a.name < b.name ? -1 : 1)));
    if (parametr === 'lastname')
      setRowsState([...rowsState].sort((a, b) => (a.lastname < b.lastname ? -1 : 1)));
    if (parametr === 'username')
      setRowsState([...rowsState].sort((a, b) => (a.username < b.username ? -1 : 1)));
    if (parametr === 'roles')
      setRowsState([...rowsState].sort((a, b) => (a.roles < b.roles ? -1 : 1)));
    if (parametr === 'company')
      setRowsState([...rowsState].sort((a, b) => (a.company < b.company ? -1 : 1)));
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
                      {column.fieldName}
                      {column.field === 'name' ? (
                        <ArrowsUpDownIcon
                          className="w-3 h-3 inline-block ml-3 cursor-pointer transition hover:rotate-180"
                          onClick={() => sortField('name')}
                        />
                      ) : (
                        ''
                      )}
                      {column.field === 'lastname' ? (
                        <ArrowsUpDownIcon
                          className="w-3 h-3 inline-block ml-3 cursor-pointer transition hover:rotate-180"
                          onClick={() => sortField('lastname')}
                        />
                      ) : (
                        ''
                      )}
                      {column.field === 'username' ? (
                        <ArrowsUpDownIcon
                          className="w-3 h-3 inline-block ml-3 cursor-pointer transition hover:rotate-180"
                          onClick={() => sortField('username')}
                        />
                      ) : (
                        ''
                      )}
                      {column.field === 'company' ? (
                        <ArrowsUpDownIcon
                          className="w-3 h-3 inline-block ml-3 cursor-pointer transition hover:rotate-180"
                          onClick={() => sortField('company')}
                        />
                      ) : (
                        ''
                      )}
                      {column.field === 'roles' ? (
                        <ArrowsUpDownIcon
                          className="w-3 h-3 inline-block ml-3 cursor-pointer transition hover:rotate-180"
                          onClick={() => sortField('roles')}
                        />
                      ) : (
                        ''
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rowsState.slice(firstContentIndex, lastContentIndex).map((row, i) => (
                  <tr key={row.id}>
                    <td className="px-3 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {firstContentIndex + 1 + i}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {isEditMode && rowIDToEdit === row.id ? (
                        <input
                          type="text"
                          className="
                  block
                  w-full
                  px-2
                  py-1
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
                        row.name
                      )}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {isEditMode && rowIDToEdit === row.id ? (
                        <input
                          type="text"
                          className="
                block
                w-full
                px-2
                py-1
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
                        row.lastname
                      )}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {isEditMode && rowIDToEdit === row.id ? (
                        <input
                          type="text"
                          className="
                block
                w-full
                px-2
                py-1
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
                        row.username
                      )}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {isEditMode && rowIDToEdit === row.id ? (
                        <select
                          className="form-select appearance-none
                block
                w-full
                px-2
                py-1
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
                          <option defaultValue="ROLE_USER">ROLE_USER</option>
                          <option defaultValue="ROLE_ADMIN">ROLE_ADMIN</option>
                          <option defaultValue="ROLE_SUPERADMIN">ROLE_SUPERADMIN</option>
                        </select>
                      ) : (
                        row.roles
                      )}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      {row.company}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                      <div className="flex justify-center">
                        <a href={row.images} target="_blank" rel="noreferrer">
                          <PhotoIcon className="w-5 h-5 cursor-pointer transition hover:fill-slate-400" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex space-x-4">
                      {isEditMode && rowIDToEdit === row.id ? (
                        <DocumentCheckIcon
                          className="w-5 h-5 cursor-pointer fill-green-400 hover:fill-green-500"
                          onClick={() => handleSaveRowChanges()}
                        />
                      ) : (
                        <PencilSquareIcon
                          className="w-5 h-5 cursor-pointer transition hover:fill-green-400"
                          onClick={() => handleEdit(row.id)}
                        />
                      )}
                      {isEditMode && rowIDToEdit === row.id ? (
                        <MinusCircleIcon
                          className="w-5 h-5 cursor-pointer fill-red-400 hover:fill-red-500"
                          onClick={() => handleCancelEditing()}
                        />
                      ) : (
                        <TrashIcon
                          className="w-5 h-5 cursor-pointer transition hover:fill-red-400"
                          onClick={() => handleRemoveRow(row.id)}
                        />
                      )}
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
