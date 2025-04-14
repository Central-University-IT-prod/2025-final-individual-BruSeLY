interface ExerciseImageProps {
  image: string | Blob;
  className: string;
}

export const ExerciseImage: React.FC<ExerciseImageProps> = (({ image, className }) => (
  <img
    src={typeof image === "string" ? image : URL.createObjectURL(image)}
    alt="Exercise demonstration"
    onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
    className={className}
  />
));