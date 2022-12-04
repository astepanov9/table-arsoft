import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { instance } from '../../utils';
import { ModalType } from '../EdiTable';
import { Data } from '../EdiTable';
import Button from '../Button';
import Registration from '../Registration';

interface Modal {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  rowsState: Data[];
  setRowsState: React.Dispatch<React.SetStateAction<Data[]>>;
  modalType: ModalType;
}

const Modal: React.FC<Modal> = ({ isOpen, setIsOpen, rowsState, setRowsState, modalType }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const removeRow = () => {
    const newData = rowsState.filter((row) => {
      return row.id !== modalType.rowDeleteId ? row : null;
    });

    setRowsState(newData);

    instance
      .delete('/users/' + modalType.rowDeleteId)
      .then((res) => alert('Пользователь ' + res.data.username + ' удален'))
      .catch((error) => console.error(error));

    setIsOpen(false);
  };

  const usernameDelete = rowsState.find((row) => row.id === modalType.rowDeleteId);

  if (modalType.action === 'delete') {
    return (
      <>
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Удаление пользователя
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Вы действительно хотите удалить пользователя?
                      </p>
                      <p className="text-sm font-semibold">{usernameDelete?.username}</p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button name="Нет" onClickButton={closeModal} />
                      <Button name="Да" onClickButton={removeRow} />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
  if (modalType.action === 'add') {
    return (
      <>
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Создание пользователя
                    </Dialog.Title>
                    <div className="mt-2">
                      <Registration modalClose={setIsOpen} />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }

  return <></>;
};

export default Modal;
