import { Badge } from '@mantine/core';
import classes from './ExerciseCard.module.css';
import { translateDifficulty } from '@/flow/utils';
import { difficultyColors } from '@/flow/constants';
import { DifficultyLevel } from '@/flow/types';

interface ExerciseBadgesProps {
  difficulty: DifficultyLevel;
  tags: string[];
  className: string;
}

export const ExerciseBadges: React.FC<ExerciseBadgesProps> = ({ difficulty, tags, className }) => (
  <div className={className}>
    <Badge variant="filled" bg={difficultyColors[difficulty]}>
      {translateDifficulty(difficulty)}
    </Badge>
    <div className={classes.tags}>
      {tags.map(tag => (
        <Badge key={tag} variant="light" radius="sm">
          #{tag.toLowerCase()}
        </Badge>
      ))}
    </div>
  </div>
);