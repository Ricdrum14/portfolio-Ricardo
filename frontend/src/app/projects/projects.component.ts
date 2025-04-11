import { Component,Input } from '@angular/core';
import { Project } from '../models/project';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    TitleCasePipe,
    CommonModule,
],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  @Input() project!: Project;

  constructor(private routeur: Router){}

  onViewProject(){
    this.routeur.navigateByUrl(`projects/${this.project.id}`);
  }

}
