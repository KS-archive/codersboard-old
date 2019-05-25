import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import ReactCrop, { Crop } from 'react-image-crop';
import { CropData } from '.';

import 'react-image-crop/dist/ReactCrop.css';

class ImageCropModal extends PureComponent<Props, State> {
  image: any;
  state = {
    crop: {
      x: 0,
      y: 0,
      width: this.props.width,
      height: this.props.height,
      aspect: this.props.width / this.props.height,
    },
    visible: true,
  };

  getCroppedImg = async () => {
    const { crop } = this.state;
    const { file } = this.props.cropData;

    const canvas = document.createElement('canvas');
    const scaleX = this.image.naturalWidth / this.image.width;
    const scaleY = this.image.naturalHeight / this.image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      this.image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );

    canvas.toBlob(blob => {
      const newFile = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });

      this.setState({ visible: false }, () => {
        setTimeout(() => this.props.cropData.resolve(newFile), 300);
      });
    }, file.type);
  };

  onImageLoaded = (image: any) => {
    this.image = image;
  };

  onChange = (crop: Crop) => this.setState({ crop });

  render() {
    const onCancel = this.props.cropData ? this.props.cropData.reject : () => {};

    return (
      <Modal title="Przytnij zdjęcie" visible={this.state.visible} onOk={this.getCroppedImg} onCancel={onCancel}>
        {this.props.cropData && (
          <ReactCrop
            src={URL.createObjectURL(this.props.cropData.file)}
            crop={this.state.crop}
            onChange={this.onChange}
            onImageLoaded={this.onImageLoaded}
          />
        )}
      </Modal>
    );
  }
}

interface Props {
  width: number;
  height: number;
  cropData: CropData | null;
}

interface State {
  crop: Crop;
  visible: boolean;
}

export default ImageCropModal;
