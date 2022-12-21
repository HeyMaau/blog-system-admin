import Vue from 'vue';
import {
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Card,
    Form,
    FormItem,
    Input,
    Button,
    Message,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Pagination,
    MessageBox
} from 'element-ui';

Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Footer.name, Footer);
Vue.component(Card.name, Card);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Pagination.name, Pagination);
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm