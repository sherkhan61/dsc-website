import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";
import { ContactFormData } from "../types";

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.text};

  span {
    color: ${theme.colors.error};
    margin-left: 2px;
  }
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${props => props.$hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text};
  transition: border-color ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.textTertiary};
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${props => props.$hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text};
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  transition: border-color ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.textTertiary};
  }
`;

const ErrorMessage = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.error};
`;

const SubmitButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${theme.colors.border};
    cursor: not-allowed;
    transform: none;
  }
`;

const InfoBox = styled.div`
  padding: ${theme.spacing.md};
  background: ${theme.colors.primaryMuted};
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
`;

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    setIsSubmitting(true);

    // Формируем тело письма
    const subject = encodeURIComponent(`Обращение от ${data.name}`);
    const body = encodeURIComponent(
      `Имя: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Телефон: ${data.phone || 'не указан'}\n` +
      `Компания: ${data.company || 'не указана'}\n\n` +
      `Сообщение:\n${data.message}`
    );

    // Открываем почтовый клиент
    window.location.href = `mailto:info@digisec.kz?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <FormContainer>
      <InfoBox>
        После нажатия кнопки "Отправить сообщение" откроется ваш почтовый клиент.
        Вы также можете написать нам напрямую на <strong>info@digisec.kz</strong>
      </InfoBox>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="name">
            Ваше имя<span>*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Введите ваше имя"
            $hasError={!!errors.name}
            {...register("name", {
              required: "Имя обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Имя должно содержать минимум 2 символа",
              },
              maxLength: {
                value: 100,
                message: "Имя не должно превышать 100 символов",
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">
            Email<span>*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            $hasError={!!errors.email}
            {...register("email", {
              required: "Email обязателен для заполнения",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Введите корректный email адрес",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            $hasError={!!errors.phone}
            {...register("phone", {
              pattern: {
                value: /^(\+7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
                message: "Введите корректный номер телефона",
              },
            })}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="company">Компания</Label>
          <Input
            id="company"
            type="text"
            placeholder="Название вашей компании"
            {...register("company")}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">
            Сообщение<span>*</span>
          </Label>
          <TextArea
            id="message"
            placeholder="Опишите ваш вопрос или запрос..."
            $hasError={!!errors.message}
            {...register("message", {
              required: "Сообщение обязательно для заполнения",
              minLength: {
                value: 10,
                message: "Сообщение должно содержать минимум 10 символов",
              },
              maxLength: {
                value: 2000,
                message: "Сообщение не должно превышать 2000 символов",
              },
            })}
          />
          {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Открытие почтового клиента..." : "Отправить сообщение"}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;
