import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { theme } from "../styles/GlobalStyles";

const PageHeader = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${theme.spacing["4xl"]} ${theme.spacing.xl} ${theme.spacing["3xl"]};
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  letter-spacing: -0.02em;
`;

const ContentContainer = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl} ${theme.spacing["5xl"]};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.lg} ${theme.spacing["4xl"]};
  }
`;

const ContentSection = styled.div`
  margin-bottom: ${theme.spacing["4xl"]};
  padding: ${theme.spacing["3xl"]};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing["2xl"]} ${theme.spacing.lg};
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.text};
`;

const Paragraph = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${theme.spacing.xl} 0;
  display: grid;
  gap: ${theme.spacing.md};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;

  &::before {
    content: "✓";
    color: ${theme.colors.primary};
    font-weight: bold;
    font-size: ${theme.fontSizes.xl};
    flex-shrink: 0;
  }
`;

const HighlightBox = styled.div`
  padding: ${theme.spacing.xl};
  background: ${theme.colors.primaryMuted};
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing.xl} 0;
`;

const HighlightText = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  font-weight: 600;
  line-height: 1.6;
  margin: 0;
  text-align: center;
`;

const ValuesContainer = styled.div`
  margin-top: ${theme.spacing.xl};
  overflow: hidden;
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    overflow: visible;
  }
`;

const ValuesTrack = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
  animation: scroll 30s linear infinite;
  width: fit-content;

  /* Pause animation on hover */
  &:hover {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% - ${theme.spacing.xl}));
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};

  @media (min-width: calc(${theme.breakpoints.tablet} + 1px)) {
    display: none;
  }
`;

const ValueCard = styled.div`
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surfaceGlass};
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  transition: all ${theme.transitions.normal};
  min-width: 280px;
  flex-shrink: 0;

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.glow};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-width: unset;
    width: 100%;
  }
`;

const ValueIcon = styled.div`
  font-size: ${theme.fontSizes["4xl"]};
  margin-bottom: ${theme.spacing.md};
