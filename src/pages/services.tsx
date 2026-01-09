import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { theme } from "../styles/GlobalStyles";

const PageHeader = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${theme.spacing["4xl"]} ${theme.spacing.xl} ${theme.spacing["3xl"]};
  text-align: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing["3xl"]} ${theme.spacing.lg} ${theme.spacing["2xl"]};
  }
`;

const PageTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  letter-spacing: -0.02em;
`;

const PageDescription = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
`;

const ServicesContainer = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl} ${theme.spacing["5xl"]};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.lg} ${theme.spacing["4xl"]};
  }
`;

const ServiceSection = styled.div`
  margin-bottom: ${theme.spacing["4xl"]};
  padding: ${theme.spacing["3xl"]};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing["2xl"]} ${theme.spacing.lg};
  }
`;

const ServiceTitle = styled.h2`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.text};
`;

const ServiceDescription = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${theme.spacing.xl};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${theme.spacing.xl} 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textSecondary};

  &::before {
    content: "✓";
    color: ${theme.colors.primary};
    font-weight: bold;
    font-size: ${theme.fontSizes.lg};
    flex-shrink: 0;
  }
`;

const ServiceCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  transition: background ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};

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

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: "code-analysis",
      title: "Анализ исходного кода (SAST)",
      description:
        "Статический анализ исходного кода позволяет выявить уязвимости безопасности, логические ошибки и несоответствия стандартам разработки на самых ранних этапах создания программного обеспечения.",
      features: [
        "Автоматизированный поиск уязвимостей OWASP Top 10",
        "Выявление недостатков архитектуры",
        "Проверка соответствия стандартам безопасной разработки",
        "Анализ зависимостей и компонентов третьих сторон",
        "Подробные отчеты с рекомендациями по устранению",
        "Поддержка популярных языков программирования",
      ],
    },
    {
      id: "security-testing",
      title: "Испытания информационной безопасности",
      description:
        "Комплексное тестирование систем на предмет уязвимостей с применением методов пентестинга, динамического анализа и моделирования атак.",
      features: [
        "Тестирование на проникновение (пентестинг)",
        "Динамический анализ приложений (DAST)",
        "Анализ конфигураций и настроек безопасности",
        "Тестирование сетевой инфраструктуры",
        "Моделирование реальных атак",
        "Проверка устойчивости к DDoS-атакам",
      ],
    },
    {
      id: "certification",
      title: "Сертификационные испытания",
      description:
        "Проведение испытаний для получения сертификатов соответствия требованиям информационной безопасности Республики Казахстан.",
      features: [
        "Испытания для сертификации средств защиты информации",
        "Проверка соответствия требованиям регуляторов РК",
        "Подготовка технической документации",
        "Сопровождение процесса сертификации",
        "Консультации по требованиям стандартов",
        "Оформление протоколов испытаний",
      ],
    },
    {
      id: "audit",
      title: "Аудит информационной безопасности",
      description:
        "Независимая экспертная оценка текущего состояния системы защиты информации организации с выработкой рекомендаций по повышению уровня безопасности.",
      features: [
        "Оценка соответствия требованиям законодательства РК",
        "Анализ политик и процедур ИБ",
        "Проверка организационных мер защиты",
        "Аудит технических средств защиты",
        "Gap-анализ и выработка плана улучшений",
        "Подготовка итоговых отчетов и рекомендаций",
      ],
    },
  ];

  return (
    <Layout pathname="/services">
      <SEO
        title="Услуги лаборатории — Анализ кода, Испытания, Аудит ИБ | ЦЦБ"
        description="Полный спектр услуг по информационной безопасности: анализ исходного кода, испытания ИБ, сертификационные испытания, аудит. Аккредитованная лаборатория в Астане."
        pathname="/services"
        keywords={[
          "анализ исходного кода",
          "SAST",
          "испытание информационной безопасности",
          "пентест",
          "аудит ИБ",
          "сертификация",
        ]}
      />

      <PageHeader>
        <PageTitle>Наши услуги</PageTitle>
        <PageDescription>
          Предоставляем полный спектр услуг по испытаниям и аудиту информационной
          безопасности для государственных и коммерческих организаций
        </PageDescription>
      </PageHeader>

      <ServicesContainer>
        {services.map((service) => (
          <ServiceSection key={service.id}>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <FeaturesList>
              {service.features.map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
            </FeaturesList>
            <ServiceCTA to="/contacts">Заказать услугу</ServiceCTA>
          </ServiceSection>
        ))}
      </ServicesContainer>
    </Layout>
  );
};

export default ServicesPage;

export const Head = () => null;
