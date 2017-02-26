# Md2Menu
Menu is a list of options that displays when triggered.

## `[md2-menu]`
### Directives

| Name | Description |
| --- | --- |
| `md2-menu` | Menu directive |
| `md2-menu-trigger` | Trigger event on to toggle menu using the directive |
| `md2-menu-content` | Display menu content using the directive |
| `md2-menu-item` | Display list of item using the directive |

### Attributes

| attributes | Value | Description |
| --- | --- |
| `x-position` | `before | after` | The horizontal position of the menu in relation to the trigger. Defaults to `after`. |
| `y-position` | `above | below` | The vertical position of the menu in relation to the trigger. Defaults to `below`. |

### Examples
A menu would have the following markup.
```html
<div md2-menu>
  <button md2-menu-trigger>Right Menu <span class="caret"></span></button>
  <div md2-menu-content x-position="before">
    <a md2-menu-item>Badman</a>
    <a md2-menu-item>Sadman</a>
    <a md2-menu-item>Lieman</a>
    <div md2-menu-item>
      <button md2-menu-trigger>2nd Level Menu <span class="caret"></span></button>
      <div md2-menu-content>
        <a md2-menu-item>Badman</a>
        <a md2-menu-item>Sadman</a>
        <a md2-menu-item>Lieman</a>
      </div>
    </div>
  </div>
</div>
```
