import { FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Link,
    SortDirection,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableCellProps,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot, { DotProps } from '@/compontents/@extended/Dot';

type createDataFn = (
    trackingNo: number,
    name: string,
    fat: number,
    carbs: number,
    protein: number,
) => {
    trackingNo: number;
    name: string;
    fat: number;
    carbs: number;
    protein: number;
};

// 创建一些数据
function createData<T extends createDataFn>(
    ...args: Parameters<T>
): ReturnType<T> {
    return {
        trackingNo: args[0],
        name: args[1],
        fat: args[2],
        carbs: args[3],
        protein: args[4],
    } as ReturnType<T>;
}

// 接受三个参数，a、b是两个对象，orderBy是对象的一个属性，返回一个数字
function descendingComparator<T extends createDataFn>(
    a: ReturnType<T>,
    b: ReturnType<T>,
    orderBy: keyof ReturnType<T>,
) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// 排序函数，接受两个参数，order是排序的方向，desc是降序，asc是升序，orderBy是对象的一个属性，
// 返回一个函数，这个函数接受两个参数，a、b是两个对象，返回一个数字，这个数字是用来排序的，
// 如果是负数，就是a在前面，如果是正数，就是b在前面
function getComparator<Key extends keyof ReturnType<createDataFn>>(
    order: SortDirection,
    orderBy: Key,
): (a: ReturnType<createDataFn>, b: ReturnType<createDataFn>) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const rows = [
    createData(84564564, 'Camera Lens', 40, 2, 40570),
    createData(98764564, 'Laptop', 300, 0, 180139),
    createData(98756325, 'Mobile', 355, 1, 90989),
    createData(98652366, 'Handset', 50, 1, 10239),
    createData(13286564, 'Computer Accessories', 100, 1, 83348),
    createData(86739658, 'TV', 99, 0, 410780),
    createData(13256498, 'Keyboard', 125, 2, 70999),
    createData(98753263, 'Mouse', 89, 2, 10570),
    createData(98753275, 'Desktop', 185, 1, 98063),
    createData(98753291, 'Chair', 100, 0, 14001),
];

// 这里的T是一个函数，这个函数接受五个参数，分别是number、string、number、number、number，返回一个对象，
// 这个对象有五个属性，分别是trackingNo、name、fat、carbs、protein，这五个属性的类型分别是number、string、number、number、number
// 这里的ReturnType<T>就是这个对象，这个对象的类型是ReturnType<T>
// 这个函数接受两个参数，array是一个数组，数组的每一项都是ReturnType<T>类型的，comparator是一个函数，这个函数接受两个参数，a、b是ReturnType<T>类型的，返回一个数字
// 这个函数返回一个数组，数组的每一项都是ReturnType<T>类型的
// 这个函数的作用是对数组进行排序，排序的依据是comparator函数的返回值，如果返回值是负数，就是a在前面，如果是正数，就是b在前面
function stableSort<T extends createDataFn>(
    array: ReturnType<T>[],
    comparator: (a: ReturnType<T>, b: ReturnType<T>) => number,
) {
    const stabilizedThis = array.map((el, index) => [el, index] as [ReturnType<T>, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0] , b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface headCellType {
    id: keyof ReturnType<createDataFn>;
    align: TableCellProps['align'];
    disablePadding: boolean;
    label: string;
}

const headCells: headCellType[] = [
    {
        id: 'trackingNo',
        align: 'left',
        disablePadding: false,
        label: 'Tracking No.',
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Product Name',
    },
    {
        id: 'fat',
        align: 'right',
        disablePadding: false,
        label: 'Total Order',
    },
    {
        id: 'carbs',
        align: 'left',
        disablePadding: false,

        label: 'Status',
    },
    {
        id: 'protein',
        align: 'right',
        disablePadding: false,
        label: 'Total Amount',
    },
];


// 这个组件接受两个参数，order是排序的方向，desc是降序，asc是升序，orderBy是对象的一个属性，这个组件返回一个组件
interface OrderTableHeadProps {
    order: SortDirection;
    orderBy: keyof ReturnType<createDataFn>;
}

function OrderTableHead({ order, orderBy }: OrderTableHeadProps) { 
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface OrderStatusProps {
    status: number;
}

const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
    let color: DotProps['color'];
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};




export default function OrderTable() {
    const [order] = useState<SortDirection>('asc');
    const [orderBy] = useState<keyof ReturnType<createDataFn>>('trackingNo');

    // 这里的selected是一个数组，数组的每一项都是string类型的, setSelected是一个函数，这个函数接受一个参数，这个参数是一个数组，数组的每一项都是string类型的，返回值是void
    // setSelected在这里的作用是设置selected的值，selected的值是一个数组，数组的每一项都是string类型的
    const [selected, /*setSelected */] = useState<readonly string[]>([]); 
    
    const isSelected = (trackingNo: number) => selected.indexOf(String(trackingNo)) !== -1;

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' },
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2,
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3,
                        },
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map(
                            (row, index) => {
                                const isItemSelected = isSelected(
                                    row.trackingNo,
                                );
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                { border: 0 },
                                        }}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.trackingNo}
                                        selected={isItemSelected}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            align="left"
                                        >
                                            <Link
                                                color="secondary"
                                                component={RouterLink}
                                                to=""
                                            >
                                                {row.trackingNo}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.fat}
                                        </TableCell>
                                        <TableCell align="left">
                                            <OrderStatus status={row.carbs} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <NumberFormat
                                                value={row.protein}
                                                displayType="text"
                                                thousandSeparator
                                                prefix="￥"
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            },
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
