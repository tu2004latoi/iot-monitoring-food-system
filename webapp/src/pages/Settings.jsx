import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Settings.css"
import { authApis, endpoints } from "../api/Apis";
const Settings = () => {
	const { user } = useAuth();
	const [form, setForm] = useState({
		username: user?.username || "",
		email: user?.email || "",
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		phone: user?.phone || "",
		avatar: user?.avatar || "",
		password: "",
		confirmPassword: "",
	});
	const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	const validateForm = () => {
		const newErrors = {};

		// Username validation
		if (!form.username.trim()) {
			newErrors.username = "Tên người dùng không được để trống";
		} else if (form.username.length < 1) {
			newErrors.username = "Tên người dùng phải có ít nhất 3 ký tự";
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!form.email.trim()) {
			newErrors.email = "Email không được để trống";
		} else if (!emailRegex.test(form.email)) {
			newErrors.email = "Email không hợp lệ";
		}

		// Phone validation
		if (form.phone && !/^\d{9,11}$/.test(String(form.phone).replace(/\s/g, ""))) {
			newErrors.phone = "Số điện thoại phải có 10-11 chữ số";
		}

		// Password validation
		if (form.password) {
			if (form.password.length < 6) {
				newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
			}
			if (form.password !== form.confirmPassword) {
				newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			// Validate file type
			const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
			if (!validTypes.includes(file.type)) {
				setErrors(prev => ({ ...prev, avatar: "Chỉ chấp nhận file ảnh (JPG, PNG, GIF)" }));
				return;
			}

			// Validate file size (5MB max)
			if (file.size > 5 * 1024 * 1024) {
				setErrors(prev => ({ ...prev, avatar: "Kích thước file không được vượt quá 5MB" }));
				return;
			}

			// Create preview
			const reader = new FileReader();
			reader.onload = (e) => {
				setAvatarPreview(e.target.result);
				setForm(prev => ({ ...prev, avatar: file }));
			};
			reader.readAsDataURL(file);

			// Clear error if exists
			if (errors.avatar) {
				setErrors(prev => ({ ...prev, avatar: "" }));
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}

		// Clear success message when form is modified
		if (successMessage) {
			setSuccessMessage("");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		setSuccessMessage("");

		try {
			const formData = new FormData();
			formData.append("firstName", form.firstName);
			formData.append("lastName", form.lastName);
			formData.append("email", form.email);
			formData.append("phone", form.phone);
			formData.append("avatar", avatarPreview);

			if (form.avatar instanceof File) {
				formData.append("file", form.avatar); // phải trùng với `u.getFile()` bên backend
			}

			if (form.password.trim()) {
				formData.append("password", form.password);
			}
			// Simulate API call
			const api = await authApis(); // API đã có token
			const response = await api.patch(endpoints.userUpdate(user.userId), formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log(response.data)
			setSuccessMessage("Cài đặt đã được lưu thành công!");

			setForm(prev => ({
				...prev,
				password: "",
				confirmPassword: ""
			}));
		} catch (error) {
			console.error("Error updating settings:", error);

			setErrors({ submit: "Có lỗi xảy ra khi lưu cài đặt. Vui lòng thử lại." });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="settings-container">
			<h2>⚙️ Cài đặt tài khoản</h2>

			{successMessage && (
				<div className="success-message" role="alert">
					✅ {successMessage}
				</div>
			)}

			{errors.submit && (
				<div className="error-message" role="alert">
					❌ {errors.submit}
				</div>
			)}

			<div className="form-section">
				<h3>Ảnh đại diện</h3>

				<div className="avatar-section">
					<div className="avatar-preview">
						{avatarPreview ? (
							<img
								src={avatarPreview}
								alt="Avatar preview"
								className="avatar-image"
							/>
						) : (
							<div className="avatar-placeholder">
								<span>📷</span>
							</div>
						)}
					</div>

					<div className="avatar-controls">
						<label className="avatar-upload-btn">
							📤 Chọn ảnh mới
							<input
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								style={{ display: 'none' }}
							/>
						</label>
						<small>
							Chấp nhận file JPG, PNG, GIF. Tối đa 5MB.
						</small>
						{errors.avatar && (
							<span className="error-text" role="alert">
								{errors.avatar}
							</span>
						)}
					</div>
				</div>
			</div>

			<div className="form-section">
				<h3>Thông tin cá nhân</h3>

				<div className="form-row">
					<label className={errors.firstName ? "error" : ""}>
						Họ:
						<input
							type="text"
							name="firstName"
							value={form.firstName}
							onChange={handleChange}
							autoComplete="given-name"
						/>
						{errors.firstName && (
							<span className="error-text" role="alert">
								{errors.firstName}
							</span>
						)}
					</label>

					<label className={errors.lastName ? "error" : ""}>
						Tên:
						<input
							type="text"
							name="lastName"
							value={form.lastName}
							onChange={handleChange}
							autoComplete="family-name"
						/>
						{errors.lastName && (
							<span className="error-text" role="alert">
								{errors.lastName}
							</span>
						)}
					</label>
				</div>

				<label className={errors.username ? "error" : ""}>
					Tên người dùng:
					<input
						type="text"
						name="username"
						value={form.username}
						onChange={handleChange}
						autoComplete="username"
						required
						disabled
					/>
					{errors.username && (
						<span className="error-text" role="alert">
							{errors.username}
						</span>
					)}
				</label>

				<label className={errors.email ? "error" : ""}>
					Email:
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						autoComplete="email"
						required
					/>
					{errors.email && (
						<span className="error-text" role="alert">
							{errors.email}
						</span>
					)}
				</label>

				<label className={errors.phone ? "error" : ""}>
					Số điện thoại:
					<input
						type="tel"
						name="phone"
						value={form.phone}
						onChange={handleChange}
						autoComplete="tel"
						placeholder="0123456789"
					/>
					{errors.phone && (
						<span className="error-text" role="alert">
							{errors.phone}
						</span>
					)}
				</label>
			</div>

			<div className="form-section">
				<h3>Bảo mật</h3>

				<label className={errors.password ? "error" : ""}>
					Mật khẩu mới:
					<input
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						placeholder="Để trống nếu không thay đổi"
						autoComplete="new-password"
					/>
					<small>
						Để trống nếu không muốn thay đổi. Mật khẩu phải có ít nhất 6 ký tự.
					</small>
					{errors.password && (
						<span className="error-text" role="alert">
							{errors.password}
						</span>
					)}
				</label>

				{form.password && (
					<label className={errors.confirmPassword ? "error" : ""}>
						Xác nhận mật khẩu:
						<input
							type="password"
							name="confirmPassword"
							value={form.confirmPassword}
							onChange={handleChange}
							autoComplete="new-password"
						/>
						{errors.confirmPassword && (
							<span className="error-text" role="alert">
								{errors.confirmPassword}
							</span>
						)}
					</label>
				)}
			</div>

			<div className="form-actions">
				<button
					type="submit"
					className="save-btn"
					disabled={isLoading}
					onClick={handleSubmit}
				>
					{isLoading ? "⏳ Đang lưu..." : "💾 Lưu thay đổi"}
				</button>
				<small>
					Nhấn để lưu tất cả thay đổi vào tài khoản của bạn
				</small>
			</div>
		</div>

	);
};

export default Settings;

