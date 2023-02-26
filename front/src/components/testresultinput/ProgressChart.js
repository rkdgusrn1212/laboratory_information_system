import React from 'react';
import { useTheme } from '@mui/material/styles';

import numeral from 'numeral';

import { Card, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import UseChart from './UseChart';

// ----------------------------------------------------------------------
const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible',
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
}));

AppCurrentVisits.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chartColors: PropTypes.arrayOf(PropTypes.string),
    chartData: PropTypes.array,
};

function AppCurrentVisits({ title, subheader, chartColors, chartData, ...other }) {
    const theme = useTheme();

    const chartLabels = chartData.map((i) => i.label);

    const chartSeries = chartData.map((i) => i.value);

    const chartOptions = UseChart({
        colors: chartColors,
        labels: chartLabels,
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } },
        },
    });

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />
            <StyledChartWrapper dir="ltr">
                <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={280} />
            </StyledChartWrapper>
        </Card>
    );
}


// ----------------------------------------------------------------------

function fNumber(number) {
    return numeral(number).format();
}


// ----------------------------------------------------------------------

export default function ProgressChart(props) {
    const theme = useTheme();

    return (
        <>
            <AppCurrentVisits
                
                chartData={[
                    { label: '검사중', value: props.value.length - props.value2.length },
                    { label: '검사완료', value: props.value2.length },
                ]}
                chartColors={[

                    theme.palette.error.main,
                    theme.palette.primary.main,
                ]}
            />

        </>
    );
}
