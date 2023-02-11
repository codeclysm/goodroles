import { useTranslation } from 'react-i18next';
import { Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, googleAuthProvider } from '../firebase';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Grid2 from '@mui/material/Unstable_Grid2';

export default function Home() {
  // Handle authentication
  const [user, loading, error] = useAuthState(auth, {});
  if (error) {
    console.error(error);
  }

  if (loading) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <LanguageSwitcher />
      <Typography variant="h1">
        good
        <Typography component="span" color="secondary" fontSize="inherit">
          Roles
        </Typography>
      </Typography>
      {user === null && <HomeAnonymous />}
      {user !== null && <HomeLogged />}
    </Container>
  );
}

function HomeAnonymous() {
  const { t } = useTranslation();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <>
      <Typography fontSize="1.5rem" component="div">
        <ol>
          <li>{t('HomeFirstItem')} </li>
          <li>{t('HomeSecondItem')}</li>
          <li>{t('HomeThirdItem')}</li>
          <li>{t('HomeFourthItem')}</li>
        </ol>
      </Typography>
      <Button onClick={signInWithGoogle} variant="contained">
        {t('HomeLoginButton')}
      </Button>
    </>
  );
}

function HomeLogged() {
  const { t } = useTranslation();

  const [user] = useAuthState(auth, {});
  if (!user) {
    throw new Error("user shouldn't be null or undefined");
  }

  return (
    <>
      <Typography fontSize="1.5rem" component="div">
        {t('HomeWelcome', { name: user.displayName })}
      </Typography>
      <Grid2 container>
        <Grid2>
          <TextField label={t('FormGameLabel')}></TextField>
        </Grid2>
      </Grid2>
    </>
  );
}
