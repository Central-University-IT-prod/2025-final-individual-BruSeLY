import { useModals } from './hooks/useModals';
import { useShop } from './hooks/useShop';
import { useUserStore } from '../../flow/store/UserStore';
import classes from './Profile.module.css';
import { ProfileCanvas, StatsIndicator, Case, UserActions, ShopModal, EditProfileModal, ColorPicker, Achievements, CustomizationPanel } from './components';

const ProfilePage = (() => {
  const user = useUserStore((state) => state.user);
  const {
    isModalOpen,
    isEditModalOpen,
    isAchievementsDrawerOpen,
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    openAchievementsDrawer,
    closeAchievementsDrawer,
  } = useModals();

  const { handleBuyItem } = useShop();

  return (
    <div className="wrapper">
      <div className={classes.avatarView}>
        <ProfileCanvas />
        <ColorPicker />
        {user && <StatsIndicator thirst={user.thirst} hunger={user.hunger} coins={user.proteinsCoins} />}
        <CustomizationPanel />
        <Case />

        <UserActions
          onEditClick={openEditModal}
          onShopClick={openModal}
          onAchievementsClick={openAchievementsDrawer}
        />

        <ShopModal
          opened={isModalOpen}
          onClose={closeModal}
          onBuyItem={handleBuyItem}
        />
        <EditProfileModal
          opened={isEditModalOpen}
          onClose={closeEditModal}
        />
        <Achievements
          opened={isAchievementsDrawerOpen}
          onClose={closeAchievementsDrawer}
          achievements={user?.achievements || []}
        />
      </div>
    </div>
  );
});

export default ProfilePage