import { Component, DoCheck, OnInit } from '@angular/core';


//INTERFACE
import { TaskList } from '../../model/task-list';
import { UpperCasePipe } from '@angular/common';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, DoCheck {

  public taskList: Array <TaskList> = JSON.parse(localStorage.getItem("list") || '[]');
 
  ngDoCheck(): void {
    if(this.taskList){
      this.taskList.sort( (first, last) => Number(first.checked) - Number(last.checked)  );
      localStorage.setItem("list", JSON.stringify(this.taskList));

    }

  }

  constructor(){}

  ngOnInit(): void {
  }

  public setEmitTaskList(event:string){
    this.taskList.push({task:event, checked:false})

  }

  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList(){
    this.taskList = [];
  } 

  public validationInput(event:string, index:number){
    if (!event.length){
      const confirm = window.confirm("task vazia Deseja deletar?");
      if(confirm){
        this.deleteItemTaskList(index);
      }
    }


  }
}
