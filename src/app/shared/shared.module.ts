import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    FooterComponent,
    ProgressBarComponent
  ],
  exports:[
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