`;

const ValueTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const ValueText = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: "🔒",
      title: "Конфиденциальность",
      text: "Строгое соблюдение NDA и защита данных клиентов",
    },
    {
      icon: "⚡",
      title: "Профессионализм",
      text: "Команда сертифицированных специалистов с многолетним опытом",
    },
    {
      icon: "🎯",
      title: "Качество",
      text: "Высокие стандарты выполнения работ и детализированные отчеты",
    },
    {
      icon: "🤝",
      title: "Партнерство",
      text: "Долгосрочное сотрудничество и постоянная поддержка",
    },
  ];

  return (
    <Layout pathname="/about">
      <SEO
        title="О нас — ТОО «Центр цифровой безопасности»"
        description="Аккредитованная лаборатория испытаний информационной безопасности с многолетним опытом работы. Команда профессионалов, современное оборудование, высокие стандарты качества."
        pathname="/about"
        keywords={[
          "о нас",
          "о лаборатории",
          "аккредитованная лаборатория",
          "испытания ИБ Астана",
          "команда экспертов",
        ]}
      />

      <PageHeader>
        <PageTitle>О нас</PageTitle>
      </PageHeader>

      <ContentContainer>
        <ContentSection>
          <SectionTitle>Кто мы</SectionTitle>
          <Paragraph>
            ТОО «Центр цифровой безопасности» — это аккредитованная лаборатория испытаний
            информационной безопасности, специализирующаяся на профессиональном анализе
            защищенности программного обеспечения и информационных систем.
          </Paragraph>
          <Paragraph>
            Наша лаборатория получила аккредитацию НАО «Национальный центр экспертизы
            Республики Казахстан», что подтверждает высокий уровень компетенции и соответствие
            международным стандартам качества в области информационной безопасности.
          </Paragraph>
          <HighlightBox>
            <HighlightText>
              Мы помогаем организациям обеспечивать надежную защиту критически важных
              информационных активов и соответствовать требованиям законодательства РК
            </HighlightText>
          </HighlightBox>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Наш опыт</SectionTitle>
          <Paragraph>
            За годы работы мы реализовали более 100 проектов для государственных учреждений,
            банков, телекоммуникационных компаний и других организаций, работающих с критически
            важной информацией.
          </Paragraph>
          <FeaturesList>
            <FeatureItem>
              Опыт работы с системами различного масштаба и уровня критичности
            </FeatureItem>
            <FeatureItem>
              Глубокая экспертиза в области анализа исходного кода и тестирования на проникновение
            </FeatureItem>
            <FeatureItem>
              Знание специфики государственных и коммерческих организаций
            </FeatureItem>
            <FeatureItem>
              Успешный опыт сопровождения процессов сертификации
            </FeatureItem>
            <FeatureItem>
              Постоянное обновление методик в соответствии с актуальными угрозами
            </FeatureItem>
          </FeaturesList>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Компетенции и методологии</SectionTitle>
          <Paragraph>
            Наши специалисты обладают международными сертификациями и применяют передовые
            методологии тестирования безопасности:
          </Paragraph>
          <FeaturesList>
            <FeatureItem>
              OWASP Testing Guide — для тестирования веб-приложений
            </FeatureItem>
            <FeatureItem>
              PTES (Penetration Testing Execution Standard) — для пентестинга
            </FeatureItem>
            <FeatureItem>
              NIST Cybersecurity Framework — для оценки зрелости ИБ
            </FeatureItem>
            <FeatureItem>
              ISO/IEC 27001 — для аудита систем менеджмента ИБ
            </FeatureItem>
            <FeatureItem>
              CWE/SANS Top 25 — для анализа исходного кода
            </FeatureItem>
          </FeaturesList>
          <Paragraph>
            Мы используем как коммерческие, так и open-source инструменты анализа,
            что позволяет обеспечить максимальную полноту и объективность проверок.
          </Paragraph>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Наши ценности</SectionTitle>
          {/* Desktop: Animated scrolling */}
          <ValuesContainer>
            <ValuesTrack>
              {/* Original cards */}
              {values.map((value, index) => (
                <ValueCard key={`original-${index}`}>
                  <ValueIcon>{value.icon}</ValueIcon>
                  <ValueTitle>{value.title}</ValueTitle>
                  <ValueText>{value.text}</ValueText>
                </ValueCard>
              ))}
              {/* Duplicate cards for seamless loop */}
              {values.map((value, index) => (
                <ValueCard key={`duplicate-${index}`}>
                  <ValueIcon>{value.icon}</ValueIcon>
                  <ValueTitle>{value.title}</ValueTitle>
                  <ValueText>{value.text}</ValueText>
                </ValueCard>
              ))}
            </ValuesTrack>
          </ValuesContainer>

          {/* Mobile: Static grid */}
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard key={index}>
                <ValueIcon>{value.icon}</ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueText>{value.text}</ValueText>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Почему выбирают нас</SectionTitle>
          <FeaturesList>
            <FeatureItem>
              Официальная аккредитация и соответствие требованиям регуляторов РК
            </FeatureItem>
            <FeatureItem>
              Высокая квалификация специалистов с профильным образованием и сертификациями
            </FeatureItem>
            <FeatureItem>
              Использование современных методик и инструментов анализа
            </FeatureItem>
            <FeatureItem>
              Детализированные отчеты с практическими рекомендациями
            </FeatureItem>
            <FeatureItem>
              Конфиденциальность и строгое соблюдение NDA
            </FeatureItem>
            <FeatureItem>
              Индивидуальный подход к каждому проекту
            </FeatureItem>
            <FeatureItem>
              Сопровождение после завершения работ и консультационная поддержка
            </FeatureItem>
          </FeaturesList>
        </ContentSection>
      </ContentContainer>
    </Layout>
  );
};

export default AboutPage;

export const Head = () => null;
