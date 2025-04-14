import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { FormFieldProps } from '@/flow/types';
import classes from '../Modal.module.css';

export const ImageUpload: React.FC<FormFieldProps> = (({ form }) => {
  const { setValue, watch } = form;
  const currentImage = watch('image');

  return (
    <>
      <Dropzone
        onDrop={([file]) => setValue('image', file)}
        maxSize={15 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        mb="md"
        className={classes.dropzone}
      >
        <div className={classes.dropzoneContent}>
          <Dropzone.Accept>
            <IconUpload size={48} className={classes.dropzoneIcon} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={48} className={classes.dropzoneIcon} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={48} className={classes.dropzoneIcon} />
          </Dropzone.Idle>
          <div>
            <p className={classes.dropzoneText}>
              Перетащите изображение или нажмите для выбора
            </p>
            <p className={classes.dropzoneSubtext}>
              Разрешены файлы до 15MB (PNG, JPG, JPEG)
            </p>
          </div>
        </div>
      </Dropzone>
      {currentImage && (
        <div className={classes.imagePreview}>
          <img
            src={currentImage instanceof File ? URL.createObjectURL(currentImage) : currentImage}
            alt="Загруженное изображение"
            className={classes.image}
          />
        </div>
      )}
    </>
  );
});