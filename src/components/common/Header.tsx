import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/path';
import logo from '../../assets/logo.png';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 0;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  height: 40px;
`;

const Nav = styled.nav`
  display: flex;
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
      <InnerContainer>
        <Logo to={PATH.HOME}>
          <img src={logo} alt="AYNO" width="76" height="40" style={{ objectFit: 'contain' }} />
        </Logo>
        <Nav>
          <LoginLink to={PATH.LOGIN}>로그인</LoginLink>
        </Nav>
      </InnerContainer>
    </HeaderContainer>
  );
};

export default Header;
