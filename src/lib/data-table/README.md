# Md2DataTable
Data Table is a arrange data in ordering searching and paginate it.

## `[md2-data-table]`
### Directives

| Name | Type | Description |
| --- | --- | --- |
| `md2Data` | `Array<any>` | List of array data assign for datatable |
| `rowsPerPage` | `number` | Number of rows per page |
| `activePage` | `number` | Number of active page |
| `sortBy` | `string` or `Array<string>` | Sort by parameter(s) |
| `sortOrder` | `string` | Sort order parameters are 'asc' or 'desc' |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `activePageChange` | `Event` | Fired when change the active page |
| `sortByChange` | `Event` | Fired when change sort by |
| `sortOrderChange` | `Event` | Fired when change sort order |

### Examples
A Datatable would have the following markup.
```html
<table class="table table-striped"
       [md2Data]="data"
       #md2="md2DataTable"
       [rowsPerPage]="10"
       [activePage]="activePage">
  ...
</table>
```

## `[md2SortBy]`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `md2SortBy` | `string` | Sort by parameter |

### Examples
A directive would have the following markup.
```html
<th md2SortBy="name">Name</th>
```

## `<md2-pagination>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `rowsPerPageSet` | `Array<string>` | Number of rows per page set list |
| `md2Table` | `Md2DataTable` | reference of Md2DataTable |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when change the page |

### Examples
A pagination would have the following markup.
```html
<md2-pagination [rows]="[5,10,15]"></md2-pagination>
```

### Examples
A data-table would have the following markup.
```html
<table [md2Data]="data"
       #md2="md2DataTable"
       [rowsPerPage]="10"
       [(activePage)]="activePage">
  <thead>
    <tr>
      <th md2SortBy="name">Name</th>
      <th md2SortBy="email">Email</th>
      <th md2SortBy="age">Age</th>
      <th md2SortBy="city">City</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let i of md2.data">
      <td>{{i.name}}</td>
      <td>{{i.email}}</td>
      <td>{{i.age}}</td>
      <td>{{i.city}}</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">
        <md2-pagination [rowsPerPageSet]="[5,10,15]"></md2-pagination>
      </td>
    </tr>
  </tfoot>
</table>
```