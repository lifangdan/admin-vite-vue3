import SvgIcon from './svg-icon';
import TablePanel from './table-panel'
import SearchPanel from './search-panel'

const components = [
    { name:'SvgIcon', component:SvgIcon },
    { name:'TablePanel', component:TablePanel },
    { name:'SearchPanel', component:SearchPanel },
];

export default {
    install (app) {
        components.map((item) => {
            app.component(item.name, item.component);
        })
    }
}
