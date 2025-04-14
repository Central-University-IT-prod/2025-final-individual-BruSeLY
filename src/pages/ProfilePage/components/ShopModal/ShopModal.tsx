import { useState } from 'react';
import { Modal, Group, Text, Card, Flex } from '@mantine/core';
import { IconApple, IconDroplet, IconMeat } from '@tabler/icons-react';
import classes from './ShopModal.module.css';
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal';

interface ShopModalProps {
  opened: boolean;
  onClose: () => void;
  onBuyItem: (item: any) => void;
}

const items = [
  { id: 'water', name: 'Вода', type: 'жажды', icon: <IconDroplet size={24} color='white'/>, cost: 10, value: 5 },
  { id: 'apple', name: 'Яблоко', type: 'голода', icon: <IconApple size={24} color='white'/>, cost: 20, value: 5 },
  { id: 'meat', name: 'Мясо', type: 'голода', icon: <IconMeat size={24} color='white'/>, cost: 30, value: 10 },
];

const ShopModal: React.FC<ShopModalProps> = ({ opened, onClose, onBuyItem }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleConfirm = () => {
    if (selectedItem) {
      onBuyItem(selectedItem);
      setSelectedItem(null);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Магазин"
        size="xl"
        radius="md"
        centered
        className={classes.shopModal}
        styles={{
          title: { fontSize: '1.25rem', fontWeight: 600 },
          body: { borderRadius: '12px' },
        }}
      >
        <Group gap="md" align="stretch">
          {items.map((item) => (
            <Card
              key={item.id}
              padding="lg"
              radius="md"
              className={classes.shopItem}
              onClick={() => setSelectedItem(item)}
              styles={{
                root: {
                  backgroundColor: '#6015bd',
                  border: '1px solid #6C5B7B',
                },
              }}
            >
              <Group align="center" justify="space-between" gap="sm">
                <Flex gap={8} align='center'>
                  {item.icon}
                  <Text size="sm" c='white' fw={500}>
                    {item.name}
                  </Text>
                </Flex>
                <Text c='white'>
                  + {item.value} % утолению {item.type}
                </Text>
              </Group>
              <Text size="sm" c="white" mt="sm">
                Цена: {item.cost} монет
              </Text>
            </Card>
          ))}
        </Group>
      </Modal>
      <ConfirmModal
        opened={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onSubmit={handleConfirm}
        text={`Вы уверены, что хотите купить ${selectedItem?.name} за ${selectedItem?.cost} монет?`}
      />
    </>
  );
};

export default ShopModal;