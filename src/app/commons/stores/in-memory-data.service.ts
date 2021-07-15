import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api/interfaces';
import {status} from '../constant/todo';
import { ITodo } from '../../Models/todo';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const todos: ITodo[] = [
      {
        id: 1,
        name: "to do 1",
        dateCreated: new Date("12/7/2021"),
        description: "to do",
        status: status.notComplete
      },
      {
        id: 2,
        name: "to do 3",
        dateCreated: new Date("12/7/2021"),
        description: "to do",
        status: status.complete
      },
      {
        id: 3,
        name: "to do 3",
        dateCreated: new Date("12/7/2021"),
        description: "to do",
        status: status.notComplete
      },
      {
        id: 4,
        name: "to do 4",
        dateCreated: new Date("12/7/2021"),
        description: "to do",
        status: status.complete
      },
      {
        id: 5,
        name: "to do 5",
        dateCreated: new Date("12/7/2021"),
        description: "to do",
        status: status.notComplete
      },
      {
        id: 6,
        name: "to do 6",
        dateCreated: new Date("12/7/2021"),
        description: "to do",
        status: status.notComplete
      },
      {
        id: 7,
        name: "to do 7",
        dateCreated: new Date("12/7/2021"),
        description: "to do",
        status: status.notComplete
      }
      ,
      {
        id: 8,
        name: "to do 8",
        dateCreated: new Date("12/7/2021"),
        description: "to do",
        status: status.notComplete
      },
      {
        id: 9,
        name: "to do 9",
        dateCreated: new Date("12/7/2021"),
        description: "to do",
        status: status.notComplete
      },
      {
        id: 10,
        name: "to do 10",
        dateCreated: new Date("12/7/2021"),
        description: "to do",
        status: status.notComplete
      }
    ]
    return {todos};
  }
}
