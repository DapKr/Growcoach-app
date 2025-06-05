// ProfileImageUploadModal.jsx
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import { useFormContext } from 'react-hook-form';
import getCroppedImg from '../../../utils/cropImage';
import TextButton from '../../TextButton/TextButton';
import CTAButton from '../../CTAButton/CTAButton';
import './ProfileImageUpload.css';

export default function ProfileImageUploadModal({
  name,
  fileTypes,
  maxSizeKB,
}) {
  const {
    setValue,
    formState: { errors },
    //watch,
  } = useFormContext();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef();
  const error = errors[name]?.message;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!fileTypes.includes(file.type)) {
      alert('פורמט לא נתמך.');
      return;
    }
    if (file.size > maxSizeKB * 1024) {
      alert('הקובץ גדול מדי.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowModal(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropSave = async () => {
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    const objectUrl = URL.createObjectURL(croppedBlob);
    setValue(name, croppedBlob);
    setPreviewUrl(objectUrl);
    setShowModal(false);
    setImageSrc(null);
  };

  const handleRemoveImage = () => {
    setValue(name, null);
    setPreviewUrl(null);
    setImageSrc(null);
    fileInputRef.current.value = '';
  };

  return (
    <div className="profile-image-column" dir="rtl">
      <div className="profile-image-preview">
        <img
          src={previewUrl || '/assets/avatar-placeholder.svg'}
          alt="תמונה שנבחרה"
        />
      </div>

      <div className="profile-image-actions">
        <TextButton
          color="primary"
          onClick={() => fileInputRef.current.click()}
        >
          {previewUrl ? 'החלפת תמונה' : 'הוספת תמונה'}
        </TextButton>
        {previewUrl && (
          <TextButton color="primary" onClick={handleRemoveImage}>
            הסרת תמונה
          </TextButton>
        )}
        <input
          id="imageUpload"
          ref={fileInputRef}
          type="file"
          accept={fileTypes.join(',')}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {showModal &&
        ReactDOM.createPortal(
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3>בחרי אזור לחיתוך</h3>
              <div className="cropper-modal-wrapper">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </div>
              <div
                className="crop-actions"
                style={{ flexDirection: 'column', alignItems: 'center' }}
              >
                <CTAButton size="small" onClick={handleCropSave}>
                  שמור
                </CTAButton>
                <TextButton color="primary" onClick={() => setShowModal(false)}>
                  ביטול
                </TextButton>
              </div>
            </div>
          </div>,
          document.body
        )}

      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}
