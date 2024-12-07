import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  constructor() { }
  private http = inject(HttpClient);

  private CONFIG = {
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
    contentTypeIds: {
      teaTimer: "teaTimer",
      tea: "tea",
      business: "business"
    }
  };


  private client = createClient({
    space: this.CONFIG.space,
    accessToken: this.CONFIG.accessToken
  });



  public getTeaTimer(query?: object) {
    
    return this.client.getEntries({
      content_type: this.CONFIG.contentTypeIds.teaTimer,
      include: 1
    })
    //.then(entry => console.log('e', entry))
    .then((response) => response.items)
    .catch(console.error);
  }
}
