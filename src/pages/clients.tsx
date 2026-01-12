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

const ContentContainer = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl} ${theme.spacing["5xl"]};
`;

const ProcessSection = styled.div`
  margin-bottom: ${theme.spacing["4xl"]};
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing["2xl"]};
  color: ${theme.colors.text};
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing["3xl"]};
`;

const StepCard = styled.div`
  padding: ${theme.spacing["2xl"]};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  position: relative;
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-4px);
  }
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  background: ${theme.colors.primaryMuted};
  border: 2px solid ${theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes["2xl"]};
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const StepTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const StepDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
  margin: 0;
`;

const DocumentsSection = styled.div`
  margin-bottom: ${theme.spacing["4xl"]};
`;

const DocumentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${theme.spacing.md};
`;

const DocumentItem = styled.li`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateX(4px);
  }

  &::before {
    content: "📄";
    font-size: ${theme.fontSizes["2xl"]};
    flex-shrink: 0;
  }
`;

const DocumentText = styled.span`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textSecondary};
  flex-grow: 1;
`;

const FAQSection = styled.div`
  margin-bottom: ${theme.spacing["4xl"]};
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FAQItem = styled.div`
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
`;

const Question = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};

  &::before {
    content: "Q: ";
    color: ${theme.colors.primary};
    font-weight: 700;
  }
`;

const Answer = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
  margin: 0;

  &::before {
    content: "A: ";
    color: ${theme.colors.primary};
    font-weight: 700;
    margin-right: ${theme.spacing.xs};
  }
`;

const CTASection = styled.div`
  text-align: center;
  padding: ${theme.spacing["3xl"]};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
`;

const CTATitle = styled.h2`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.text};
`;

const CTADescription = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.7;
`;

const CTAButton = styled(Link)`
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

const ClientsPage: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Обращение",
      description: "Свяжитесь с нами любым удобным способом: телефон, email или через форму на сайте.",
    },
    {
      number: 2,
      title: "Консультация",
      description: "Обсудим ваши задачи, объем работ и согласуем техническое задание.",
    },
    {
      number: 3,
      title: "Договор",
      description: "Заключаем договор и соглашение о конфиденциальности (NDA).",
    },
    {
      number: 4,
      title: "Выполнение",
      description: "Проводим испытания в согласованные сроки с регулярным информированием о ходе работ.",
    },
    {
      number: 5,
      title: "Отчет",
      description: "Предоставляем детальный отчет с описанием найденных уязвимостей и рекомендациями.",
    },
    {
      number: 6,
      title: "Поддержка",
      description: "Оказываем консультационную поддержку по устранению выявленных проблем.",
    },
  ];

  const documents = [
    "Документы, определяющие полномочия лица, подписывающего договор",
    "Техническое задание или описание объекта испытаний",
    "Доступы к тестируемым системам (при необходимости)",
  ];

  const faqs = [
    {
      question: "Какие сроки проведения испытаний?",
      answer: "Сроки зависят от объема и сложности работ. В среднем анализ исходного кода занимает 5-10 рабочих дней, пентест — 7-14 дней. Точные сроки согласуются после анализа ТЗ.",
    },
    {
      question: "Как обеспечивается конфиденциальность?",
      answer: "Мы заключаем соглашение о неразглашении (NDA) с каждым клиентом. Все данные хранятся на защищенных серверах и удаляются после завершения проекта согласно договору.",
    },
    {
      question: "Предоставляете ли вы гарантии?",
      answer: "Мы гарантируем профессиональное выполнение работ и соответствие методикам испытаний. В случае обнаружения недочетов в отчете — проводим бесплатную ревизию.",
    },
    {
      question: "Можно ли провести испытания удаленно?",
      answer: "Да, большинство наших услуг может быть оказано удаленно. Для некоторых видов испытаний может потребоваться физический доступ к инфраструктуре.",
    },
  ];

  return (
    <Layout pathname="/clients">
      <SEO
        title="Клиентам — Процесс сотрудничества и документы | ЦЦБ"
        description="Этапы работы с лабораторией ЦЦБ: от первого обращения до получения отчета. Необходимые документы и ответы на частые вопросы."
        pathname="/clients"
        keywords={["порядок работы", "документы для испытаний", "как заказать услугу"]}
      />

      <PageHeader>
        <PageTitle>Клиентам</PageTitle>
        <PageDescription>
          Всё, что нужно знать о работе с нашей лабораторией
        </PageDescription>
      </PageHeader>

      <ContentContainer>
        <ProcessSection>
          <SectionTitle>Этапы сотрудничества</SectionTitle>
          <StepsGrid>
            {steps.map((step) => (
              <StepCard key={step.number}>
                <StepNumber>{step.number}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepCard>
            ))}
          </StepsGrid>
        </ProcessSection>

        <DocumentsSection>
          <SectionTitle>Необходимые документы</SectionTitle>
          <DocumentsList>
            {documents.map((doc, index) => (
              <DocumentItem key={index}>
                <DocumentText>{doc}</DocumentText>
              </DocumentItem>
            ))}
          </DocumentsList>
        </DocumentsSection>

        <FAQSection>
          <SectionTitle>Частые вопросы</SectionTitle>
          <FAQList>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <Question>{faq.question}</Question>
                <Answer>{faq.answer}</Answer>
              </FAQItem>
            ))}
          </FAQList>
        </FAQSection>

        <CTASection>
          <CTATitle>Готовы начать?</CTATitle>
          <CTADescription>
            Свяжитесь с нами для обсуждения вашего проекта и получения коммерческого предложения
          </CTADescription>
          <CTAButton to="/contacts">Связаться с нами</CTAButton>
        </CTASection>
      </ContentContainer>
    </Layout>
  );
};

export default ClientsPage;

export const Head = () => null;
