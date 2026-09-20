import { Component, computed, inject, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit{
  private readonly authService = inject(AuthService)
  private readonly platform = inject(PLATFORM_ID)

  logged:Signal<boolean> = computed(()=>this.authService.isLogged())

   signOut(): void {
    this.authService.signOut();
  }

  ngOnInit(): void {
   this.checkToken()
    
  }

 checkToken():void{
   if(isPlatformBrowser(this.platform)){
 const token = localStorage.getItem('freshToken')

  if(token){
    this.authService.isLogged.set(true)
  }
   }
 }
}
