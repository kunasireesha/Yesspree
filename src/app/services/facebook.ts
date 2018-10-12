import { FacebookService, InitParams } from 'ngx-facebook';
import { Injectable } from '@angular/core';

@Injectable()

export class MyComponentOrService {

    constructor(private fb: FacebookService) {

        let initParams: InitParams = {
            appId: '211463156112817',
            xfbml: true,
            version: 'v3.1'
        };

        fb.init(initParams);

    }

}