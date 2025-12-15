
import styled from '@emotion/styled';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAdminAuthContext } from '../../contexts/AdminAuthContext';

const HeaderContainer = styled.header`
    background: #ffffff;
    padding: 0 40px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    z-index: 5;
    position: relative;
`;

const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 1px solid #e0e0e0;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    transition: all 0.2s;

    &:hover {
        background-color: #000;
        color: #fff;
        border-color: #000;
    }
`;

const AdminHeader = () => {
    const { logout } = useAdminAuthContext();

    return (
        <HeaderContainer>
            <LogoutButton onClick={logout}>
                <FaSignOutAlt /> 로그아웃
            </LogoutButton>
        </HeaderContainer>
    );
};

export default AdminHeader;
