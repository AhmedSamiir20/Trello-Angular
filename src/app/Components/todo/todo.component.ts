import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Task } from '../../models/task';
import { MatButtonModule } from '@angular/material/button';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule, MatInputModule, MatIconModule,ReactiveFormsModule,MatButtonModule,CdkDropList, CdkDrag,MatIcon],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit{
  form!:FormGroup;
  tasks:Task[]=[];//task model i created before
  inProgress:Task[]=[];
  done:Task[]=[];
  isEditEnable:boolean=false;
  updatedIndex!:any

  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.getFormValues();
  }
  getFormValues():void{
    this.form=this.formBuilder.group({
      item:['',Validators.required]
    })
  }

  addTask(){
    this.tasks.push({
      Title:this.form.value.item,
      Completed:false
    });
    this.form.reset();
  }
  updateTask(){
    if (this.updatedIndex !== null) {
      this.tasks[this.updatedIndex].Title = this.form.value.item;
      this.tasks[this.updatedIndex].Completed = false;
      this.form.reset();
      this.isEditEnable = false;
      this.updatedIndex = undefined;
    }
  }

  deleteTask(index:number){
    this.tasks.slice(index,1);
  }

  deleteInProgressTask(index:number){
    this.inProgress.slice(index,1);
  }

  deleteDoneTask(index:number){
    this.done.slice(index,1);
  }

  onEditTask(task:Task,id:number){
    this.form.controls['item'].setValue(task.Title);
    this.updatedIndex=task.Id;
    this.isEditEnable=true
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
