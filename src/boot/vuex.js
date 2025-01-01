import { boot } from 'quasar';
import store from 'src/store/store'; 

export default boot(({ app }) => {
  app.use(store); 
});
