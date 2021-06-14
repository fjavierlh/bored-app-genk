import { Router } from '@vaadin/router';

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);

router.setRoutes([{
    path: '/',
    animate: {
        enter: 'primary-layout-entering',
        leave: 'primary-layout-leaving'
    },
    children: [
        {path: '/', component: 'welcome-page'},
        {path: '/main-page', component: 'main-page'},
        {path: '/(.*)', component: 'main-page'}
    ]
}]);