import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export type Row = {
  header: string;
  attibute: string;
};

export type GetDataProps = {
  page: number;
  perPage: number;
  filters: Record<string, any>;
};

export type DataProvider<T> = {
  getData: (props: GetDataProps) => T[];
};

export type StateProvider = {
  page: number;
  perPage: number;
  filters: Record<string, any>;

  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
};

interface GridProps<T> {
  dataKey: string;
  dataProvider: DataProvider<T>;
  stateProvider: StateProvider;
  rows: Row[];
}

function GridHead({ row }: { row: Row }) {
  return <Th>{row.header}</Th>;
}

export function Grid<T extends Record<string, any>>(props: GridProps<T>) {
  const { rows, stateProvider, dataProvider } = props;
  const dataParams = {
    page: stateProvider.page,
    perPage: stateProvider.perPage,
    filters: stateProvider.filters,
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {rows.map((row) => (
              <GridHead key={row.attibute} row={row} />
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {dataProvider.getData(dataParams).map((dataItem) => {
            if (!(props.dataKey in dataItem)) {
              console.warn(`Invlid data key ${props.dataKey}, it is not found in the data item`);
            }

            return (
              <Tr key={dataItem[props.dataKey]}>
                {rows.map((row) => {
                  return <Td key={row.attibute}>{dataItem[row.attibute]}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Grid;
