import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import Title from './Title';
import axios from 'axios';

export default function TimeSeriesChart(props) {
  const [selectedpatientlist, setSelectedPatientList] = React.useState([]);

  React.useEffect(() => {
    getReceptlist();
  }, []);

  async function getReceptlist() {
    try {
      const searchpatientInfo = await axios.get(
        'http://13.209.219.162/api/analysis/analysisgraph',
        {
          params: {
            patientName: props.c,
            prescriptionCode: props.d,
            startDate: props.e,
            endDate: props.f,
          },
        },
      );

      searchpatientInfo.data.map((selectedpatientlist, i) => {
        selectedpatientlist.id = i;
      });

      setSelectedPatientList(searchpatientInfo.data);
    } catch (error) {
      console.log(error);
    }
  }

  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>검사결과</Title>
      <ResponsiveContainer>
        <LineChart
          data={selectedpatientlist}
          margin={{ top: 16, right: 16, bottom: 0, left: 24 }}
        >
          <XAxis
            dataKey="receptionDate"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={0}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            />
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="resultObserved"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
