import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { theme } from "../styles/GlobalStyles";

const Hero = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing["4xl"]} ${theme.spacing.xl};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse at top, rgba(0, 255, 136, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(0, 102, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
  text-align: center;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${theme.colors.primaryMuted};
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.primary};
  font-weight: 600;
  margin-bottom: ${theme.spacing.xl};
  animation: fadeIn 0.6s ease-out;

  &::before {
    content: "✓";
    font-weight: bold;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: ${theme.spacing.lg};
  letter-spacing: -0.03em;
  animation: fadeInUp 0.8s ease-out 0.2s both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  span {
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroDescription = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: ${theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto ${theme.spacing["2xl"]};
  line-height: 1.6;
  animation: fadeInUp 0.8s ease-out 0.4s both;
`;

const HeroCTA = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease-out 0.6s both;
`;

const PrimaryButton = styled(Link)`
  padding: ${theme.spacing.md} ${theme.spacing["2xl"]};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  transition: background ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryHover};
    box-shadow: ${theme.shadows.glow};
    color: ${theme.colors.text};
  }

  &::after {
    content: "→";
    display: inline-block;
    transition: transform ${theme.transitions.fast};
  }

  &:hover::after {
    transform: translateX(4px);
  }
`;

const SecondaryButton = styled(Link)`
  padding: ${theme.spacing.md} ${theme.spacing["2xl"]};
  background: transparent;
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primaryMuted};
    color: ${theme.colors.primary};
  }
`;

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${theme.spacing["5xl"]} ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing["4xl"]} ${theme.spacing.lg};
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing["2xl"]};
  letter-spacing: -0.02em;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing["3xl"]};
`;

const ServiceCard = styled(Link)`
  padding: ${theme.spacing["2xl"]};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  transition: all ${theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${theme.colors.gradientPrimary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${theme.transitions.normal};
  }

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};

    &::before {
      transform: scaleX(1);
    }
  }

  h3 {
    font-size: ${theme.fontSizes["2xl"]};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text};
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.7;
    margin-bottom: 0;
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing["3xl"]};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textSecondary};
`;

const IndexPage: React.FC = () => {
  const services = [
    {
      title: "Анализ исходного кода",
      description: "Профессиональный анализ программного кода с применением методов SAST для выявления уязвимостей и недостатков безопасности на ранних этапах разработки.",
      path: "/services/code-analysis",
    },
    {
      title: "Испытания ИБ",
      description: "Комплексное тестирование систем информационной безопасности с использованием передовых методик пентестинга и анализа защищенности.",
      path: "/services/security-testing",
    },
    {
      title: "Сертификационные испытания",
      description: "Проведение испытаний для получения сертификатов соответствия требованиям информационной безопасности РК.",
      path: "/services/certification",
    },
    {
      title: "Аудит ИБ",
      description: "Независимая экспертиза систем защиты информации, оценка соответствия стандартам и выработка рекомендаций по повышению уровня безопасности.",
      path: "/services/audit",
    },
  ];

  const stats = [
    { value: "5+", label: "Лет опыта" },
    { value: "100+", label: "Проектов" },
    { value: "50+", label: "Клиентов" },
    { value: "24/7", label: "Поддержка" },
  ];

  return (
    <Layout pathname="/">
      <SEO
        title="ТОО «Центр цифровой безопасности» — Аккредитованная лаборатория испытаний информационной безопасности"
        description="Профессиональные услуги анализа исходного кода, испытания и аудита информационной безопасности в г. Астана. Аккредитованная лаборатория с опытом работы с государственными и корпоративными заказчиками."
        keywords={[
          "анализ исходного кода",
          "испытание информационной безопасности",
          "лаборатория испытаний информационной безопасности",
          "аудит ИБ",
          "Астана",
        ]}
      />

      <Hero>
        <HeroContent>
          <Badge>Аккредитованная лаборатория НАО «НЦЭ РК»</Badge>
          <HeroTitle>
            Профессиональные испытания <span>информационной безопасности</span>
          </HeroTitle>
          <HeroDescription>
            Аккредитованная лаборатория с многолетним опытом в области анализа кода,
            тестирования систем защиты и аудита ИБ. Работаем с государственными
            и корпоративными заказчиками по всему Казахстану.
          </HeroDescription>
          <HeroCTA>
            <PrimaryButton to="/contacts">Связаться с нами</PrimaryButton>
            <SecondaryButton to="/services">Наши услуги</SecondaryButton>
          </HeroCTA>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Наши услуги</SectionTitle>
        <ServicesGrid>
          {services.map((service) => (
            <ServiceCard key={service.path} to={service.path}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>

    </Layout>
  );
};

export default IndexPage;

export const Head = () => null;
