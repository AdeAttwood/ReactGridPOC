# React Grid POC

## Get it running

```bash
yarn install && yarn dev
```

## Concepts

The for the grid is split out into two parts, the `dataProvider` and the
`stateProvider`.

The data provider is responsible for getting the data to display in the grid
from grid state. I have started to implement a `arrayDataProvider` that will
take a load of data and get the correct splice for the page to be displayed.
Other data providers can also be implemented to make network requests or event
IndexedDB.

The state provider is responsible for managing the state of the grid. This will
be things like pagination, sort and filters. I have started to implement a
React state provider that will store all the state in react state. This can be
expanded to store state in the URL query or event local storage.

It is important to note we are not treating the data as state, this is treated
as a computed property.

## Things to think about

How this will work with react frameworks like Remix, I have not worked out how
we can get the initial data.

Maybe use context to share data between components and let the developer
compose the layout. This allows customizing pagination layouts, for example.

```jsx
<Grid {...props}>
  <DataPagination />
  <DataGrid />
</Grid>

<Grid {...props}>
  <DataGrid />
  <DataPagination />
</Grid>
```

Or even have pagination top and bottom.

```jsx
<Grid {...props}>
  <DataPagination />
  <DataGrid />
  <DataPagination />
</Grid>
```
