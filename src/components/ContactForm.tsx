import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";
import {
  sanitizeFormData,
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  generateCSRFToken,
  RateLimiter,
  type FormData as SecurityFormData,
} from "../utils/security";
import { ContactFormData, FormState } from "../types";

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
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 
      'rgba(255, 68, 68, 0.1)' : 
      'rgba(0, 255, 136, 0.1)'};
  }

  &::placeholder {
    color: ${theme.colors.textTertiary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${props => props.$hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.base};
  font-family: ${theme.fonts.body};
  min-height: 150px;
  resize: vertical;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 
      'rgba(255, 68, 68, 0.1)' : 
      'rgba(0, 255, 136, 0.1)'};
  }

  &::placeholder {
    color: ${theme.colors.textTertiary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.error};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &::before {
    content: "⚠";
  }
`;

const SuccessMessage = styled.div`
  padding: ${theme.spacing.md};
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid ${theme.colors.success};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.success};
  font-size: ${theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &::before {
    content: "✓";
    font-weight: bold;
    font-size: ${theme.fontSizes.lg};
  }
`;

const GeneralErrorMessage = styled.div`
  padding: ${theme.spacing.md};
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid ${theme.colors.error};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.error};
  font-size: ${theme.fontSizes.sm};
`;

const SubmitButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: background ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.primaryHover};
    box-shadow: ${theme.shadows.glow};
    color: ${theme.colors.text};
  }
    
  &:hover:not(:disabled) {
    background: ${theme.colors.primaryHover};
    box-shadow: ${theme.shadows.glow};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

const HelpText = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textTertiary};
`;

// Rate limiter instance (3 submissions per minute)
const rateLimiter = new RateLimiter(3, 60000);

interface ContactFormProps {
  onSuccess?: () => void;
  submitEndpoint?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  onSuccess,
  submitEndpoint = "/api/contact" 
}) => {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errors: {},
  });

  const [csrfToken, setCsrfToken] = useState<string>("");
  const [clientId] = useState<string>(() => 
    typeof window !== "undefined" ? 
      sessionStorage.getItem("clientId") || generateCSRFToken() : 
      ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  // Generate CSRF token on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = generateCSRFToken();
      setCsrfToken(token);
      
      // Store client ID for rate limiting
      if (!sessionStorage.getItem("clientId")) {
        sessionStorage.setItem("clientId", clientId);
      }
    }
  }, [clientId]);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    // Reset states
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errors: {},
    });

    // Rate limiting check
    if (!rateLimiter.isAllowed(clientId)) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errors: {
          general: "Слишком много попыток. Пожалуйста, подождите минуту.",
        },
      });
      return;
    }

    // Client-side validation and sanitization
    const sanitizedData = sanitizeFormData({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    if (!sanitizedData) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errors: {
          general: "Пожалуйста, проверьте правильность заполнения всех полей.",
        },
      });
      return;
    }

    try {
      // In production, this would be an actual API call
      // IMPORTANT: Server-side must also validate and sanitize!
      const response = await fetch(submitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          ...sanitizedData,
          csrfToken,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки формы");
      }

      // Success
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        errors: {},
      });

      reset();
      
      // Generate new CSRF token
      setCsrfToken(generateCSRFToken());

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errors: {
          general: "Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.",
        },
      });
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        {formState.isSuccess && (
          <SuccessMessage role="alert">
            Спасибо за обращение! Мы свяжемся с вами в ближайшее время.
          </SuccessMessage>
        )}

        {formState.errors.general && (
          <GeneralErrorMessage role="alert">
            {formState.errors.general}
          </GeneralErrorMessage>
        )}

        <FormGroup>
          <Label htmlFor="name">
            Имя<span aria-label="обязательное поле">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Ваше имя"
            $hasError={!!errors.name}
            disabled={formState.isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name", {
              required: "Имя обязательно для заполнения",
              validate: (value) =>
                validateName(value) || "Введите корректное имя (минимум 2 символа)",
            })}
          />
          {errors.name && (
            <ErrorMessage id="name-error" role="alert">
              {errors.name.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">
            Email<span aria-label="обязательное поле">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@company.kz"
            $hasError={!!errors.email}
            disabled={formState.isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email", {
              required: "Email обязателен для заполнения",
              validate: (value) =>
                validateEmail(value) || "Введите корректный email адрес",
            })}
          />
          {errors.email && (
            <ErrorMessage id="email-error" role="alert">
              {errors.email.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">
            Телефон<span aria-label="обязательное поле">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+7 (7172) 000-000"
            $hasError={!!errors.phone}
            disabled={formState.isSubmitting}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error phone-help" : "phone-help"}
            {...register("phone", {
              required: "Телефон обязателен для заполнения",
              validate: (value) =>
                validatePhone(value) || "Введите корректный номер телефона",
            })}
          />
          <HelpText id="phone-help">
            Формат: +7XXXXXXXXXX или 8XXXXXXXXXX
          </HelpText>
          {errors.phone && (
            <ErrorMessage id="phone-error" role="alert">
              {errors.phone.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">
            Сообщение<span aria-label="обязательное поле">*</span>
          </Label>
          <TextArea
            id="message"
            placeholder="Опишите ваш запрос..."
            $hasError={!!errors.message}
            disabled={formState.isSubmitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error message-help" : "message-help"}
            {...register("message", {
              required: "Сообщение обязательно для заполнения",
              validate: (value) =>
                validateMessage(value) || "Сообщение должно содержать от 10 до 2000 символов",
            })}
          />
          <HelpText id="message-help">
            Минимум 10 символов
          </HelpText>
          {errors.message && (
            <ErrorMessage id="message-error" role="alert">
              {errors.message.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <SubmitButton
          type="submit"
          disabled={formState.isSubmitting}
          aria-busy={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Отправка..." : "Отправить"}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;
