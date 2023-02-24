import React from 'react';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import {
  collection,
  orderBy,
  query,
  type Timestamp,
  where,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import dayjs from 'dayjs';

import { auth, firestore } from '../firebase';
import { useTranslation } from 'react-i18next';
import Grid2 from '@mui/material/Unstable_Grid2';
import { roleConverter } from '../models/Role';

export default function RolesList() {
  const { i18n } = useTranslation();

  const [user] = useAuthState(auth, {});
  if (!user) {
    throw new Error("user shouldn't be null or undefined");
  }

  const ref = collection(firestore, 'roles');
  const q = query(
    ref,
    where('uid', '==', user.uid),
    orderBy('date', 'desc')
  ).withConverter(roleConverter);
  const [roles, _, err] = useCollectionData(q);
  if (err) {
    throw err;
  }

  const del = (id: any) => async () => {
    const ref = doc(firestore, 'roles', id);
    await deleteDoc(ref)
  };

  return (
    <Stack spacing={1} sx={{ mt: 2, maxWidth: 'sm' }}>
      {roles?.map((role, i) => (
        <Card elevation={0} key={i} sx={{ p: 1 }}>
          <Grid2 container alignItems="center">
            <Grid2 xs={5} md={5}>
              <Typography fontSize="0.85rem">
                {displayDate(role.date, i18n.language)}
              </Typography>
            </Grid2>
            <Grid2 xs={5} md={5}>
              <Typography fontSize="1.2rem" fontWeight="bold">
                {role.game}
              </Typography>
            </Grid2>
            <Grid2 xs={2} md={2}>
              <IconButton onClick={del(role.id)}>
                <Delete />
              </IconButton>
            </Grid2>
            <Grid2 xs={12} md={12}>
              <Typography>{role.comments}</Typography>
            </Grid2>
          </Grid2>
        </Card>
      ))}
    </Stack>
  );
}

function displayDate(date: Timestamp, language: string) {
  return dayjs(date.toDate()).locale(language).format('DD MMMM YYYY');
}
