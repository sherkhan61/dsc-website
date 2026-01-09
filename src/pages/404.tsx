import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { theme } from "../styles/GlobalStyles";

const NotFoundContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const Content = styled.div`
  max-width: 600px;
`;

const ErrorCode = styled.div`
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 700;
  line-height: 1;
  background: ${theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const Description = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing["2xl"]};
  line-height: 1.6;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing["2xl"]};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  transition: background ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.primaryHover};
    box-shadow: ${theme.shadows.glow};
  }

  &::before {
    content: "←";
    display: inline-block;
    transition: transform ${theme.transitions.fast};
  }

  &:hover::before {
    transform: translateX(-4px);
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <Layout pathname="/404">
      <SEO
        title="Страница не найдена — 404 | ЦЦБ"
        description="Запрашиваемая страница не найдена. Вернитесь на главную страницу ТОО «Центр цифровой безопасности»"
      />

      <NotFoundContainer>
        <Content>
          <ErrorCode>404</ErrorCode>
          <Title>Страница не найдена</Title>
          <Description>
            К сожалению, запрашиваемая страница не существует или была перемещена.
            Вернитесь на главную страницу или свяжитесь с нами, если считаете,
            что это ошибка.
          </Description>
          <HomeButton to="/">Вернуться на главную</HomeButton>
        </Content>
      </NotFoundContainer>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => null;
