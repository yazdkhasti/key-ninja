import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { AppInterceptor } from './services/app-interceptor';
import { ConfirmComponent } from './components/confirm.component';


@NgModule({
  declarations: [FooterComponent, ConfirmComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgbModule,
    FooterComponent
  ],
  entryComponents: [ConfirmComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
