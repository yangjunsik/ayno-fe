import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/path';
import logo from '../../assets/logo_header.svg';

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

const Logo = styled.img`
  width: 56px;
  height: 15px;
  object-fit: contain;
  cursor: pointer;
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
        <Link to={PATH.HOME}>
          <Logo src={logo} alt="AYNO" />
        </Link>
        <Nav>
          <LoginLink to={PATH.LOGIN}>로그인</LoginLink>
        </Nav>
      </InnerContainer>
    </HeaderContainer>
  );
};

export default Header;
