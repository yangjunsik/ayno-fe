import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f0f2f5;
`;

const MainContent = styled.main`
    flex: 1;
    padding: 24px;
    overflow-y: auto;
`;

const AdminLayout = () => {
    return (
        <Container>
            <AdminSidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <AdminHeader />
                <MainContent>
                    <Outlet />
                </MainContent>
            </div>
        </Container>
    );
};

export default AdminLayout;
