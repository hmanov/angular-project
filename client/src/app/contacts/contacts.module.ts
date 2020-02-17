import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contact/contact.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactsService } from './contacts.service';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContactsInterceptor } from './contacts.interceptor';

const contactsRoutes: Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        component: ContactsComponent
      },
      { path: 'create', component: CreateContactComponent },
      { path: 'details/:id', component: DetailsComponent }
    ]
  }
];
@NgModule({
  declarations: [ContactsComponent, ContactComponent, CreateContactComponent, DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(contactsRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ContactsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContactsInterceptor,
      multi: true
    }
  ],
  exports: [RouterModule]
})
export class ContactsModule {}
