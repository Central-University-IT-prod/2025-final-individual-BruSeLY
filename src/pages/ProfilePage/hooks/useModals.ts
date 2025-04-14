import { useState, useCallback } from 'react';

export const useModals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAchievementsDrawerOpen, setIsAchievementsDrawerOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const openEditModal = useCallback(() => setIsEditModalOpen(true), []);
  const closeEditModal = useCallback(() => setIsEditModalOpen(false), []);
  const openAchievementsDrawer = useCallback(() => setIsAchievementsDrawerOpen(true), []);
  const closeAchievementsDrawer = useCallback(() => setIsAchievementsDrawerOpen(false), []);

  return {
    isModalOpen,
    isEditModalOpen,
    isAchievementsDrawerOpen,
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    openAchievementsDrawer,
    closeAchievementsDrawer,
  };
};
