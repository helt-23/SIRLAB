// src/components/modals/ProfileEditModal/ProfileImageUploader.jsx
import { Camera, User } from "lucide-react";

export const ProfileImageUploader = ({
  profileImage,
  triggerFileInput,
  fileInputRef,
  handleImageChange,
}) => {
  return (
    <div className="profile-image-container">
      <div className="profile-image-wrapper">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profile-image" />
        ) : (
          <div className="profile-image-placeholder">
            <User size={48} />
          </div>
        )}
        <button
          type="button"
          className="change-image-btn"
          onClick={triggerFileInput}
        >
          <Camera size={18} />
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden-input"
      />
    </div>
  );
};
