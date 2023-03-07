import users from "@/data/user.json";

import { Grid, arrayDataProvider, useReactStateProvider } from "@/components/grid";

type User = {
  first_name: string;
  last_name: string;
  email: string;
};

const dataProvider = arrayDataProvider<User>(users);

export default function GridPage() {
  const stateProvider = useReactStateProvider();

  return (
    <Grid
      dataKey="id"
      dataProvider={dataProvider}
      stateProvider={stateProvider}
      rows={[
        {
          header: "First Name",
          attibute: "first_name",
        },
        {
          header: "Last Name",
          attibute: "last_name",
        },
        {
          header: "Email Address",
          attibute: "email",
        },
      ]}
    />
  );
}
