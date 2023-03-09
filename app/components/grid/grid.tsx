import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

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
  getTotalCount: () => number;
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

function arrayFromRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

export function getPages(current: number, max: number) {
  if (current < 3 || max <= 5) {
    return arrayFromRange(1, Math.min(5, max));
  }

  if (current >= max - 2) {
    return arrayFromRange(max - 4, max);
  }

  return arrayFromRange(current - 2, current + 2);
}

export function Grid<T extends Record<string, any>>(props: GridProps<T>) {
  const { rows, stateProvider, dataProvider } = props;
  const dataParams = {
    page: stateProvider.page,
    perPage: stateProvider.perPage,
    filters: stateProvider.filters,
  };

  const currentPage = stateProvider.page;
  const data = dataProvider.getData(dataParams);
  const totalCount = dataProvider.getTotalCount();
  const totalPages = Math.ceil(totalCount / stateProvider.perPage);

  const pageButtons = getPages(stateProvider.page, totalPages);

  return (
    <div>
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
            {data.map((dataItem) => {
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
      <IconButton
        isDisabled={currentPage === 1}
        onClick={() => stateProvider.setPage(currentPage - 1)}
        borderRightRadius={0}
        colorScheme="blue"
        aria-label="Search database"
        icon={<ChevronLeftIcon />}
      />
      {pageButtons.map((item, index) => (
        <IconButton
          key={index}
          isActive={currentPage === item}
          borderRadius={0}
          colorScheme="blue"
          aria-label="Search database"
          icon={<span>{item}</span>}
          onClick={() => stateProvider.setPage(item)}
        />
      ))}
      <IconButton
        borderLeftRadius={0}
        colorScheme="blue"
        aria-label="Search database"
        icon={<ChevronRightIcon />}
        isDisabled={currentPage === totalPages}
        onClick={() => stateProvider.setPage(currentPage + 1)}
      />
    </div>
  );
}

export default Grid;
