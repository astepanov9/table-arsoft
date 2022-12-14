import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { instance } from '../../utils';
import Button from '../Button';
import Registration from '../Registration';
import AppContext from '../../context/context';
import { ModalType } from './Modal.types';
import { useDeleteUsersMutation } from '../../redux';

const Modal: React.FC<ModalType> = ({ isOpen, setIsOpen, rowsState, setRowsState, modalType }) => {
  const { setVisible, setStatus, setTitle } = React.useContext(AppContext);

  const [deleteUser] = useDeleteUsersMutation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const toastRemove = () => {
    setVisible(true);
    setTitle('Пользователь удален');
    setStatus('error');
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  const removeRow = async () => {
    const newData = rowsState.filter((row) => {
      return row.id !== modalType.rowDeleteId ? row : null;
    });

    await deleteUser(modalType.rowDeleteId)
      .then(() => {
        setRowsState(newData);
        toastRemove();
      })
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
                      <Registration
                        modalClose={setIsOpen}
                        rowsState={rowsState}
                        setRowsState={setRowsState}
                      />
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
