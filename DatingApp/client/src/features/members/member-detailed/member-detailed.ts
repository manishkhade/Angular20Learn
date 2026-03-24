import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';

@Component({
  selector: 'app-member-detailed',
  imports: [AsyncPipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit
{
  private memberservice = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected member$?: Observable<Member>;


  ngOnInit(): void {
    // this.memberSignal.set(this.loadMember());
    this.member$ = this.loadMember();
  }

  loadMember(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    const member =this.memberservice.getMember(id);
    return member;
  }

  loglog(val: string)
  {
    console.log(val);
  }
}
