import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VizzlyDashboard } from './dashboard/dashboard.component';
import { VizzlyDashboardManagement } from './dashboard/dashboardManagement.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, VizzlyDashboard, VizzlyDashboardManagement],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
