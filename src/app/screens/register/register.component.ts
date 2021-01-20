import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activeLabels();
  }

  private activeLabels() {
    $('.form')
      .find('input')
      .on('keyup blur focus', function (e) {
        let $this = $(this),
          label = $this.prev('label');
        if (e.type === 'keyup') {
          if ($this.val() === '') label.removeClass('active highlight');
          else label.addClass('active highlight');
        } else if (e.type === 'blur') {
          if ($this.val() === '') label.removeClass('active highlight');
          else label.removeClass('highlight');
        } else if (e.type === 'focus') {
          if ($this.val() === '') label.removeClass('highlight');
          else if ($this.val() !== '') label.addClass('highlight');
        }
      });

    $('.tab a').on('click', function (e) {
      e.preventDefault();
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');
      let target = $(this).attr('href');
      $('.tab-content > div').not(target).hide();
      $(target).fadeIn(600);
    });
  }

  onClick() {
    this.router.navigate(['/login']);
  }
}
