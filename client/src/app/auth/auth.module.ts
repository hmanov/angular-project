import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

const authRoutes: Routes = [
  {
    path: '',

    children: [
      {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent
      },
      { path: 'login', component: LoginComponent }
    ]
  }
];
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, RouterModule.forChild(authRoutes), FormsModule],
  providers: [AuthService],
  exports: [RouterModule]
})
export class AuthModule {}
