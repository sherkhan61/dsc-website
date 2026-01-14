import React from "react";
import { Helmet } from "react-helmet";

/**
 * Analytics Component
 * Integrates Google Analytics and Yandex Metrika for tracking website visitors
 *
 * Setup Instructions:
 * 1. Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID
 * 2. Replace '00000000' with your actual Yandex Metrika counter ID
 * 3. Both can be obtained from respective analytics dashboards
 *
 * Note: Analytics will not be enabled until real IDs are configured
 */

const Analytics: React.FC = () => {
  // Google Analytics 4 Measurement ID
  // Get yours at: https://analytics.google.com/
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your GA4 ID

  // Yandex Metrika Counter ID
  // Get yours at: https://metrika.yandex.ru/
  const YM_COUNTER_ID = "00000000"; // Replace with your Yandex Metrika ID

  // Check if IDs are configured (not placeholders)
  const isGAConfigured = GA_MEASUREMENT_ID && !GA_MEASUREMENT_ID.includes("XXXX");
  const isYMConfigured = YM_COUNTER_ID && YM_COUNTER_ID !== "00000000" && /^\d+$/.test(YM_COUNTER_ID);

  // Don't render analytics scripts if IDs are not configured
  if (!isGAConfigured && !isYMConfigured) {
    return null;
  }

  return (
    <Helmet>
      {/* Google Analytics 4 */}
      {isGAConfigured && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </script>
        </>
      )}

      {/* Yandex Metrika */}
      {isYMConfigured && (
        <>
          <script type="text/javascript">
            {`
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                k.async=1;k.src=r;a.parentNode.insertBefore(k,a)
              })
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${YM_COUNTER_ID}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `}
          </script>

          {/* Yandex Metrika noscript */}
          <noscript>
            {`<div><img src="https://mc.yandex.ru/watch/${YM_COUNTER_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`}
          </noscript>
        </>
      )}
    </Helmet>
  );
};

export default Analytics;
