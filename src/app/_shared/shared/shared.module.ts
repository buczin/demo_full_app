import { NgModule } from '@angular/core';
import { PermissionDirective } from '../../_directives/permission.directive';

@NgModule({
  declarations: [PermissionDirective],
  exports:[PermissionDirective]
})
export class SharedModule { }
