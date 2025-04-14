import { Badge, Group } from '@mantine/core';
import classes from './WorkoutCard.module.css';

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => (
  <Group gap={4} className={classes.tags}>
    {tags.map(tag => (
      <Badge key={tag} variant="outline" radius="sm" className={classes.tag}>
        #{tag.toLowerCase()}
      </Badge>
    ))}
  </Group>
);

export default TagList