import { useDisclosure } from '@mantine/hooks';

export const useModals = () => {
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [isSaveModalOpen, { open: openSaveModal, close: closeSaveModal }] = useDisclosure(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
    isSaveModalOpen,
    openSaveModal,
    closeSaveModal,
  };
};