import React, { PureComponent } from 'react';
import { Form, Icon } from 'antd';
import { FieldProps } from 'formik';

import { FormItemProps } from 'antd/es/form';
import { UploadProps } from 'antd/es/upload';

import { getStatus } from 'components/formik/helpers';
import ImageCropModal from './ImageCropModal';
import { compressFile } from './helpers';
import { ImageUploader } from './styles';

class ImageUpload extends PureComponent<Props, State> {
  state: State = {
    loading: false,
    cropData: null,
    imageUrl: this.props.field.value,
  };

  componentDidUpdate(prevProps: Props) {
    const currentValue = this.props.field.value;
    if (prevProps.field.value !== currentValue && typeof currentValue === 'string') {
      this.setState({ imageUrl: currentValue });
    }
  }

  beforeUpload = () => {
    this.setState({ loading: true });
    return true;
  };

  cropImage = async (file: File): Promise<File> =>
    new Promise((resolve, reject) =>
      this.setState({ cropData: { file, resolve: (croppedImage: File) => resolve(croppedImage), reject } }),
    );

  handleChange = async (file: any) => {
    const { width, height } = this.props;

    file = await this.cropImage(file);
    this.setState({ cropData: null });

    file = await compressFile(file, { width, height });

    this.props.form.setFieldValue(this.props.field.name, file);

    const imageUrl = URL.createObjectURL(file);
    this.setState({ imageUrl, loading: false });
    return imageUrl; // bez tego wysypuje apke
  };

  render() {
    const { form, field, width, height, ...props } = this.props;
    const { imageUrl, cropData } = this.state;

    const errorMessage = form.touched[field.name] && form.errors[field.name];
    const help = errorMessage || props.help || undefined;
    const validateStatus = getStatus(form, errorMessage as string);

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div>Wgraj zdjęcie</div>
      </div>
    );

    return (
      <>
        <Form.Item
          label={props.label}
          required={props.required}
          validateStatus={validateStatus}
          help={help}
          colon={props.colon}
        >
          <ImageUploader
            name={field.name}
            className={props.className}
            listType="picture-card"
            showUploadList={false}
            action={this.handleChange}
            beforeUpload={this.beforeUpload}
            customRequest={() => {}}
          >
            {imageUrl ? <img src={imageUrl} alt={field.name} /> : uploadButton}
          </ImageUploader>
        </Form.Item>
        {cropData && <ImageCropModal cropData={cropData} width={width} height={height} />}
      </>
    );
  }
}

export interface Dimensions {
  width: number;
  height: number;
}

interface Props extends FormItemProps, UploadProps, FieldProps, Dimensions {
  className?: string;
}

export interface CropData {
  file: File;
  resolve: (croppedImage: File) => void;
  reject: () => void;
}

interface State {
  loading: boolean;
  imageUrl?: string;
  cropData: CropData | null;
}

export default ImageUpload;
