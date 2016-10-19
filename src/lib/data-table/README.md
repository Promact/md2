# Md2DataTable
Data Table is a arrange data in ordering searching and paginate it.

## `[md2-data-table]`
### Directives

| Name | Description |
| --- | --- |
| `md2-data` | List of array data assign for datatable |
| `md2-page-length` | Number of rows per page |

### Examples
A Datatable would have the following markup.
```html
<table class="table table-striped" [md2-data]="data" #md2="Md2DataTable" [md2-page-length]="10">
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

### Examples
A pagination would have the following markup.
```html
<md2-pagination [rows]="[5,10,15]"></md2-pagination>
```
