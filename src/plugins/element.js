import Vue from 'vue';
import {Container, Header, Aside, Main, Footer, Card, Form, FormItem, Input, Button, Message} from 'element-ui';

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
Vue.prototype.$message = Message