
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaChartPie, FaTags, FaUserTie, FaTools, FaExclamationTriangle, FaUsers } from 'react-icons/fa';

const SidebarContainer = styled.aside`
    width: 280px;
    background-color: #1a1a1a;
    color: #e0e0e0;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    box-shadow: 4px 0 24px rgba(0,0,0,0.4);
    z-index: 10;
`;

const Logo = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 32px;
    font-size: 24px;
    font-weight: 800;
    background-color: #1a1a1a;
    color: #ffffff;
    letter-spacing: -0.5px;
    border-bottom: 1px solid #333;
`;

const Menu = styled.nav`
    flex: 1;
    padding: 32px 16px;
`;

const MenuItem = styled(Link) <{ active?: boolean }>`
    display: flex;
    align-items: center;
    padding: 16px 20px;
    color: ${props => props.active ? '#ffffff' : '#888888'};
    background-color: ${props => props.active ? '#333333' : 'transparent'};
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 16px;
    font-weight: ${props => props.active ? '600' : '500'};
    margin-bottom: 8px;
    border-radius: 12px;
    box-shadow: ${props => props.active ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'};

    &:hover {
        color: #ffffff;
        background-color: ${props => props.active ? '#333333' : '#252525'};
        transform: translateX(4px);
    }

    svg {
        margin-right: 16px;
        font-size: 20px;
        color: ${props => props.active ? '#ffffff' : '#666666'};
    }
`;

const SectionTitle = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: #666;
    margin: 24px 0 12px 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const AdminSidebar = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === '/admin' && location.pathname === '/admin') return true;
        if (path !== '/admin' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <SidebarContainer>
            <Logo>Admin Console</Logo>
            <Menu>
                <MenuItem to="/admin" active={isActive('/admin')}>
                    <FaChartPie /> Dashboard
                </MenuItem>

                <SectionTitle>Resources</SectionTitle>
                <MenuItem to="/admin/interests" active={isActive('/admin/interests')}>
                    <FaTags /> Interests
                </MenuItem>
                <MenuItem to="/admin/jobs" active={isActive('/admin/jobs')}>
                    <FaUserTie /> Job Roles
                </MenuItem>
                <MenuItem to="/admin/tools" active={isActive('/admin/tools')}>
                    <FaTools /> Tools
                </MenuItem>

                <SectionTitle>Management</SectionTitle>
                <MenuItem to="/admin/reports" active={isActive('/admin/reports')}>
                    <FaExclamationTriangle /> Reports
                </MenuItem>
                <MenuItem to="/admin/users" active={isActive('/admin/users')}>
                    <FaUsers /> Users
                </MenuItem>
            </Menu>
        </SidebarContainer>
    );
};

export default AdminSidebar;
