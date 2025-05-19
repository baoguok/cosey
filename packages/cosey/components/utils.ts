import { Plugin, type App, type Component, type DefineComponent } from 'vue';

export function withInstall<T extends Component | DefineComponent>(component: T) {
  (component as T & Plugin).install = (app: App) => {
    app.component(('Co' + component.name) as string, component);
  };

  return component as T & Plugin;
}
