import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule, MatFormFieldModule,
  MatInputModule, MatOptionModule, MatCardModule,
  MatSelectModule, MatIconModule, MatButtonModule,
  MatTableModule, MatDividerModule, MatSnackBarModule,
  MatListModule, MatGridListModule, MatMenuModule,
  MatTabsModule
} from '@angular/material';

import { TimeAgoPipe } from 'time-ago-pipe';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UsersService } from './services/users.service';
import { AuthGuard } from './guards/auth.guard';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectComponent } from './components/project/project.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StepFormComponent } from './components/step-form/step-form.component';
import { PullRequestsComponent } from './components/pull-requests/pull-requests.component';
import { PullRequestCardComponent } from './components/pull-request-card/pull-request-card.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'project-list', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: 'pull-requests', component: PullRequestsComponent, canActivate: [AuthGuard] },
  { path: 'project-create', component: ProjectCreateComponent, canActivate: [AuthGuard] },
  { path: 'project-edit/:id', component: ProjectEditComponent, canActivate: [AuthGuard] },
  { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectEditComponent,
    ProjectComponent,
    StepFormComponent,
    PullRequestsComponent,
    PullRequestCardComponent,
    TimeAgoPipe,
    UserAvatarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    MatTabsModule,
    DragDropModule
  ],
  providers: [UsersService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
