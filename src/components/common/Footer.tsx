import styled from '@emotion/styled';
import logo from '../../assets/logo.png';

const FooterContainer = styled.footer`
  padding: 60px 0; /* Removed horizontal padding */
  background-color: #fff;
  font-size: 12px;
  color: #333;
`;

const FooterContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Logo = styled.div`
  margin-bottom: 20px;
  
  img {
    height: 24px; /* Reduced from 30px */
    object-fit: contain;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 30px;
  font-weight: 500;
`;

const Info = styled.div`
  line-height: 1.6;
  color: #666;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <TopRow>
          <Logo><img src={logo} alt="AYNO" /></Logo>
          <Links>
            <span>기업소개</span>
            <span>인스타그램</span>
            <span>이용약관</span>
            <span>광고문의</span>
            <span>개인정보 처리 방침</span>
          </Links>
        </TopRow>
        <Info>
          (주)아이노 | 대표이사 이현우<br />
          서울특별시 영등포구 여의대로 128, 트윈타워 92층 | 전화번호: 02 - 123 - 1234<br />
          사업자등록번호: 000-00-00000 | 유료직업소개사업등록번호: (국내) 제2023-1234567-23-1-00000호
        </Info>
        <Links style={{ fontSize: '11px', color: '#999', marginTop: '10px' }}>
          <span>사업제휴</span>
          <span>아이노 협업 문의</span>
          <span>마케팅 PR</span>
          <span>IR 문의</span>
        </Links>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
