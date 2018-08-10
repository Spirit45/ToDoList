import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from './task/tasks.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name:string;
  description:string;
  date:string;
  tasks: Task[];
  buffer: any;
  currentDate: string;

  ngOnInit() {
    this.currentDate=new Date().toISOString().substring(0,10);
    this.tasks = [
      {
        name: 'Выпить кофе',
        description: 'Промолоть зерна и заварить чайник',
        date: this.currentDate,
        trigger: false,
        showDesc: false,
      },
      {
        name: 'Заказать пиццу',
        description: 'Скоро отправляюсь в отпуск. Думаю, не помешает начать его с горячей пиццы на тонком тесте',
        date: '2018-03-09',
        trigger: false,
        showDesc: false,
    }
  ];
}
  addTask (name,description,date){
    if (name==undefined || name.length==0){
      alert('Введите название');
    }
    else if (date==undefined || date.length==0){
      alert('Выберите дату окончания');
    }
    else {
      var newTask = new Task(name, description, date);
      this.tasks.push(newTask);
    }
    (<HTMLInputElement>document.getElementById('name')).value='';
    (<HTMLInputElement>document.getElementById('description')).value='';
    (<HTMLInputElement>document.getElementById('date')).value='';
}


  upTask (i){
    this.buffer=this.tasks[i];
    this.tasks[i]=this.tasks[i-1];
    this.tasks[i-1]=this.buffer;
  }


  downTask (i){
    this.buffer=this.tasks[i];
    this.tasks[i]=this.tasks[i+1];
    this.tasks[i+1]=this.buffer;
}
  deleteTask (i){
    this.tasks.splice(i,1);
  }


  changeTask(i){
    if (this.tasks[i].trigger==false){
      this.tasks[i].trigger=true;
      (<HTMLInputElement>document.getElementById('change')).value="Отменить";
      (<HTMLInputElement>document.getElementById('changename')).value='';
      (<HTMLInputElement>document.getElementById('changedescription')).value='';
      (<HTMLInputElement>document.getElementById('changedate')).value='';
    }
    else {
      this.tasks[i].trigger=false;
      (<HTMLInputElement>document.getElementById('change')).value="Редактировать";
    }
  }

  save (i, changedname, changeddescription, changeddate) {
    if (changedname!=undefined){
      this.tasks[i].name = changedname;
      (<HTMLInputElement>document.getElementById('changename')).value='';
    }
    if (changeddescription!=undefined){
      this.tasks[i].description = changeddescription;
      (<HTMLInputElement>document.getElementById('changedescription')).value='';
    }
    if (changeddate!=undefined){
      this.tasks[i].date = changeddate;
      (<HTMLInputElement>document.getElementById('changedate')).value='';
    }
    this.tasks[i].trigger=false;
    (<HTMLInputElement>document.getElementById('change')).value="Редактировать";
  }

  showDesc(i){
    if (this.tasks[i].showDesc==false){
      this.tasks[i].showDesc=true;
    }
    else {
      this.tasks[i].showDesc=false;
    }
  }

  taskStatus(i){
    var diff=Date.parse(this.tasks[i].date)-Date.parse(this.currentDate);
    if ((diff/86400000)<3&&diff>0){
      return 'linear-gradient(to top, #d9d940, #f9f949)';
    }
    else if (diff<0){
      return 'linear-gradient(to top, #be0002, #ff0002)';
    }
    else {
      return 'linear-gradient(to top, #43b9e4, #4bcfff)';
    }
  }

}
