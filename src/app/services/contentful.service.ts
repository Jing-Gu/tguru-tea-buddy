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

  getTeaInfo() {
    return from(this.client.getEntries({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      content_type: this.CONFIG.contentTypeIds.tea
    })
    .then(entry => this.simplifyContentData(entry.items))
    .catch(console.error));
  }

  simplifyContentData(items) {
    return items.map(item => ({
        name: item.fields.name,
        description: this.markdownToHtml(item.fields.description),
        category: item.fields.category,
        imageUrl: item.fields.image?.fields?.file?.url
      }));
  }

  markdownToHtml(md: string) {
    return this.markdownService.parse(md);
  }
}
