import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = (({ value, onChange }) => (
  <Input
    radius='md'
    style={{
      width: '100%'
    }}
    placeholder="Поиск по названию"
    value={value}
    onChange={onChange}
    rightSection={<IconSearch size={16} />}
  />
));