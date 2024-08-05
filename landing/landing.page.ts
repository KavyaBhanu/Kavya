import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements AfterViewInit {
  @ViewChild('zoomImage', { read: ElementRef })
  zoomImage!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    let initialScale = 1;
    let lastScale = 1;
    
    this.zoomImage.nativeElement.addEventListener('touchstart', (event: TouchEvent) => {
      if (event.touches.length === 2) {
        initialScale = this.getDistanceBetweenTouches(event);
      }
    }, { passive: true });

    this.zoomImage.nativeElement.addEventListener('touchmove', (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const scale = this.getDistanceBetweenTouches(event) / initialScale;
        const newScale = lastScale * scale;
        this.zoomImage.nativeElement.style.transform = `scale(${newScale})`;
      }
    }, { passive: true });

    this.zoomImage.nativeElement.addEventListener('touchend', () => {
      lastScale = parseFloat(getComputedStyle(this.zoomImage.nativeElement).transform.split(',')[3]);
    }, { passive: true });
  }

  private getDistanceBetweenTouches(event: TouchEvent): number {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    return Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2));
  }
}
