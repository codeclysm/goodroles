import React, { useMemo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart, ResponsiveContainer,
} from 'recharts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

type DataMap = Record<string, number>;

export default function RolesPieChart() {
  const [user] = useAuthState(auth, {});
  if (!user) {
    throw new Error("user shouldn't be null or undefined");
  }

  const ref = collection(firestore, 'roles');
  const q = query(ref, where('uid', '==', user.uid), orderBy('date', 'desc'));
  const [roles, _, err] = useCollectionData(q);
  if (err) {
    throw err;
  }

  const data = useMemo(() => {
    const data: DataMap = {};

    roles?.forEach((role) => {
      if (!data[role.game]) {
        data[role.game] = 0
      }

      data[role.game]++
    })

    return Object.keys(data).map((name) => ({name, value: data[name]}))
      .sort((a, b) => b.value - a.value)
  }, [roles]);


  if (data.length === 0) {
    return null;
  }

  const colors = [
    '#6929c4',
    '#1192e8',
    '#005d5d',
    '#9f1853',
    '#fa4d56',
    '#570408',
    '#002d9c',
    '#b28600',
    '#009d9a',
    '#8a3800',
    '#a56eff',
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Legend />
        <Pie
          data={data}
          dataKey="value"
          innerRadius={20}
          outerRadius={75}
        >{
          data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))
        }</Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
