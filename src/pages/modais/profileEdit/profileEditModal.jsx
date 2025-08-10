// src/components/modals/ProfileEditModal/ProfileEditModal.jsx
import { X } from "lucide-react";
import { ProfileImageUploader } from "./profileImage";
import { ProfileFormSection } from "./profileForms";
import { useLabData } from "../../../context/LabDataContext";
import { useProfileEdit } from "../../../customHooks/useProfileEdit";
import "./editModal.css";

export function ProfileEditModal() {
  const { isProfileModalOpen, closeProfileModal, userProfile } = useLabData();
  const {
    formData,
    profileImage,
    errors,
    fileInputRef,
    handleChange,
    handleImageChange,
    triggerFileInput,
    handleSubmit,
  } = useProfileEdit(userProfile);

  if (!isProfileModalOpen) return null;

  return (
    <div className="modal-overlay-edit" onClick={closeProfileModal}>
      <div className="modal-content-edit" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeProfileModal}>
          <X size={24} />
        </button>

        <h1 className="modal-title">Editar Perfil</h1>

        <ProfileImageUploader
          profileImage={profileImage}
          triggerFileInput={triggerFileInput}
          fileInputRef={fileInputRef}
          handleImageChange={handleImageChange}
        />

        <ProfileFormSection
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={(e) => handleSubmit(e, closeProfileModal)}
          onCancel={closeProfileModal}
          onSave={(e) => handleSubmit(e, closeProfileModal)}
        />
      </div>
    </div>
  );
}
