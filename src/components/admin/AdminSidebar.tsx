import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaTachometerAlt, FaTags, FaBriefcase, FaTools, FaExclamationTriangle, FaUsers, FaLayerGroup } from 'react-icons/fa';

const SidebarContainer = styled.aside`
    width: 280px;
    background: #1a1a1a;
    color: #fff;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const Logo = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 24px;
    font-size: 24px;
    font-weight: 700;
    background: #1a1a1a;
    color: #fff;
    letter-spacing: -0.5px;
    border-bottom: 1px solid #333;
`;

const Menu = styled.nav`
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const MenuItem = styled(Link) <{ active?: boolean }>`
    display: flex;
    align-items: center;
    padding: 14px 16px;
    background: ${props => props.active ? '#333' : 'transparent'};
    color: ${props => props.active ? '#fff' : '#aaa'};
    text-decoration: none;
    transition: all 0.2s ease;
    border-radius: 8px;
    font-size: 15px;
    font-weight: ${props => props.active ? '600' : '500'};
    margin-bottom: 4px;

    &:hover {
        background: #333;
        color: #fff;
        transform: translateX(4px);
    }

    svg {
        margin-right: 12px;
        font-size: 18px;
        color: ${props => props.active ? '#fff' : '#888'};
    }
`;

const SectionTitle = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 24px 16px 8px 16px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1.2px;
`;

const AdminSidebar = () => {
    const location = useLocation();

    return (
        <SidebarContainer>
            <Logo>AYNO Admin</Logo>
            <Menu>
                <MenuItem to="/admin" active={location.pathname === '/admin'}>
                    <FaTachometerAlt /> Dashboard
                </MenuItem>

                <SectionTitle>Resources</SectionTitle>
                <MenuItem to="/admin/interests" active={location.pathname === '/admin/interests'}>
                    <FaTags /> Interests
                </MenuItem>
                <MenuItem to="/admin/jobs" active={location.pathname === '/admin/jobs'}>
                    <FaBriefcase /> Job Roles
                </MenuItem>
                <MenuItem to="/admin/tools" active={location.pathname === '/admin/tools'}>
                    <FaTools /> Tools
                </MenuItem>

                <SectionTitle>Management</SectionTitle>
                <MenuItem to="/admin/reports" active={location.pathname === '/admin/reports'}>
                    <FaExclamationTriangle /> Reports
                </MenuItem>
                <MenuItem to="/admin/users" active={location.pathname === '/admin/users'}>
                    <FaUsers /> Users
                </MenuItem>
                <MenuItem to="/admin/artifacts" active={location.pathname === '/admin/artifacts'}>
                    <FaLayerGroup /> Artifacts
                </MenuItem>
            </Menu>
        </SidebarContainer>
    );
};

export default AdminSidebar;
