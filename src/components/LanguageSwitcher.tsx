import React from 'react';
import { Button, ButtonGroup, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const isActive = (language: string) =>  i18n.language === language;

  const changeLanguage = (language: string) => async () => {
    await i18n.changeLanguage(language);
  };

  return (
    <Container disableGutters>
      <ButtonGroup
        color="secondary"
        disableElevation
        variant="text"
        aria-label="outlined primary button group"
      >
        <Button onClick={changeLanguage('it')} sx={{
          color: isActive('it') ? "primary" : "black"
        }}>IT</Button>
        <Button onClick={changeLanguage('en')} sx={{
          color: isActive('en') ? "primary" : "black"
        }}>EN</Button>
      </ButtonGroup>
    </Container>
  );
}
