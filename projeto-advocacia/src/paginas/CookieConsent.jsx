import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './cookieConsent.css';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="cookie-content">
            <div className="cookie-text">
              <p>
                {t('cookie.texto')}{' '}
                <span>{t('cookie.politica')}</span>.
              </p>
            </div>
            <div className="cookie-actions">
              <button onClick={handleDecline} className="cookie-btn cookie-btn--secondary">
                {t('cookie.negar')}
              </button>
              <button onClick={handleAccept} className="cookie-btn">
                {t('cookie.aceitar')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;