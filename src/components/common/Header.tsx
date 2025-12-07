import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/path';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  letter-spacing: 2px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const LoginLink = styled(Link)`
  font-size: 14px;
  color: #333;
  font-weight: 500;
  &:hover {
    color: #000;
  }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Logo to={PATH.HOME}>AYNO</Logo>
            <Nav>
                <LoginLink to={PATH.LOGIN}>로그인</LoginLink>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
