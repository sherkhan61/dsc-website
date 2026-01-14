import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ContactForm from "../components/ContactForm";
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
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
`;

const ContactsContainer = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl} ${theme.spacing["5xl"]};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.lg} ${theme.spacing["4xl"]};
  }
`;

const ContactsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing["4xl"]};
  align-items: start;

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing["3xl"]};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing["2xl"]};
`;

const InfoBlock = styled.div`
  padding: ${theme.spacing["2xl"]};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const InfoTitle = styled.h2`
  font-size: ${theme.fontSizes["2xl"]};
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.text};
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const InfoItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const InfoLabel = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textTertiary};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const InfoValue = styled.a`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text};
  text-decoration: none;
  transition: color ${theme.transitions.fast};
  display: inline-block;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const AddressText = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text};
  line-height: 1.7;
  margin: 0;
`;

const FormContainer = styled.div`
  padding: ${theme.spacing["2xl"]};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};

  h2 {
    font-size: ${theme.fontSizes["2xl"]};
    font-weight: 700;
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.text};
  }
`;

const WorkingHours = styled.div`
  padding: ${theme.spacing.lg};
  background: ${theme.colors.primaryMuted};
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  margin-top: ${theme.spacing.lg};
`;

const WorkingHoursTitle = styled.h3`
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const WorkingHoursText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`;

const ContactsPage: React.FC = () => {
  return (
    <Layout pathname="/contacts">
      <SEO
        title="Контакты — ТОО «Центр цифровой безопасности» | Астана"
        description="Свяжитесь с нами для заказа услуг информационной безопасности. Адрес: ул. Әлихан Бөкейхан, дом 32, г. Астана. Телефон: +7 (702) 214-00-02"
        pathname="/contacts"
        keywords={[
          "контакты лаборатории",
          "лаборатория испытаний Астана",
          "связаться ЦЦБ",
        ]}
      />

      <PageHeader>
        <PageTitle>Связаться с нами</PageTitle>
        <PageDescription>
          Готовы ответить на ваши вопросы и обсудить детали сотрудничества
        </PageDescription>
      </PageHeader>

      <ContactsContainer>
        <ContactsGrid>
          <ContactInfo>
            <InfoBlock>
              <InfoTitle>Контактная информация</InfoTitle>
              <InfoList>
                <InfoItem>
                  <InfoLabel>Телефон</InfoLabel>
                  <InfoValue href="tel:+77022140002">
                    +7 (702) 214-00-02
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue href="mailto:info@digisec.kz">
                    info@digisec.kz
                  </InfoValue>
                </InfoItem>
              </InfoList>

              <WorkingHours>
                <WorkingHoursTitle>График работы</WorkingHoursTitle>
                <WorkingHoursText>
                  Понедельник - Пятница: 09:00 - 18:00<br />
                  Суббота - Воскресенье: Выходной
                </WorkingHoursText>
              </WorkingHours>
            </InfoBlock>

            <InfoBlock>
              <InfoTitle>Юридический адрес</InfoTitle>
              <AddressText>
                ТОО «Центр цифровой безопасности»<br />
                улица Әлихан Бөкейхан, дом 32<br />
                г. Астана, 010000<br />
                Республика Казахстан
              </AddressText>
            </InfoBlock>
          </ContactInfo>

          <FormContainer>
            <h2>Оставьте заявку</h2>
            <ContactForm
              onSuccess={() => {
                console.log("Form submitted successfully");
              }}
            />
          </FormContainer>
        </ContactsGrid>
      </ContactsContainer>
    </Layout>
  );
};

export default ContactsPage;

export const Head = () => null;
