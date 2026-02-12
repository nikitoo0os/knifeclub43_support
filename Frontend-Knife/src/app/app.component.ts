import {  AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MainIndexRulesComponent } from './main-index-rules/main-index-rules.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { animationDuration } from './classes/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideFromTop', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', animate('0.3s ease-in')),
      transition('* => void', animate('0.3s ease-out'))
    ]),
    trigger('slideFromBottom', [
      state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', animate('0.3s ease-in')),
      transition('* => void', animate('0.3s ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef, private router: Router, private dialog: MatDialog) {

  }

  

  openDialog(): void {
    this.dialog.open(MainIndexRulesComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
    });
  }

  ngOnInit(): void {

  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: Event) {
  //   this.updateSnowflakes();
  // }

  clickBron(): void {
    this.router.navigate(['']);
    setTimeout(() => {
      const element = this.elementRef.nativeElement.querySelector('#myDiv');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  clickTop(): void {
    this.router.navigate(['']);
    setTimeout(() => {
      const element = this.elementRef.nativeElement.querySelector('#top');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  openIcon(url: string) {
    window.open(url);
  }

  ngAfterViewInit(): void {
    // this.snowflakes.forEach((_, index) => {
    //   const flake = document.querySelectorAll('.snowflake')[index] as HTMLElement;
    //   const duration = Math.random()*3 + 2;
    //   if (flake) {
    //     flake.style.width = (Math.random() * 5 + 2) + 'px';
    //     flake.style.height = flake.style.width; // Высота равна ширине
    //     flake.style.left = (Math.random() * window.innerWidth) + 'px';
    //     flake.style.animationDuration = duration + 's';
    //     flake.style.animationName = 'fall';
    //     flake.style.top = (-(Math.random() * window.innerHeight)) + 'px';
    //     console.log('flake: ', flake.style.animationDuration);
    //   }
    // });
    //console.log(window.innerHeight);
  }
}
