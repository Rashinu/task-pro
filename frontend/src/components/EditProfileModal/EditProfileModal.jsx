import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Modal } from "../Modal/Modal";
import { Icon } from "../Icon/Icon";
import { PasswordField } from "../PasswordField/PasswordField";
import { profileSchema } from "../../utils/validationSchemas";
import { updateProfile } from "../../redux/auth/authOperations";
import { selectAuthLoading, selectUser } from "../../redux/auth/authSelectors";
import formCss from "../Modal/ModalForm.module.css";
import authCss from "../AuthForm/AuthForm.module.css";
import css from "./EditProfileModal.module.css";

export const EditProfileModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);
  const fileInputRef = useRef(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarURL || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    },
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    if (values.password) {
      formData.append("password", values.password);
    }
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    const result = await dispatch(updateProfile(formData));
    if (updateProfile.fulfilled.match(result)) {
      toast.success("Profile updated");
      onClose();
    } else {
      toast.error(result.payload || "Failed to update profile");
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={formCss.title}>Edit profile</h2>

      <div className={css.avatarWrapper}>
        <button
          type="button"
          className={css.avatarButton}
          onClick={() => fileInputRef.current?.click()}
        >
          {avatarPreview ? (
            <img className={css.avatarImage} src={avatarPreview} alt="Avatar" />
          ) : (
            <Icon name="icon-user" className={css.avatarIcon} />
          )}
          <span className={css.avatarOverlay}>
            <Icon name="icon-edit" />
          </span>
        </button>
        <input
          ref={fileInputRef}
          className={css.fileInput}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </div>

      <form className={formCss.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={authCss.field}>
          <input
            className={`${authCss.input} ${errors.name ? authCss.inputError : ""}`}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && <span className={authCss.error}>{errors.name.message}</span>}
        </div>

        <div className={authCss.field}>
          <input
            className={`${authCss.input} ${errors.email ? authCss.inputError : ""}`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <span className={authCss.error}>{errors.email.message}</span>}
        </div>

        <PasswordField
          register={register}
          name="password"
          error={errors.password}
          placeholder="Password"
        />

        <button className={formCss.submit} type="submit" disabled={isLoading}>
          Save
        </button>
      </form>
    </Modal>
  );
};
