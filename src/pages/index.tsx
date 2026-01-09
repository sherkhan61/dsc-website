import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { theme } from "../styles/GlobalStyles";

const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing["4xl"]} ${theme.spacing.xl};
  overflow: hidden;
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
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${theme.colors.surfaceGlass};
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.primary};
  font-weight: 600;
  margin-bottom: ${theme.spacing.xl};
  animation: fadeIn 0.8s ease-out;
  box-shadow: ${theme.shadows.glow};

  &::before {
    content: "✓";
    font-weight: bold;
    font-size: ${theme.fontSizes.lg};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: ${theme.spacing.xl};
  letter-spacing: -0.04em;
  animation: fadeInUp 1s ease-out 0.2s both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  span {
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 50%, ${theme.colors.accentPurple} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    to {
      background-position: 200% center;
    }
  }
`;

const HeroDescription = styled.p`
  font-size: clamp(1.125rem, 2.5vw, 1.35rem);
  color: ${theme.colors.textSecondary};
  max-width: 750px;
  margin: 0 auto ${theme.spacing["3xl"]};
  line-height: 1.7;
  animation: fadeInUp 1s ease-out 0.4s both;
`;

const HeroCTA = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.6s both;
`;

const PrimaryButton = styled(Link)`
  padding: ${theme.spacing.md} ${theme.spacing["3xl"]};
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
  color: ${theme.colors.background};
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
  border-radius: ${theme.borderRadius.xl};
  text-decoration: none;
  transition: all ${theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentPurple} 100%);
    opacity: 0;
    transition: opacity ${theme.transitions.fast};
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${theme.shadows.glow};
    color: ${theme.colors.text};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  span {
    position: relative;
    z-index: 1;
  }

  &::after {
    content: "→";
    position: relative;
    z-index: 1;
    display: inline-block;
    transition: transform ${theme.transitions.fast};
  }

  &:hover::after {
    transform: translateX(4px);
  }
`;

const SecondaryButton = styled(Link)`
  padding: ${theme.spacing.md} ${theme.spacing["2xl"]};
  background: ${theme.colors.surfaceGlass};
  backdrop-filter: blur(20px) saturate(180%);
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  text-decoration: none;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.borderHover};
    background: ${theme.colors.surfaceHover};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${theme.spacing["5xl"]} ${theme.spacing.xl};
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing["4xl"]} ${theme.spacing.lg};
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing["3xl"]};
  letter-spacing: -0.03em;

  span {
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accentPurple} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing["2xl"]};
  margin-top: ${theme.spacing["3xl"]};
`;

const ServiceCard = styled(Link)`
  padding: ${theme.spacing["3xl"]};
  background: ${theme.colors.surfaceGlass};
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius["2xl"]};
  text-decoration: none;
  transition: all ${theme.transitions.normal};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent}, ${theme.colors.accentPurple});
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${theme.transitions.normal};
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${theme.colors.accent}15 0%, ${theme.colors.accentPurple}10 100%);
    opacity: 0;
    transition: opacity ${theme.transitions.normal};
  }

  &:hover {
    border-color: ${theme.colors.borderHover};
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.glowAccent};

    &::before {
      transform: scaleX(1);
    }

    &::after {
      opacity: 1;
    }
  }

  h3 {
    font-size: ${theme.fontSizes["2xl"]};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text};
    position: relative;
    z-index: 1;
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.7;
    margin-bottom: 0;
    position: relative;
    z-index: 1;
  }
`;

const Icon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.lg};
  background: linear-gradient(135deg, ${theme.colors.primary}20 0%, ${theme.colors.accent}20 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes["3xl"]};
  position: relative;
  z-index: 1;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing["2xl"]};
  margin-top: ${theme.spacing["4xl"]};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing["2xl"]};
  background: ${theme.colors.surfaceGlass};
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.glow};
  }
`;

const StatValue = styled.div`
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textSecondary};
  font-weight: 500;
`;

const IndexPage: React.FC = () => {
  const services = [
    {
      icon: "🔍",
      title: "Анализ исходного кода",
      description: "Профессиональный анализ программного кода с применением методов SAST для выявления уязвимостей и недостатков безопасности на ранних этапах разработки.",
      path: "/services",
    },
    {
      icon: "🛡️",
      title: "Испытания ИБ",
      description: "Комплексное тестирование систем информационной безопасности с использованием передовых методик пентестинга и анализа защищенности.",
      path: "/services",
    },
    {
      icon: "📋",
      title: "Сертификационные испытания",
      description: "Проведение испытаний для получения сертификатов соответствия требованиям информационной безопасности РК.",
      path: "/services",
    },
    {
      icon: "🔐",
      title: "Аудит ИБ",
      description: "Независимая экспертиза систем защиты информации, оценка соответствия стандартам и выработка рекомендаций по повышению уровня безопасности.",
      path: "/services",
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
            <PrimaryButton to="/contacts">
              <span>Связаться с нами</span>
            </PrimaryButton>
            <SecondaryButton to="/services">Наши услуги</SecondaryButton>
          </HeroCTA>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>
          Наши <span>услуги</span>
        </SectionTitle>
        <ServicesGrid>
          {services.map((service) => (
            <ServiceCard key={service.title} to={service.path}>
              <Icon>{service.icon}</Icon>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>

      <Section>
        <SectionTitle>
          Наши <span>достижения</span>
        </SectionTitle>
        <StatsSection>
          {stats.map((stat) => (
            <StatCard key={stat.label}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsSection>
      </Section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => null;
