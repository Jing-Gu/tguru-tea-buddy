import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { MarkdownService } from 'ngx-markdown';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private CONFIG = {
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
    contentTypeIds: {
      tea: 'tea',
      business: 'business'
    }
  };

  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
  });

  constructor(private markdownService: MarkdownService) { }

  /* getTeaInfo() {
    return from(this.client.getTags())
      //.then(res => console.log(res.items))
      //.catch(console.error);
  } */

  getTeaInfo() {
    return from(this.client.getEntries({
      'metadata.tags.sys.id[all]': 'blackRedTea'
      // eslint-disable-next-line @typescript-eslint/naming-convention
      //content_type: this.CONFIG.contentTypeIds.tea
    })
    .then(entry => console.log('e', entry))
    //.then(entry => this.simplifyContentData(entry.items))
    .catch(console.error));
  }

  getTeaByCategory(category) {
    return from(this.client.getEntries({
      'metadata.tags.sys.id[all]': `${category}`
    })
    //.then(entry => console.log('e', entry))
    .then(entry => this.simplifyContentData(entry.items))
    .catch(console.error));
  }

  simplifyContentData(items) {
    console.log('items', items);
    return items.map(item => ({
        name: item.fields.name,
        description: this.markdownToHtml(item.fields.description),
        origin: item.fields.origin,
        category: item.fields.category,
        imageUrl: item.fields.image?.fields?.file?.url
      }));
  }

  markdownToHtml(md: string) {
    return this.markdownService.parse(md);
  }
}
