import React, { useMemo, useState } from 'react';
import {
  Pie,
  PieChart,
  Sector,
  type SectorProps,
} from 'recharts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

declare type PieSectorDataItem = SectorProps & {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  value?: number;
  paddingAngle?: number;
  payload: {
    name: string;
  };
};

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


  const [activeIndex, setActiveIndex] = useState(0);

  if (data.length === 0) {
    return null;
  }

  return (
      <PieChart width={500} height={500}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={120}
          outerRadius={180}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={(_, index) => {
            setActiveIndex(index);
          }}
        />
      </PieChart>
  );
}

function renderActiveShape(props: PieSectorDataItem) {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  if (!midAngle || !cx || !cy || !outerRadius || !value || !percent) {
    throw new Error("invalid props value")
  }

  const Radian = Math.PI / 180;
  const sin = Math.sin(-Radian * midAngle);
  const cos = Math.cos(-Radian * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  console.debug(props)

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
}