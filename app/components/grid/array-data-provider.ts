import type { GetDataProps } from ".";

export function arrayDataProvider<T>(data: T[]) {
  return {
    getData: (props: GetDataProps) => {
      // FIXME(AdeAttwood): There is a off by one error here the same record is
      // included in two pages
      const cursor = props.perPage * props.page;
      return data.slice(cursor - props.perPage, cursor);
    },
  };
}
