import { ProjectType } from "./project-type.type";

export class Project {


  
  id: string;

  constructor(
    public title: string,
    public description: string,
    public imageURL: string,
    public projectLink: string, 
    public likes: number,//le nombre de like.
  ){
    this.id = crypto.randomUUID().substring(0, 8);
  }

  addLike(): void{
    this.likes++;
  }
  removeLike(): void {
    if (this.likes > 0){
    this.likes--;
    }
  }

  like(projectType: ProjectType): void {
    if(projectType ==='like'){
      this.addLike();
    }
    else if(projectType ==='unLike'){
      this.removeLike();
    }
  }

  // ✅ Cette méthode permet de transformer un objet JSON en Project
  static fromJSON(json: any): Project {
    const project = new Project(
      json.title,
      json.description,
      json.imageURL,
      json.projectLink,
      json.likes
    );
    project.id = json.id || crypto.randomUUID().substring(0, 8);
    return project;
  }
}