
import styled from '@emotion/styled';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAdminAuthContext } from '../../contexts/AdminAuthContext';

const HeaderContainer = styled.header`
    background: #ffffff;
    padding: 0 22px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    z-index: 5;
    position: relative;
`;

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

const WelcomeText = styled.span`
    font-size: 15px;
    color: #333;
    font-weight: 500;
    
    strong {
        font-weight: 700;
    }
`;

const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    color: #888;
    transition: all 0.2s;
    font-weight: 500;

    &:hover {
        color: #d32f2f;
    }
`;

const AdminHeader = () => {
    const { adminUser, logout } = useAdminAuthContext();

    return (
        <HeaderContainer>
            <ProfileSection>
                <WelcomeText>
                    안녕하세요, <strong>{adminUser?.adminName || '관리자'}</strong>님
                </WelcomeText>
                <LogoutButton onClick={logout}>
                    <FaSignOutAlt /> 로그아웃
                </LogoutButton>
            </ProfileSection>
        </HeaderContainer>
    );
};

export default AdminHeader;
