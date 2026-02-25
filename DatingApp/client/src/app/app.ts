import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private http = inject(HttpClient);
  protected  title = 'Dating App';
  protected members = signal<any>([]);

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
  }

  async getMembers()
  {
    try {
      return lastValueFrom( this.http.get('https://localhost:5001/api/members'));

    } catch (error) {
      console.log(error);
      throw error;
    }
     
  }
}
