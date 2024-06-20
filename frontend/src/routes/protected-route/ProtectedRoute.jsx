
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchUser } from '../../store/slices/userSlice';
function ProtectedRoute({ children, permission }) {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user?.userInfo);
    const status = useSelector((state) => state.user?.status);


    useEffect(() => {
        if (!user) {
            dispatch(fetchUser());
        }
    }, [dispatch, user]);
    const hasPermission = (permission) => {
        return user?.result?.roles?.some(role =>
            role.permissions?.some(perm => perm.name === permission)
        );
    };


    if (status === 'idle' || status === "loading") {
        return <div>Loading...</div>;
    }


    if (!user) {
        // Nếu người dùng không đăng nhập, chuyển hướng đến trang đăng nhập
        return <Navigate to="/login" />;
    }

    if (permission && !hasPermission(permission)) {
        // Nếu người dùng không có quyền truy cập, chuyển hướng đến trang không có quyền
        return <Navigate to="/no-access" />;
    }
    return children;
}

export default ProtectedRoute;