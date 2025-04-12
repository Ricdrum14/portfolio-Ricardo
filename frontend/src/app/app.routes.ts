import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleProjectComponent } from './projects/projects-list/single-project/single-project.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CVComponent } from './cv/cv.component';

export const routes: Routes = [
    { path: 'cv', component: CVComponent},
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path:'projects/:id', component: SingleProjectComponent},
    { path:'projects',component:ProjectsListComponent},
    { path:'', component:HomeComponent},

];
