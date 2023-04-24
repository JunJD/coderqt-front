import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
    // chart是图标的类型，type: 'bar'是柱状图
    chart: {
        type: 'bar',
        height: 365,
        // toolbar是工具栏
        toolbar: {
            show: false,
        },
    },
    // plotOptions是图表的选项
    plotOptions: {
        // bar是柱状图的选项，barHeight是柱状图的高度，endingShape是柱状图的形状
        bar: {
            columnWidth: '45%',
            borderRadius: 4,
        },
    },
    // dataLabels是数据标签，enabled: false是不显示数据标签
    dataLabels: {
        enabled: false,
    },
    // xaixs是x轴的选项，categories是x轴的分类，axisBorder是x轴的边框，axisTicks是x轴的刻度
    xaxis: {
        categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    // yaxis是y轴的选项，axisBorder是y轴的边框，axisTicks是y轴的刻度，labels是y轴的标签
    yaxis: {
        show: false,
    },
    // grid是网格，show: false是不显示网格
    grid: {
        show: false,
    },
};

const MonthlyBarChart = () => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    // series是图表的数据，一般由后端返回，这边是模拟数据
    const [series] = useState([
        {
            data: [80, 95, 70, 42, 65, 55, 78],
        },
    ]);

    const [options, setOptions] = useState<ReactApexChart['props']>(barChartOptions);

    // 给图标设置theme的动态颜色
    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [info],
            xaxis: {
                labels: {
                    style: {
                        colors: [
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                        ],
                    },
                },
            },
            tooltip: {
                theme: 'light',
            },
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primary, info, secondary]);

    return (
        <div id="chart">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={365}
            />
        </div>
    );
};

export default MonthlyBarChart;
