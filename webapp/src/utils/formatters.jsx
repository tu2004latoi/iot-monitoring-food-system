export const formatPrice = (price) => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND'
	}).format(price);
};

export const formatNumber = (number) => {
	return new Intl.NumberFormat('vi-VN').format(number);
};

// export const formatDate = (dateStr) => {
// 	if (!dateStr) return "";
// 	const d = new Date(dateStr);
// 	if (isNaN(d)) return ""; // nếu ngày không hợp lệ
// 	return d.toISOString().split("T")[0]; // lấy yyyy-mm-dd
// };
// export const formatDate = (dateStr) => {
// 	if (!dateStr) return "";
// 	// Nếu đang ở dạng dd/MM/yyyy → chuyển sang yyyy-MM-dd
// 	if (dateStr.includes("/")) {
// 		const [day, month, year] = dateStr.split("/");
// 		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
// 	}
// 	return dateStr; // Nếu đã là yyyy-MM-dd thì dùng luôn
// };

export const formatDate = (dateStr) => {
	if (!dateStr) return "";

	// Nếu là dạng có thời gian (dd/MM/yyyy HH:mm:ss)
	const hasTime = dateStr.includes(" ");
	const rawDate = hasTime ? dateStr.split(" ")[0] : dateStr;

	const [day, month, year] = rawDate.split("/");

	// Kiểm tra đầu vào hợp lệ
	if (!day || !month || !year) return "";

	// Trả về đúng định dạng yyyy-MM-dd
	return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
