import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { SEOProps } from "../types";

/**
 * SEO Component
 * Manages meta tags, structured data, and Open Graph tags
 * Implements best practices for search engine optimization
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  pathname = "",
  image,
  article = false,
  keywords = [],
}) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          keywords
          organization {
            name
            address {
              streetAddress
              addressLocality
              addressCountry
              postalCode
            }
            contactPoint {
              telephone
              email
              contactType
            }
          }
        }
      }
    }
  `);

  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    keywords: defaultKeywords,
    organization,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname}`,
    image: image || `${siteUrl}/og-image.png`,
    keywords: [...defaultKeywords, ...keywords].join(", "),
  };

  // Structured Data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: seo.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: organization.address.streetAddress,
      addressLocality: organization.address.addressLocality,
      addressCountry: organization.address.addressCountry,
      postalCode: organization.address.postalCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: organization.contactPoint.telephone,
      email: organization.contactPoint.email,
      contactType: organization.contactPoint.contactType,
      availableLanguage: ["ru", "kk"],
    },
    areaServed: {
      "@type": "Country",
      name: "Kazakhstan",
    },
    knowsAbout: [
      "Information Security",
      "Code Analysis",
      "Security Testing",
      "Security Audit",
      "Penetration Testing",
      "SAST",
      "DAST",
    ],
  };

  // Structured Data for LocalBusiness
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: organization.name,
    image: `${siteUrl}/logo.png`,
    "@id": siteUrl,
    url: siteUrl,
    telephone: organization.contactPoint.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: organization.address.streetAddress,
      addressLocality: organization.address.addressLocality,
      addressCountry: organization.address.addressCountry,
      postalCode: organization.address.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.1694,
      longitude: 71.4491,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: siteUrl,
      },
    ],
  };

  if (pathname && pathname !== "/") {
    const pathParts = pathname.split("/").filter(Boolean);
    pathParts.forEach((part, index) => {
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        position: index + 2,
        name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
        item: `${siteUrl}/${pathParts.slice(0, index + 1).join("/")}`,
      });
    });
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="ru" />
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={organization.name} />
      <link rel="canonical" href={seo.url} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={organization.name} />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#0a0a0a" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google" content="notranslate" />

      {/* Security Headers (meta tags) */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
