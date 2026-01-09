import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";

const FooterWrapper = styled.footer`
  background: ${theme.colors.surface};
  border-top: 1px solid ${theme.colors.border};
  padding: ${theme.spacing["3xl"]} 0 ${theme.spacing.xl};
  margin-top: ${theme.spacing["5xl"]};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${theme.spacing["2xl"]};
  margin-bottom: ${theme.spacing["3xl"]};

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

const FooterText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${theme.spacing.md};
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: ${theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    color: ${theme.colors.primary};
  }

  &::before {
    content: "→";
    opacity: 0;
    transform: translateX(-4px);
    transition: all ${theme.transitions.fast};
  }

  &:hover::before {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ContactItem = styled.a`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${theme.transitions.fast};
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};

  &:hover {
    color: ${theme.colors.primary};
  }

  &::before {
    content: "•";
    color: ${theme.colors.primary};
    font-weight: bold;
  }
`;

const AddressText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};

  &::before {
    content: "📍";
    flex-shrink: 0;
  }
`;

const FooterBottom = styled.div`
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Copyright = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textTertiary};
  margin: 0;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const FooterBottomLink = styled(Link)`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textTertiary};
  text-decoration: none;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primaryMuted};
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.base};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.primary};
  font-weight: 600;
  margin-top: ${theme.spacing.sm};

  &::before {
    content: "✓";
    font-weight: bold;
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Container>
        <FooterGrid>
          {/* Company Info */}
          <FooterSection>
            <FooterTitle>ТОО «Центр цифровой безопасности»</FooterTitle>
            <FooterText>
              Аккредитованная лаборатория испытаний информационной безопасности.
              Профессиональные услуги анализа кода, тестирования и аудита ИБ.
            </FooterText>
            <Badge>Аккредитована НАО «НЦЭ РК»</Badge>
            <AddressText>
              улица Әлихан Бөкейхан, дом 32, кв.17, г. Астана, Казахстан
            </AddressText>
          </FooterSection>

          {/* Services */}
          <FooterSection>
            <FooterTitle>Услуги</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink to="/services/code-analysis">
                  Анализ исходного кода
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/services/security-testing">
                  Испытания ИБ
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/services/certification">
                  Сертификация
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/services/audit">
                  Аудит ИБ
                </FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          {/* Company */}
          <FooterSection>
            <FooterTitle>Компания</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink to="/about">О лаборатории</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/clients">Клиентам</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/contacts">Контакты</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          {/* Contacts */}
          <FooterSection>
            <FooterTitle>Контакты</FooterTitle>
            <ContactInfo>
              <ContactItem href="tel:+77172000000">
                +7 (7172) 000-000
              </ContactItem>
              <ContactItem href="mailto:info@digital-security-center.kz">
                info@digital-security-center.kz
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © {currentYear} ТОО «Центр цифровой безопасности». Все права защищены.
          </Copyright>
          <FooterBottomLinks>
            <FooterBottomLink to="/privacy">
              Политика конфиденциальности
            </FooterBottomLink>
            <FooterBottomLink to="/terms">
              Условия использования
            </FooterBottomLink>
          </FooterBottomLinks>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
