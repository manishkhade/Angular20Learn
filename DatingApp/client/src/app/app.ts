import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { JsonPipe, NgClass } from '@angular/common';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home, RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  protected  title = 'Dating App';
  protected members = signal<User[]>([]);

  protected router = inject(Router);

   async ngOnInit() {
    // console.log('init called');
    // this.http.get('https://localhost:5001/api/members')
    // .subscribe({
    //   next: Response => 
    //     {
    //       this.members.set( Response);
    //       console.log(Response);
          
    //     },
    //   error: error => console.log(error),
    //   complete: () => console.log('Completed the HTTP request')
    // });

      this.members.set(await this.getMembers());
      this.setCurrentUser();
  }

  setCurrentUser()
  {
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers()
  {
    try {
      return lastValueFrom( this.http.get<User[]>('https://localhost:5001/api/members'));

    } catch (error) {
      console.log(error);
      throw error;
    }
     
  }
}
