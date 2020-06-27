import { Injectable } from '@angular/core';
import { ServicesBase } from '../../shared/services/common';

@Injectable({
  providedIn: 'root'
})
export class LoginOutService {

  constructor(
    private base: ServicesBase
  ) { }
}
