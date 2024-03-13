import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../functions/auth';

const AdminRoute = ({ children }) => {
    const user = useSelector(state => state.user); // เลือกเฉพาะ state.user
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then(res => {
                    setOk(true);
                }).catch(err => {
                    console.log(err);
                    setOk(false);
                });
        }
    }, [user]);

    const memoizedChildren = useMemo(() => {
        return ok ? children : <LoadingToRedirect />;
    }, [ok, children]);

    return memoizedChildren;
};

export default AdminRoute;
