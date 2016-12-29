# Md2DataTable
Data Table is a arrange data in ordering searching and paginate it.

## `[md2-data-table]`
### Directives

| Name | Type | Description |
| --- | --- | --- |
| `md2-data` | `Array<any>` | List of array data assign for datatable |
| `md2-page-length` | `number` | Number of rows per page |
| `activePage` | `number` | Number of active page |

### Examples
A Datatable would have the following markup.
```html
<table class="table table-striped"
       [md2-data]="data"
       #md2="Md2DataTable"
       [md2-page-length]="10"
       [(activePage)]="activePage">
  ...
</table>
```

## `[md2-sort-field]`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `md2-sort-field` | `string` | field for sorting data |

### Examples
A directive would have the following markup.
```html
<th md2-sort-field="name">Name</th>
```

## `<md2-pagination>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `md2-rows` | `Array<string>` | Number of rows on page set list |
| `md2-table` | `Md2DataTable` | reference of Md2DataTable |

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
<table [md2-data]="data"
       #md2="Md2DataTable"
       [md2-page-length]="10"
       [(activePage)]="activePage">
  <thead>
    <tr>
      <th md2-sort-field="name">Name</th>
      <th md2-sort-field="email">Email</th>
      <th md2-sort-field="age">Age</th>
      <th md2-sort-field="city">City</th>
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
        <md2-pagination [md2-rows]="[5,10,15]"></md2-pagination>
      </td>
    </tr>
  </tfoot>
</table>
```