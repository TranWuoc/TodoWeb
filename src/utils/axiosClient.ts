import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status = error.response?.status;

        switch (status) {
            case 400:
                console.warn('⚠️Bad Request: Dữ liệu gửi lên không hợp lệ');
                break;
            case 401:
                console.warn('🔒 Unauthorized: Token không hợp lệ hoặc đã hết hạn');
                window.location.href = '/auth';
                break;
            case 403:
                console.warn('⛔ Forbidden: Không có quyền truy cập');
                alert('Bạn không có quyền thực hiện hành động này.');
                break;
            case 404:
                console.warn('❓ Not Found: API không tồn tại');
                break;
            case 500:
                console.error('💥 Server Error: Lỗi máy chủ');
                alert('Có lỗi xảy ra từ phía server. Vui lòng thử lại sau.');
                break;
            default:
                console.error('❌ Error:', error.response?.data || error.message);
                break;
        }

        return Promise.reject(error);
    },
);

export default axiosClient;
