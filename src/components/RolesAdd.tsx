import React, { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'dayjs/locale/it';

import { auth, firestore } from '../firebase';

export default function RolesAdd() {
  const { t, i18n } = useTranslation();

  const [date, setDate] = useState(dayjs());
  const [game, setGame] = useState('');
  const [comments, setComments] = useState('');

  const [user] = useAuthState(auth, {});
  if (!user) {
    throw new Error("user shouldn't be null or undefined");
  }

  // Handle firestore
  const ref = collection(firestore, 'roles');
  const saveRole = async () => {
    try {
      await addDoc(ref, {
        uid: user.uid,
        date: date.toDate(),
        game,
        comments,
      });
    } catch (e) {
      console.debug(e);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
      <Grid2 container spacing={1} alignItems="stretch" sx={{ mt: 2 }}>
        <Grid2>
          <DateField
            label={t('FormDateLabel')}
            format="DD MMMM YYYY"
            value={date}
            onChange={(newDate) => {
              if (!newDate) {
                return;
              }

              setDate(newDate);
            }}
          />
        </Grid2>
        <Grid2>
          <TextField
            label={t('FormGameLabel')}
            value={game}
            onChange={(event) => {
              setGame(event.target.value);
            }}
          />
        </Grid2>
        <Grid2>
          <TextField
            label={t('FormCommentsLabel')}
            value={comments}
            onChange={(event) => {
              setComments(event.target.value);
            }}
          />
        </Grid2>
        <Grid2>
          <Button
            variant="contained"
            sx={{ height: '100%' }}
            onClick={saveRole}
          >
            {t('FormSubmitButton')}
          </Button>
        </Grid2>
      </Grid2>
    </LocalizationProvider>
  );
}