import { useTranslation } from 'react-i18next';
import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, googleAuthProvider } from '../firebase';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Logo from '../components/Logo';
import RolesList from '../components/RolesList';
import RolesAdd from '../components/RolesAdd';
import RolesPieChart from '../components/RolesPieChart';
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

  if (user === null) {
    return <HomeAnonymous />;
  }

  return <HomeLogged />;
}

function HomeAnonymous() {
  const { t } = useTranslation();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <Container maxWidth="sm">
      <LanguageSwitcher />
      <Logo />
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
    </Container>
  );
}

function HomeLogged() {
  const { t } = useTranslation();

  const [user] = useAuthState(auth, {});
  if (!user) {
    throw new Error("user shouldn't be null or undefined");
  }

  return (
    <Container maxWidth="lg">
      <LanguageSwitcher />
      <Logo />
      <Typography fontSize="1.5rem" component="div">
        {t('HomeWelcome', { name: user.displayName })}
      </Typography>
      <Typography fontSize="1.5rem" component="div">
        {t('HomeInsertGame')}
      </Typography>
      <Grid2 container>
        <Grid2 xs={12}>
          <RolesAdd />
        </Grid2>
        <Grid2 xs={7}>
          <RolesList />
        </Grid2>
        <Grid2 xs={5}>
          <RolesPieChart />
        </Grid2>
      </Grid2>
    </Container>
  );
}
