import React from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Select,
  SelectItem,
} from '@carbon/react';
import { Order, OrderStatus } from '../../types';

interface OpenOrdersListProps {
  orders: Order[];
  onStatusUpdate: (orderId: string, status: OrderStatus) => void;
  updating: string | null;
}

const OpenOrdersList: React.FC<OpenOrdersListProps> = ({
  orders,
  onStatusUpdate,
  updating,
}) => {
  const headers = [
    { key: 'id', header: 'Order ID' },
    { key: 'customer', header: 'Customer' },
    { key: 'phone', header: 'Phone' },
    { key: 'pizzas', header: 'Pizzas' },
    { key: 'total', header: 'Total' },
    { key: 'status', header: 'Status' },
    { key: 'created', header: 'Created' },
    { key: 'actions', header: 'Actions' },
  ];

  const rows = orders.map((order) => ({
    id: order.id?.slice(0, 8) || '',
    customer: order.customer_name,
    phone: order.customer_phone,
    pizzas: order.pizzas.length.toString(),
    total: `$${order.total_price?.toFixed(2)}`,
    status: order.status?.replace(/_/g, ' ').toUpperCase(),
    created: new Date(order.created_at!).toLocaleString(),
    actions: order.id,
  }));

  return (
    <DataTable rows={rows} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })} key={header.key}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => {
              const order = orders[rowIndex];
              return (
                <TableRow {...getRowProps({ row })} key={row.id}>
                  {row.cells.map((cell) => {
                    if (cell.info.header === 'actions') {
                      return (
                        <TableCell key={cell.id}>
                          <Select
                            id={`status-${order.id}`}
                            labelText=""
                            size="sm"
                            value={order.status}
                            onChange={(e) =>
                              onStatusUpdate(order.id!, e.target.value as OrderStatus)
                            }
                            disabled={updating === order.id}
                          >
                            <SelectItem value={OrderStatus.OPEN} text="Open" />
                            <SelectItem value={OrderStatus.PREPARING} text="Preparing" />
                            <SelectItem
                              value={OrderStatus.OUT_FOR_DELIVERY}
                              text="Out for Delivery"
                            />
                            <SelectItem value={OrderStatus.DELIVERED} text="Delivered" />
                            <SelectItem value={OrderStatus.CANCELLED} text="Cancelled" />
                          </Select>
                        </TableCell>
                      );
                    }
                    return <TableCell key={cell.id}>{cell.value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};

export default OpenOrdersList;

// Made with Bob
