import React from 'react';
import {
  TrashIcon,
  PencilSquareIcon,
  PhotoIcon,
  DocumentCheckIcon,
  MinusCircleIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/solid';

import { instance } from '../../utils';
import Button from '../Button';
import Modal from '../Modal';
import Pagination from '../Pagination';

export interface Data {
  company: string;
  id: string;
  images: string;
  lastname: string;
  name: string;
  roles: string;
  username: string;
}

interface EdiTable {
  columns: {
    field: string;
    fieldName: string;
  }[];
}

export interface ModalType {
  action: '' | 'delete' | 'add';
  rowDeleteId: string;
}

const EdiTable: React.FC<EdiTable> = ({ columns }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [rowIDToEdit, setRowIDToEdit] = React.useState<string | undefined>(undefined);
  const [rowsState, setRowsState] = React.useState<Data[]>([]);
  const [editedRow, setEditedRow] = React.useState<any>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<ModalType>({ action: '', rowDeleteId: '' });
  const [width, setWidth] = React.useState(window.innerWidth);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [dataLength, setDataLength] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [sort, setSort] = React.useState('');

  const itemsPerPage = 4;

  React.useEffect(() => {
    instance
      .get(`/users`)
      .then((res) => {
        setDataLength(res.data.length);
        setPageCount(Math.ceil(dataLength / itemsPerPage));
      })
      .catch((error) => console.error(error));
  }, [dataLength]);

  React.useEffect(() => {
    instance
      .get(`/users/?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sort}&order=asc`)
      .then((res) => {
        setRowsState(res.data);
      })
      .catch((error) => console.error(error));
  }, [currentPage, sort]);

  React.useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  });

  const onChangePage = (number: number) => {
    setCurrentPage(number);
  };

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
    setIsEditMode(true);
    setEditedRow(undefined);
    setRowIDToEdit(rowID);
  };

  const handleCancelEditing = () => {
    setIsEditMode(false);
    setEditedRow({});
  };

  const handleOnChangeField = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    rowID: string
  ) => {
    const { name: fieldName, value } = e.target;

    setEditedRow({
      id: rowID,
      [fieldName]: value,
    });
  };

  const handleSaveRowChanges = () => {
    setIsEditMode(false);

    const newData = rowsState.map((row) => {
      if (row.id === editedRow.id) {
        if (editedRow.name) row.name = editedRow.name;
        if (editedRow.lastname) row.lastname = editedRow.lastname;
        if (editedRow.username) row.username = editedRow.username;
        if (editedRow.roles) row.roles = editedRow.roles;
      }

      return row;
    });

    instance
      .put('/users/' + editedRow.id, editedRow)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setRowsState(newData);
    setEditedRow(undefined);
  };

  const addUser = () => {
    setIsOpen(true);
    setModalType({
      action: 'add',
      rowDeleteId: '0',
    });
  };

  return (
    <div className="p-1.5 w-full inline-block align-middle">
      <div className="border rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  scope="col"
                  className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  {column.fieldName}
                  {column.field === 'name' ? (
                    <ArrowsUpDownIcon
                      className="w-3 h-3 inline-block ml-3 cursor-pointer transition hover:rotate-180"
                      onClick={() => setSort(column.field)}
                    />
                  ) : (
                    ''
                  )}
                  {column.field === 'lastname' ? (
                    <ArrowsUpDownIcon
                      className="w-3 h-3 inline-block ml-3 cursor-pointer transition hover:rotate-180"
                      onClick={() => setSort(column.field)}
                    />
                  ) : (
                    ''
                  )}
                  {column.field === 'username' ? (
                    <ArrowsUpDownIcon
                      className="w-3 h-3 inline-block ml-3 cursor-pointer transition hover:rotate-180"
                      onClick={() => setSort(column.field)}
                    />
                  ) : (
                    ''
                  )}
                  {column.field === 'company' ? (
                    <ArrowsUpDownIcon
                      className="w-3 h-3 inline-block ml-3 cursor-pointer transition hover:rotate-180"
                      onClick={() => setSort(column.field)}
                    />
                  ) : (
                    ''
                  )}
                  {column.field === 'roles' ? (
                    <ArrowsUpDownIcon
                      className="w-3 h-3 inline-block ml-3 cursor-pointer transition hover:rotate-180"
                      onClick={() => setSort(column.field)}
                    />
                  ) : (
                    ''
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rowsState.map((row, i) => (
              <tr key={row.id}>
                <td className="px-3 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {i + 1}
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
                      name="name"
                      onChange={(e) => handleOnChangeField(e, row.id)}
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
                      name="lastname"
                      onChange={(e) => handleOnChangeField(e, row.id)}
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
                      name="username"
                      onChange={(e) => handleOnChangeField(e, row.id)}
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
                      name="roles"
                      onChange={(e) => handleOnChangeField(e, row.id)}
                    >
                      <option defaultValue="ROLE_USER">ROLE_USER</option>
                      <option defaultValue="ROLE_ADMIN">ROLE_ADMIN</option>
                      <option defaultValue="ROLE_SUPERADMIN">ROLE_SUPERADMIN</option>
                    </select>
                  ) : (
                    row.roles
                  )}
                </td>
                <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">{row.company}</td>
                <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">
                  <div className="flex justify-center">
                    <a href={row.images} target="_blank">
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
        <Pagination onChangePage={onChangePage} pageCount={pageCount} />
        <Button name={width < 500 ? '+' : 'Создать пользователя'} onClickButton={() => addUser()} />
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        rowsState={rowsState}
        setRowsState={setRowsState}
        modalType={modalType}
      />
    </div>
  );
};

export default EdiTable;
