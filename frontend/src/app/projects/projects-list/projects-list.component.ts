import { Component, OnInit } from '@angular/core';
import { ProjectsComponent } from '../projects.component';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/projects.service';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [
    ProjectsComponent
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css'
})
export class ProjectsListComponent implements OnInit{

  projects!: Project[];
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => this.projects = projects,
      error: (err) => console.error('Erreur lors du chargement des projets :', err)
    });
  }
}
